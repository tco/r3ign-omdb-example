// Core modules
import path             from 'path';
import http             from 'http';
import httpProxy        from 'http-proxy';
import HttpProxyRules   from 'http-proxy-rules';

import Express      from 'express';
import compression  from 'compression';
import CookieDough  from 'cookie-dough';
import cookieParser from 'cookie-parser';
import staticServer from 'serve-static';

import React                                        from 'react';
import ReactDOM                                     from 'react-dom/server';
import { Provider }                                 from 'react-redux';
import { createMemoryHistory }                      from 'history'
import { RouterContext, useRouterHistory, match }   from 'react-router';

import configuredRadium                     from './styles/configuredRadium.js';
import { create as createMatchMediaMock }   from 'match-media-mock';

import getRoutes    from './routes.js';
import createStore  from 'redux/create.js';

import {
    ApiClient,
    getStatusFromRoutes,
    fetchAllData
} from 'utils/index.js';

import HTML from './containers/HTML.jsx';

const app = new Express(),
    server = new http.Server(app),
    staticsPath = path.join(__dirname, '..', 'static'),
    matchMediaMock = createMatchMediaMock(),
    appHistory = useRouterHistory(createMemoryHistory)({}),
    proxy = httpProxy.createProxyServer({ target: 'http://www.omdbapi.com', ws: false }),
    proxyRules = new HttpProxyRules({ rules: { '/api/search': 'http://www.omdbapi.com/' } });

configuredRadium.setMatchMedia(matchMediaMock);

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('Host', 'www.omdbapi.com');
});

app.use(compression());
app.use(cookieParser());
app.use(staticServer(staticsPath));

app.use((request, response) => {

    const target = proxyRules.match(request);
    if (target) {
        return proxy.web(request, response, { target: target });
    }

    if(__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const client = new ApiClient(request),
        cookies = new CookieDough(request),
        store = createStore(appHistory, client, {
            cookies: cookies.all()
        });

    configuredRadium.setUserAgent(request.headers['user-agent']);

    matchMediaMock.setConfig({
        type: 'screen',
        width: cookies.get('screenWidth') + 'px',
        height: cookies.get('screenHeight') + 'px'
    });

    function doctypify(html) {
        return '<!DOCTYPE html>\n' + html;
    }

    function hydrateOnClient() {
        response.send(doctypify(
            ReactDOM.renderToString(<HTML assets={ webpackIsomorphicTools.assets() } store={ store } />)
        ));
    }

    if(__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    match({ routes: getRoutes(store), location: request.originalUrl }, (error, redirectLocation, renderProps) => {
        if(redirectLocation) {
            response.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if(error) {
            console.error('ROUTER ERROR:', error);
            response.status(500);
            hydrateOnClient();
        } else if(!renderProps) {
            response.status(500);
            hydrateOnClient();
        } else {
            fetchAllData(
                renderProps.components,
                store.getState, store.dispatch, store.subscribe,
                renderProps.location,
                renderProps.params
            ).then(() => {
                const component = (
                    <Provider store={ store } key="provider">
                        <RouterContext { ...renderProps } />
                    </Provider>
                );

                const status = getStatusFromRoutes(renderProps.routes);
                if (status) {
                    response.status(status);
                }
                response.send(doctypify(
                    ReactDOM.renderToString(
                        <HTML assets={ webpackIsomorphicTools.assets() } component={ component } store={ store } />
                    )
                ));
            }).catch((error) => {
                console.error('DATA FETCHING ERROR:', error);
                response.status(500);
                hydrateOnClient();
            });
        }
    });
});

server.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        console.error(error);
    }
    console.info('Server is running on port %s.', process.env.PORT || 3000);
});

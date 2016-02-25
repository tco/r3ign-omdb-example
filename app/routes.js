import React                    from 'react';
import { Route, IndexRoute }    from 'react-router';

import {
    Application,
    Frontpage,
    SearchView,
    NotFound
} from 'containers';

export default function getRoutes(/*store*/) {
    const resolveState = (nextState, replaceState, callback) => {
        callback();
    };

    return (
        <Route path="/" component={ Application } onEnter={ resolveState }>
            <IndexRoute component={ Frontpage } />
            <Route path="/search/:query" component={ SearchView } />
            <Route path="*" component={ NotFound } status={ 404 } />
        </Route>
    );
}

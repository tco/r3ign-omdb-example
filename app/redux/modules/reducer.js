import { combineReducers }      from 'redux';
import { routeReducer }         from 'react-router-redux';

import cookies                  from './cookies/cookies.js';
import search                   from './search/search.js';

export default combineReducers({
    routing: routeReducer,
    cookies,
    search
});

import { combineReducers }      from 'redux';
import { routeReducer }         from 'react-router-redux';

import cookies                  from './cookies/cookies.js';
import search                   from './search/search.js';
import details                  from './details/details.js';

export default combineReducers({
    routing: routeReducer,
    cookies,
    search,
    details
});

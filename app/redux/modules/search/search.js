import { createReducerFromMapping } from 'redux/utils/index.js';

const initialState = { searching: false, searched: false };

export function isSearching(globalState) {
    return globalState.cookies && globalState.cookies.loaded;
}

export const SEARCH            = 'R3IGN/Search/SEARCH';
export const SEARCH_SUCCESS    = 'R3IGN/Search/SEARCH_SUCCESS';
export const SEARCH_FAIL       = 'R3IGN/Search/SEARCH_FAIL';
export function search(query) {
    return {
        types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
        promise: (client) => {
            return client.get('http://localhost:3000/api/search?s=' + query);
        }
    };
}

export default createReducerFromMapping({
    [SEARCH]:           (state) => ({ ...state, searching: true }),
    [SEARCH_SUCCESS]:   (state, action) => ({ ...state, searching: false, searched: true, ...action.result }),
    [SEARCH_FAIL]:      (state, action) => ({ ...state, searching: false, searched: true, error: action.error })
}, initialState);

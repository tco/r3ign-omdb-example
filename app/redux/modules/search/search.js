import { createReducerFromMapping } from 'redux/utils/index.js';

const initialState = { searching: false, searched: false };

export function isSearching(globalState) {
    return globalState.search && globalState.search.searching;
}

export function isSearchedWith(globalState, query) {
    return globalState.search && globalState.search.query === query;
}

export const SEARCH            = 'R3IGN/Search/SEARCH';
export const SEARCH_SUCCESS    = 'R3IGN/Search/SEARCH_SUCCESS';
export const SEARCH_FAIL       = 'R3IGN/Search/SEARCH_FAIL';
export function search(query) {
    return {
        types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
        query,
        promise: (client) => {
            return client.get('http://localhost:3000/api/search?s=' + query);
        }
    };
}

export default createReducerFromMapping({
    [SEARCH]:           (state, action) => ({ ...state, searching: true, query: action.query }),
    [SEARCH_SUCCESS]:   (state, action) => ({ ...state, searching: false, searched: true, ...action.result }),
    [SEARCH_FAIL]:      (state, action) => ({ ...state, searching: false, searched: true, error: action.error })
}, initialState);

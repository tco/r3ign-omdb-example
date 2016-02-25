import { createReducerFromMapping } from 'redux/utils/index.js';

const initialState = {};

export const DETAILS            = 'R3IGN/Details/DETAILS';
export const DETAILS_SUCCESS    = 'R3IGN/Details/DETAILS_SUCCESS';
export const DETAILS_FAIL       = 'R3IGN/Details/DETAILS_FAIL';
export function loadDetails(imdbID) {
    return {
        types: [DETAILS, DETAILS_SUCCESS, DETAILS_FAIL],
        imdbID,
        promise: (client) => {
            console.log('calling client.get');
            return client.get('http://localhost:3000/api/search?i=' + imdbID);
        }
    };
}

export default createReducerFromMapping({
    [DETAILS_SUCCESS]: (state, action) => {
        const details = {};
        details[action.imdbID] = action.result;
        return { ...state, ...details };
    },
    [DETAILS_FAIL]: (state, action) => ({ ...state, error: action.error })
}, initialState);

import { SEARCH_KEY } from './actions';

const initialState = [];

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case `${SEARCH_KEY}_LOADING`:
          return state
        case `${SEARCH_KEY}`:
            return [...state, action.payload];
        default:
            return state;
    }
}
export default reducer

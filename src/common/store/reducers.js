import { combineReducers } from 'redux'
import searchReducer from '../data/search/reducer'


const appReducer = combineReducers({
    search: searchReducer,
});

export default appReducer

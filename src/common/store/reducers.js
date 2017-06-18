import { combineReducers } from 'redux'
import homeReducer from 'common/routes/Home'
import companyReducer from 'common/routes/Company'
const appReducer = combineReducers({
    home: homeReducer,
    company:companyReducer,
});

export default appReducer

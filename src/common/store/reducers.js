import { combineReducers } from 'redux'
import homeReducer from 'common/routes/Home'
import companyReducer from 'common/routes/Company'
import companiesReducer from 'common/routes/Companies'
import { filterReducer, commonSearchReducer } from './common'
const appReducer = combineReducers({
    home: homeReducer,
    company: companyReducer,
    filter: filterReducer,
    commonSearch: commonSearchReducer,
    companies:companiesReducer,
});

export default appReducer

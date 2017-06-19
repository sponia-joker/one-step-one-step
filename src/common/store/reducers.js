import { combineReducers } from 'redux'
import homeReducer from 'common/routes/Home'
import companyReducer from 'common/routes/Company'
import companiesReducer from 'common/routes/Companies'
import stadiumsReducer from 'common/routes/Stadiums'
import stadiumReducer from 'common/routes/Stadium'
import investmentsReducer from 'common/routes/Investments'
import { filterReducer, commonSearchReducer } from './common'
const appReducer = combineReducers({
    home: homeReducer,
    company: companyReducer,
    filter: filterReducer,
    commonSearch: commonSearchReducer,
    companies:companiesReducer,
    stadiums:stadiumsReducer,
    stadium:stadiumReducer,
    investments:investmentsReducer,
});

export default appReducer

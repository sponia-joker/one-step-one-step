// ------------------------------------
// Constants
// ------------------------------------
import { GET_FILTERS, GET_STADIUMS_FILTER } from 'common/actions/filter'
import { GET_SEARCH_COMPANY, GET_SEARCH_PEOPLE } from 'common/actions/search'

// ------------------------------------
// Reducer
// ------------------------------------

const filterInitialState = {
  industries: [],
  tags: [],
  rounds: [],
  locations: []
}
export function filterReducer (state = filterInitialState, action) {
  switch (action.type) {
    case `${GET_FILTERS}_LOADING`:
      return {
        ...state
      }
    case `${GET_FILTERS}_SUCCESS`:
      const { industries, tags, rounds, locations, years } = action.payload.data
      return {
        ...state,
        industries,
        tags,
        rounds,
        locations,
        years
      }
    case `${GET_STADIUMS_FILTER}_SUCCESS`:
      const stadium_types = action.payload.data.stadium_types
      const cities = action.payload.data.cities
      return {
        ...state,
        types: stadium_types,
        citys: cities,
        total: parseInt(action.payload.headers['x-total'])
      }
    case `${GET_FILTERS}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const searhInitialState = {
  companyList: [],
  peopleList: [],
  companySearchOver: false,
  peopleSearchOver: false
}
export function commonSearchReducer (state = searhInitialState, action) {
  switch (action.type) {
    case `${GET_SEARCH_COMPANY}_LOADING`:
    case `${GET_SEARCH_PEOPLE}_LOADING`:
      return {
        ...state
      }
    case `${GET_SEARCH_COMPANY}_SUCCESS`:
      const dataCompany = action.payload.data
      const headersCompany = action.payload.headers
      return {
        ...state,
        companyList: dataCompany,
        companyTotal: parseInt(headersCompany['x-total']),
        companySearchOver: true
      }
    case `${GET_SEARCH_PEOPLE}_SUCCESS`:
      const dataPeople = action.payload.data
      const headersPeople = action.payload.headers
      return {
        ...state,
        peopleList: dataPeople,
        peopleTotal: parseInt(headersPeople['x-total']),
        peopleSearchOver: true
      }
    case `${GET_SEARCH_COMPANY}_ERROR`:
    case `${GET_SEARCH_PEOPLE}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

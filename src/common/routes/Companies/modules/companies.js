// ------------------------------------
// Constants
// ------------------------------------
export const GET_COMPANIES = 'GET_COMPANIES'

// ------------------------------------
// Actions
// ------------------------------------

export const getCompanies = (url) =>
    ({ request }) => ({
      type: GET_COMPANIES,
      payload: request
            .get(`/api/v1/companies?${url || ''}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getCompanies
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  companiesList:[],
  getCompaniesOver:false
}
export default function companiesReducer (state = initialState, action) {
  switch (action.type) {
    case `${GET_COMPANIES}_LOADING`:
      return {
        ...state,
        getCompaniesOver:false
      }
    case `${GET_COMPANIES}_SUCCESS`:
      const { data, headers } = action.payload
      return {
        ...state,
        companiesList:data,
        total:parseInt(headers['x-total']),
        getCompaniesOver:true
      }
    case `${GET_COMPANIES}_ERROR`:
      return {
        ...state,
        getCompaniesOver:false
      }
    default:
      return state
  }
}

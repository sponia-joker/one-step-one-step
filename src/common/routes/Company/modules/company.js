// ------------------------------------
// Constants
// ------------------------------------
export const GET_COMPANY = 'GET_COMPANY'

// ------------------------------------
// Actions
// ------------------------------------

export const getCompany = (id) =>
    ({ request }) => ({
      type: GET_COMPANY,
      payload: request
            .get(`/api/v1/companies/${id}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getCompany
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
export default function companyReducer (state = initialState, action) {
  switch (action.type) {
    case `${GET_COMPANY}_LOADING`:
      return {
        ...state
      }
    case `${GET_COMPANY}_SUCCESS`:
      const { data } = action.payload
      return {
        ...state,
        data
      }
    case `${GET_COMPANY}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

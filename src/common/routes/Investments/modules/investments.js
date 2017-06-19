// ------------------------------------
// Constants
// ------------------------------------
export const GET_INVESTMENTS = 'GET_INVESTMENTS'

// ------------------------------------
// Actions
// ------------------------------------
export const getInvestments = (url) =>
    ({ request }) => ({
      type: GET_INVESTMENTS,
      payload: request
            .get(`/api/v1/investments?${url || ''}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getInvestments
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  investmentsList:[],
  getInvestmentsOver:false
}
export default function investmentsReducer (state = initialState, action) {
  switch (action.type) {

    case `${GET_INVESTMENTS}_LOADING`:
      return {
        ...state
      }
    case `${GET_INVESTMENTS}_SUCCESS`:
      const { data, headers } = action.payload
      return {
        ...state,
        investmentsList: data,
        total: parseInt(headers['x-total']),
        getInvestmentsOver:true
      }
    case `${GET_INVESTMENTS}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STADIUM = 'GET_STADIUM'

// ------------------------------------
// Actions
// ------------------------------------

export const getStadium = (id) =>
    ({ request }) => ({
      type: GET_STADIUM,
      payload: request
            .get(`/api/v1/stadiums/${id}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getStadium
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function stadiumReducer (state = initialState, action) {
  switch (action.type) {
    case `${GET_STADIUM}_LOADING`:
      return {
        ...state
      }
    case `${GET_STADIUM}_SUCCESS`:
      const { data } = action.payload
      return {
        ...state,
        data
      }
    case `${GET_STADIUM}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STADIUMS = 'GET_STADIUMS'

// ------------------------------------
// Actions
// ------------------------------------

export const getStadiums = (url) =>
    ({ request }) => ({
      type: GET_STADIUMS,
      payload: request
            .get(`/api/v1/stadiums?${url || ''}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getStadiums
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  stadiumsList: [],
  getStadiumsOver: false,
  types: [],
  citys: []
}
export default function stadiumsReducer (state = initialState, action) {
  switch (action.type) {
    case `${GET_STADIUMS}_LOADING`:
      return {
        ...state,
        getStadiumsOver: false
      }
    case `${GET_STADIUMS}_SUCCESS`:
      const { data, headers } = action.payload
      return {
        ...state,
        stadiumsList: data,
        total: parseInt(headers['x-total']),
        getStadiumsOver: true
      }
    case `${GET_STADIUMS}_ERROR`:
      return {
        ...state,
        getStadiumsOver: false
      }
    default:
      return state
  }
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_PEOPLE = 'GET_PEOPLE'

// ------------------------------------
// Actions
// ------------------------------------

export const getPeople = (id) =>
    ({ request }) => ({
      type: GET_PEOPLE,
      payload: request
            .get(`/api/v1/people/${id}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getPeople
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
export default function peopleReducer (state = initialState, action) {
  switch (action.type) {
    case `${GET_PEOPLE}_LOADING`:
      return {
        ...state
      }
    case `${GET_PEOPLE}_SUCCESS`:
      const { data } = action.payload
      return {
        ...state,
        data
      }
    case `${GET_PEOPLE}_ERROR`:
      return {
        ...state
      }
    default:
      return state
  }
}

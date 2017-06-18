// ------------------------------------
// Constants
// ------------------------------------
export const GET_FILTERS = 'GET_FILTERS'
export const GET_STADIUMS_FILTER = 'GET_STADIUMS_FILTER'

// ------------------------------------
// Actions
// ------------------------------------

export const getFilters = () =>
    ({ request }) => ({
      type: GET_FILTERS,
      payload: request
            .get('/api/v1/filters')
            .catch(error => {
              throw error
            })
    })

export const getStadiumsFilter = () =>
    ({ request }) => ({
      type: GET_STADIUMS_FILTER,
      payload: request
            .get('/api/v1/stadiums/filters')
            .catch(error => {
              throw error
            })
    })

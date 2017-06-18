// ------------------------------------
// Constants
// ------------------------------------
export const GET_SEARCH_COMPANY = 'GET_SEARCH_COMPANY'
export const GET_SEARCH_PEOPLE = 'GET_SEARCH_PEOPLE'

// ------------------------------------
// Actions
// ------------------------------------

export const getSearchCompany = (query, page) =>
    ({ request }) => ({
      type: GET_SEARCH_COMPANY,
      payload: request
            .get(`/api/v1/search?q=${query || ''}&type=company&page=${page || 1}`)
            .catch(error => {
              throw error
            })
    })
export const getSearchPeople = (query, page) =>
    ({ request }) => ({
      type: GET_SEARCH_PEOPLE,
      payload: request
            .get(`/api/v1/search?q=${query || ''}&type=person&page=${page || 1}`)
            .catch(error => {
              throw error
            })
    })

export const actions = {
  getSearchCompany, getSearchPeople
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_INDUSTRIES_HOT = 'GET_INDUSTRIES_HOT'
export const GET_INVESTMENTS_DOMESTIC_HOT = 'GET_INVESTMENTS_DOMESTIC_HOT'
export const GET_INVESTMENTS_FOREIGN_HOT = 'GET_INVESTMENTS_FOREIGN_HOT'
export const GET_KEYWORDS = 'GET_KEYWORDS'

// ------------------------------------
// Actions
// ------------------------------------

export const getIndustriesHot = () =>
    ({ request }) => ({
        type: GET_INDUSTRIES_HOT,
        payload: request
            .get('/api/v1/industries/hot')
            .catch(error => {
                throw error
            })
    })
export const getInvestmentsHot = (country) =>
    ({ request }) => ({
        type: country === '国外' ? GET_INVESTMENTS_FOREIGN_HOT : GET_INVESTMENTS_DOMESTIC_HOT,
        payload: request
            .get(`/api/v1/investments?per_page=4&country=${country || '国内'}`)
            .catch(error => {
                throw error
            })
    })
export const getKeywords = () =>
    ({ request }) => ({
        type: GET_KEYWORDS,
        payload: request
            .get(`/api/v1/keywords`)
            .catch(error => {
                throw error
            })
    })

export const actions = {
    getIndustriesHot,
    getInvestmentsHot,
    getKeywords
}




const initialState = {
    industries: [],
    investmentsForeign: [],
    investmentsDomestic: [],
    keywords: []
}
export  const homeReducer = (state = initialState, action)=> {
    switch (action.type) {
        case `${GET_INDUSTRIES_HOT}_LOADING`:
        case `${GET_INVESTMENTS_FOREIGN_HOT}_LOADING`:
        case `${GET_INVESTMENTS_DOMESTIC_HOT}_LOADING`:
            return {
                ...state
            }
        case `${GET_INDUSTRIES_HOT}_SUCCESS`:
            const industries = action.payload.data
            return {
                ...state,
                industries
            }
        case `${GET_INVESTMENTS_FOREIGN_HOT}_SUCCESS`:
            const investmentsForeign = action.payload.data
            return {
                ...state,
                investmentsForeign
            }
        case `${GET_INVESTMENTS_DOMESTIC_HOT}_SUCCESS`:
            const investmentsDomestic = action.payload.data
            return {
                ...state,
                investmentsDomestic
            }
        case `${GET_KEYWORDS}_SUCCESS`:
            return {
                ...state,
                keywords: action.payload.data
            }
        case `${GET_INDUSTRIES_HOT}_ERROR`:
        case `${GET_INVESTMENTS_FOREIGN_HOT}_ERROR`:
        case `${GET_INVESTMENTS_DOMESTIC_HOT}_ERROR`:
            return {
                ...state
            }
        default:
            return state
    }
}
export default homeReducer

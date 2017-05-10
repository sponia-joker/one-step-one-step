const thunk = request => ({ dispatch, getState }) => next => action =>
    next(typeof action === 'function' ? action({ request, dispatch, getState }) : action)

export default thunk

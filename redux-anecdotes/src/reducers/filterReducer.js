const reducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.filter
      case 'CLEAR_FILTER':
        return ''
      default:
        return state
    }
  }
  
  export const setFilter = filter => ({ type: 'SET_FILTER', filter: filter })
  
  export const clearFilter = () => ({ type: 'CLEAR_FILTER' })
  
  export default reducer
import { CHANGE_SEARCH_FIELD } from './const'

export const setSearchField = (text) => ({
   type: CHANGE_SEARCH_FIELD,
   payload: text
})
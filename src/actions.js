import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants'

//setSearchField action returns an object 
export const setSearchField = (text) => ({
   type: CHANGE_SEARCH_FIELD,
   payload: text
})

//thunk middleware waits for an action to return a function instead of an object
//(this is a higher order funciton - a function that returns a function)
export const requestRobots = () => (dispatch) => {
	dispatch({ type: REQUEST_ROBOTS_PENDING});
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data}))
		.catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))

}
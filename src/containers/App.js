import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions';

// receives state and returns an object containing the searchfield state that comes from 
// searchField from searchRobots reducer   
const mapStateToProps = state => {
	// return {
	// 	searchField: state.searchRobots.searchField
	// }

	return {
		searchField: state.searchField
	}
}

// dispatch is what triggers the action - this dispatch will send action to reducer
// onSearchChange will receive and event and dispatch the action setSearchField with text entered by user
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users}));
	}

	render () {
		const {robots } = this.state;
		const { searchField, onSearchChange  } = this.props
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		return !robots.length ?
			<h1> Loading ...</h1> :
			(
				<div className='tc'>
				<h1 className='f1'>Robo Friends</h1>
				<SearchBox searchChange={ onSearchChange }/>
				<Scroll>
				    <ErrorBoundary>
					   <CardList robots= {filteredRobots} />
					</ErrorBoundary>   
				</Scroll>
				</div>
			);
	}
}

//App subscribes to sate changes in teh redux store
//connect is higher order function that returns another function (App)
//connect accepts 2 parameters  - what state  and action to listen to 
export default connect(mapStateToProps, mapDispatchToProps)(App);

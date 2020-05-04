import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

// receives state and returns an object containing the state that comes from reducers
const mapStateToProps = state => {
	return {
	   searchField: state.searchRobots.searchField,
	   robots: state.requestRobots.robots,
	   isPending: state.requestRobots.isPending,
	   error: state.requestRobots.error
    }
}

// dispatch is what triggers the action - this dispatch will send action to reducer
// onSearchChange will receive and event and dispatch the action setSearchField with text entered by user
//onRequestRobots will return requestRobots function
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())

	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render () {
		const { searchField, onSearchChange, robots, isPending } = this.props
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		return isPending?
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

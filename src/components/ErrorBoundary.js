	import React, {Component} from 'react'

	class ErrorBoundary extends Component {
		constructor (props) {
			super(props);
			this.state = {
				hasError: false
			}
		}

		componentDidCatch(error, infor) {
			this.setState({ hasError: true})
		}

		render() {
			return this.state.hasError ?
			<h1>Ooops! There was an Error</h1> :
			this.props.children;
		}
	}

	export default ErrorBoundary;

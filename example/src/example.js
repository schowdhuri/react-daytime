var React = require('react');
var ReactDOM = require('react-dom');
var ReactDaytime = require('react-daytime');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactDaytime />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

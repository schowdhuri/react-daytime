import React from "react";
import ReactDOM from "react-dom";
import ReactDaytime from "react-daytime";

class App extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.colorTheme = {
            cell: {
                backgroundColor: [ "#f2f2f2", "#3de3e6" ]
            },
            header: {
                color: [ "#000000", "#ffffff" ],
                backgroundColor: [ "#97e0c0", "#4f806a" ]
            },
            border: {
                color: "#fff"
            }
        }
    }
    handleChange(selectedRange) {
        console.log(selectedRange);
    }
	render () {
		return (
			<div>
				<ReactDaytime onChange={this.handleChange} theme={this.colorTheme} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));

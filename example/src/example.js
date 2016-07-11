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
        console.log("Selected time frames: ", selectedRange);
    }
	render () {
        const defaultValue = {
            "Fri": [ 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 0 ],
            "Mon": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        }
		return (
			<div>
				<ReactDaytime onChange={this.handleChange} theme={this.colorTheme} defaultValue={defaultValue} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));

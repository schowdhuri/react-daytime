import React from "react";
import uuid from "uuid4";

import renderCanvas from "./draw";
import { WIDTH, HEIGHT } from "./constants";

class ReactDaytime extends React.Component {
    constructor(props) {
        super(props);
        this.canvasId = uuid();
    }
    componentDidMount() {
        renderCanvas(this.canvasId);
    }
	render () {
		return <canvas id={this.canvasId} width={WIDTH} height={HEIGHT}></canvas>;
	}
}

export default ReactDaytime;

import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid4';

import DayTimeCanvas from './canvas';
import { WIDTH, HEIGHT } from './constants';

class ReactDaytime extends React.Component {
    constructor(props) {
        super(props);
        this.canvasId = 'react-daytime-' + uuid();
    }
    componentWillMount() {
        this.canvas = new DayTimeCanvas(this.props.onChange, this.props.defaultValue, this.props.theme);
    }
    componentDidMount() {
        this.canvas.render(this.canvasId);
    }
	render () {
		return <canvas id={this.canvasId} width={WIDTH} height={HEIGHT} />;
	}
}
ReactDaytime.propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    theme: PropTypes.object
};

export default ReactDaytime;

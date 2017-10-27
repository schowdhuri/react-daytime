'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid4 = require('uuid4');

var _uuid42 = _interopRequireDefault(_uuid4);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _constants = require('./constants');

var ReactDaytime = (function (_React$Component) {
    _inherits(ReactDaytime, _React$Component);

    function ReactDaytime(props) {
        _classCallCheck(this, ReactDaytime);

        _get(Object.getPrototypeOf(ReactDaytime.prototype), 'constructor', this).call(this, props);
        this.canvasId = 'react-daytime-' + (0, _uuid42['default'])();
    }

    _createClass(ReactDaytime, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.canvas = new _canvas2['default'](this.props.onChange, this.props.defaultValue, this.props.theme);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.canvas.render(this.canvasId);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('canvas', { id: this.canvasId, width: _constants.WIDTH, height: _constants.HEIGHT });
        }
    }]);

    return ReactDaytime;
})(_react2['default'].Component);

ReactDaytime.propTypes = {
    defaultValue: _propTypes2['default'].object,
    onChange: _propTypes2['default'].func,
    theme: _propTypes2['default'].object
};

exports['default'] = ReactDaytime;
module.exports = exports['default'];
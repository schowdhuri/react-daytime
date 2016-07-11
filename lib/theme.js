'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var COLOR_SELECTED = '#7cdc4b';
var COLOR_UNSELECTED = '#e3e3e4';
var COLOR_BORDER = '#f2f2f2';
var COLOR_HEADER_BG = '#777572';
var COLOR_HEADER_BG_SELECTED = '#61c72d';
var COLOR_HEADER = '#fff';
var COLOR_HEADER_SELECTED = '#fff';

var Theme = function Theme() {
    var customTheme = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Theme);

    if (customTheme.cell) {
        this.cell = {
            backgroundColor: [customTheme.cell.backgroundColor && customTheme.cell.backgroundColor[0] || COLOR_UNSELECTED, customTheme.cell.backgroundColor && customTheme.cell.backgroundColor[1] || COLOR_SELECTED]
        };
    } else {
        this.cell = {
            backgroundColor: [COLOR_UNSELECTED, COLOR_SELECTED]
        };
    }
    if (customTheme.header) {
        this.header = {
            color: [customTheme.header.color && customTheme.header.color[0] || COLOR_HEADER, customTheme.header.color && customTheme.header.color[1] || COLOR_HEADER_SELECTED],
            backgroundColor: [customTheme.header.backgroundColor && customTheme.header.backgroundColor[0] || COLOR_HEADER_BG, customTheme.header.backgroundColor && customTheme.header.backgroundColor[1] || COLOR_HEADER_BG_SELECTED]
        };
    } else {
        this.header = {
            color: [COLOR_HEADER, COLOR_HEADER_SELECTED],
            backgroundColor: [COLOR_HEADER_BG, COLOR_HEADER_BG_SELECTED]
        };
    }
    if (customTheme.border) {
        this.border = {
            color: [customTheme.border.color || COLOR_BORDER]
        };
    } else {
        this.border = {
            color: COLOR_BORDER
        };
    }
};

exports['default'] = Theme;
module.exports = exports['default'];
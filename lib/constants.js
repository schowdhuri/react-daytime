'use strict';

Object.defineProperty(exports, '__esModule', {
                        value: true
});
var CELL_WIDTH = 25;
exports.CELL_WIDTH = CELL_WIDTH;
var CELL_HEIGHT = 25;

exports.CELL_HEIGHT = CELL_HEIGHT;
var STARTX = 50;
exports.STARTX = STARTX;
var STARTY = 50;

exports.STARTY = STARTY;
var WIDTH = CELL_WIDTH * 24 + STARTX;
exports.WIDTH = WIDTH;
var HEIGHT = CELL_HEIGHT * 7 + STARTY;

exports.HEIGHT = HEIGHT;
var COLOR_SELECTED = '#7cdc4b';
exports.COLOR_SELECTED = COLOR_SELECTED;
var COLOR_UNSELECTED = '#e3e3e4';
exports.COLOR_UNSELECTED = COLOR_UNSELECTED;
var COLOR_BORDER = '#f2f2f2';
exports.COLOR_BORDER = COLOR_BORDER;
var COLOR_HEADER_BG = '#777572';
exports.COLOR_HEADER_BG = COLOR_HEADER_BG;
var COLOR_HEADER_BG_SELECTED = '#61c72d';
exports.COLOR_HEADER_BG_SELECTED = COLOR_HEADER_BG_SELECTED;
var COLOR_HEADER = '#fff';
exports.COLOR_HEADER = COLOR_HEADER;
var COLOR_HEADER_SELECTED = '#fff';

exports.COLOR_HEADER_SELECTED = COLOR_HEADER_SELECTED;
var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
exports.DAYS = DAYS;
var HOURS = '12 am,1 am,2 am,3 am,4 am,5 am,6 am,7 am,8 am,9 am,10 am,11 am,12 pm,1 pm,2 pm,3 pm,4 pm,5 pm,6 pm,7 pm,8 pm,9 pm,10 pm,11 pm'.toUpperCase().split(',');
exports.HOURS = HOURS;
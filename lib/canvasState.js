"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var state = [];
exports.state = state;
var dayState = [];
exports.dayState = dayState;
var hourState = [];

exports.hourState = hourState;
var dragState = {
    dragStart: null,
    startCell: null,
    dragging: false,
    paintSelected: true
};

exports.dragState = dragState;
var callbacks = {
    onChange: function onChange(f) {
        return f;
    }
};
exports.callbacks = callbacks;
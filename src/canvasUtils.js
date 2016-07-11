import paper from "paper";

import { COLOR_SELECTED, COLOR_UNSELECTED, COLOR_HEADER_BG, COLOR_HEADER_BG_SELECTED } from "./constants";
import { state, dayState, hourState } from "./canvasState";

export function findCell(point, cellState) {
    let found = null;
    cellState.forEach(row => {
        row.forEach(slot => {
            if(slot.cell.hitTest(point))
                found = slot;
        });
    });
    return found;
}

export function findAllSelected(cellState, p1, p2, callback) {
    const marquee = new paper.Rectangle(p1, p2);
    cellState.forEach(row => {
        row.forEach(slot => {
            if(slot.cell.isInside(marquee) || slot.cell.bounds.intersects(marquee))
                callback(slot);
        });
    });
}

function syncHeaderState() {
    let selected;
    let i, j;
    for(i=0; i<7; i++) {
        selected = true;
        for(j=0; j<24; j++) {
            if(!state[i][j].selected) {
                selected = false;
                break;
            }
        }
        setHeaderState(dayState[i], selected);
    }
    for(i=0; i<24; i++) {
        selected = true;
        for(j=0; j<7; j++) {
            if(!state[j][i].selected) {
                selected = false;
                break;
            }
        }
        setHeaderState(hourState[i], selected);
    }
}

export function setState(state, selected) {
    state.selected = selected;
    if(selected) {
        state.cell.fillColor = COLOR_SELECTED;
    } else {
        state.cell.fillColor = COLOR_UNSELECTED;
    }
    syncHeaderState();
    return state;
}

function setHeaderState(state, selected) {
    state.selected = selected;
    if(selected) {
        state.cell.fillColor = COLOR_HEADER_BG_SELECTED;
    } else {
        state.cell.fillColor = COLOR_HEADER_BG;
    }
    return state;
}

function flipHeaderCell(state) {
    const selected = state.selected = !state.selected;
    setHeaderState(state, selected);
    return selected;
}

export function flipCell(state) {
    const selected = state.selected = !state.selected;
    setState(state, selected);
    return selected;
}

export function flipRow(rowState, cellState, index) {
    const selected = flipHeaderCell(rowState[index]);
    let j;
    for(j=0; j<24; j++) {
        setState(cellState[index][j], selected);
    }
}

export function flipCol(colState, cellState, index) {
    const selected = flipHeaderCell(colState[index]);
    let j;
    for(j=0; j<7; j++) {
        setState(cellState[j][index], selected);
    }
}

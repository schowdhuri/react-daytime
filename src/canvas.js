import paper from "paper";

import * as CONSTANTS from "./constants";
import { state, hourState, dayState, dragState, callbacks } from "./canvasState";

import Theme from "./theme";

export default class DayTimeCanvas {
    constructor(onChange, defaultValue, customTheme) {
        this.theme = new Theme(customTheme);
        this.defaultValue = defaultValue;
        callbacks.onChange = onChange;
    }

    _findCell(point) {
        let found = null;
        state.forEach(row => {
            row.forEach(slot => {
                if(slot.cell.hitTest(point))
                    found = slot;
            });
        });
        return found;
    }

    _findAllSelected(p1, p2, callback) {
        const marquee = new paper.Rectangle(p1, p2);
        state.forEach(row => {
            row.forEach(slot => {
                if(slot.cell.isInside(marquee) || slot.cell.bounds.intersects(marquee))
                    callback(slot);
            });
        });
    }

    _syncHeaderState() {
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
            this._setHeaderState(dayState[i], selected);
        }
        for(i=0; i<24; i++) {
            selected = true;
            for(j=0; j<7; j++) {
                if(!state[j][i].selected) {
                    selected = false;
                    break;
                }
            }
            this._setHeaderState(hourState[i], selected);
        }
    }

    _fireChangeEvent() {
        const result = {};
        if(typeof(callbacks.onChange)==="function") {
            state.forEach((row, rownum) => {
                const selectedHours = [];
                row.forEach((col, colnum) => {
                    if(col.selected) {
                        selectedHours.push(colnum);
                    }
                });
                if(selectedHours.length) {
                    result[CONSTANTS.DAYS[rownum]] = selectedHours;
                }
            });
            callbacks.onChange(result);
        }
    }

    _setState(cellState, selected) {
        cellState.selected = selected;
        if(selected) {
            cellState.cell.fillColor = this.theme.cell.backgroundColor[1];
        } else {
            cellState.cell.fillColor = this.theme.cell.backgroundColor[0];
        }
        this._syncHeaderState();
        return cellState;
    }

    _setHeaderState(cellState, selected) {
        cellState.selected = selected;
        if(selected) {
            cellState.cell.fillColor = this.theme.header.backgroundColor[1];
            cellState.label.fillColor = this.theme.header.color[1];
        } else {
            cellState.cell.fillColor = this.theme.header.backgroundColor[0];
            cellState.label.fillColor = this.theme.header.color[0];
        }
        return state;
    }

    _flipHeaderCell(cellState) {
        const selected = !cellState.selected;
        this._setHeaderState(cellState, selected);
        return selected;
    }

    _flipCell(cellState) {
        const selected = !cellState.selected;
        this._setState(cellState, selected);
        this._fireChangeEvent();
        return selected;
    }

    _flipRow(rowState, index) {
        const selected = this._flipHeaderCell(rowState[index]);
        let j;
        for(j=0; j<24; j++) {
            this._setState(state[index][j], selected);
        }
        this._fireChangeEvent();
    }

    _flipCol(colState, index) {
        const selected = this._flipHeaderCell(colState[index]);
        let j;
        for(j=0; j<7; j++) {
            this._setState(state[j][index], selected);
        }
        this._fireChangeEvent();
    }

    _onDragEnd() {
        this._fireChangeEvent();
    }

    _drawSlots() {
        let i, j;
        for(i=0; i<7; i++) {
            state[i] = [];
            for(j=0; j<24; j++) {
                const topLeft = new paper.Point(CONSTANTS.STARTX + j*CONSTANTS.CELL_WIDTH, CONSTANTS.STARTY + i*CONSTANTS.CELL_HEIGHT);
                const rectSize = new paper.Size(CONSTANTS.CELL_WIDTH, CONSTANTS.CELL_HEIGHT);
                const rect = new paper.Rectangle(topLeft, rectSize);
                const path = new paper.Path.Rectangle(rect);
                path.fillColor = this.theme.cell.backgroundColor[0];
                path.strokeColor = this.theme.border.color;

                state[i][j] = {
                    cell: path,
                    selected: false,
                    x1: topLeft.x,
                    y1: topLeft.y,
                    x2: topLeft.x + CONSTANTS.CELL_WIDTH,
                    y2: topLeft.y + CONSTANTS.CELL_HEIGHT
                };
                ((day, hour, slot) => {
                    slot.on("click", ev => {
                        this._flipCell(state[day][hour]);
                    });
                    slot.on("mousedrag", f => f);
                })(i, j, path);
            }
        }
    }

    _drawColHeader() {
        // DAY CONTROLLERS
        let i, j;
        for(i=0; i<7; i++) {
            const topLeft = new paper.Point(0, CONSTANTS.STARTY + i*CONSTANTS.CELL_HEIGHT);
            const rectSize = new paper.Size(CONSTANTS.STARTX, CONSTANTS.CELL_HEIGHT);
            const rect = new paper.Rectangle(topLeft, rectSize);
            const path = new paper.Path.Rectangle(rect);

            const label = new paper.PointText();
            label.content = CONSTANTS.DAYS[i];
            label.fillColor = this.theme.header.color[0];
            label.position = new paper.Point(CONSTANTS.STARTX/2, topLeft.y + CONSTANTS.CELL_HEIGHT/2);

            path.fillColor = this.theme.header.backgroundColor[0];
            path.strokeColor = this.theme.border.color;

            dayState[i] = {
                cell: path,
                label,
                selected: false,
                x1: topLeft.x,
                y1: topLeft.y,
                x2: topLeft.x + CONSTANTS.CELL_WIDTH,
                y2: topLeft.y + CONSTANTS.CELL_HEIGHT
            };
            ((day, slot) => {
                const selectAllHours = ev => {
                    this._flipRow(dayState, day);
                }
                slot.on("click", selectAllHours);
                label.on("click", selectAllHours);
            })(i, path);
        }
    }

    _drawRowHeader() {
        // HOUR CONTROLLERS
        let i, j;
        for(i=0; i<24; i++) {
            const topLeft = new paper.Point(CONSTANTS.STARTX + i * CONSTANTS.CELL_WIDTH, 0);
            const rectSize = new paper.Size(CONSTANTS.CELL_WIDTH, CONSTANTS.STARTY);
            const rect = new paper.Rectangle(topLeft, rectSize);
            const path = new paper.Path.Rectangle(rect);

            const label = new paper.PointText();
            label.content = CONSTANTS.HOURS[i];
            label.fillColor = this.theme.header.color[0];
            label.position = new paper.Point(topLeft.x + CONSTANTS.CELL_WIDTH/2, topLeft.y + CONSTANTS.STARTY/2);
            label.rotation = -90;

            path.fillColor = this.theme.header.backgroundColor[0];
            path.strokeColor = this.theme.border.color;

            hourState[i] = {
                cell: path,
                label,
                selected: false,
                x1: topLeft.x,
                y1: topLeft.y,
                x2: topLeft.x + CONSTANTS.CELL_WIDTH,
                y2: topLeft.y + CONSTANTS.CELL_HEIGHT
            };
            ((hour, slot) => {
                const selectAllDays = () => {
                    this._flipCol(hourState, hour);
                }
                label.on("click", selectAllDays);
                slot.on("click", selectAllDays);
            })(i, path);
        }
    }

    _drawFiller() {
        // filler
        const filler = new paper.Path.Rectangle(
            new paper.Rectangle(
                new paper.Point(0,0),
                new paper.Size(CONSTANTS.STARTX, CONSTANTS.STARTY)
            )
        );
        filler.fillColor = this.theme.header.backgroundColor[0];
    }

    _populateDefaultState() {
        // set defaultValue
        CONSTANTS.DAYS.forEach((day, dayNum) => {
            CONSTANTS.HOURS.forEach((hour, hourNum) => {
                if(this.defaultValue && day in this.defaultValue && this.defaultValue[day].indexOf(hourNum) >= 0)
                    this._setState(state[dayNum][hourNum], true);
            });
        });
    }

    _attachEvents() {
        // Marquee Select
        paper.view.on("mousedrag", ev => {
            const pos = ev.point;
            if(!dragState.dragging) {
                dragState.dragging = true;
                dragState.dragStart = pos;
                dragState.startCell = this._findCell(pos);
                if(dragState.startCell) {
                    dragState.paintSelected = !dragState.startCell.selected;
                } else {
                    dragState.paintSelected = true;
                }
            }
            this._findAllSelected(dragState.dragStart, pos, slot => {
                this._setState(slot, dragState.paintSelected);
            });
        });
        // End drag-mode
        paper.view.on("mouseup", ev => {
            if(dragState.dragging) {
                dragState.dragging = false;
                this._onDragEnd();
            }
        });
    }

    render(canvasId) {
        paper.setup(canvasId);
        this._drawRowHeader();
        this._drawColHeader();
        this._drawFiller();
        this._drawSlots();
        this._populateDefaultState();
        this._attachEvents();
    }
}

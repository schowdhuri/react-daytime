import paper from "paper";

import * as CONSTANTS from "./constants";
import { state, hourState, dayState, dragState } from "./canvasState";
import * as utils from "./canvasUtils";

function initCanvas(canvasId) {
    paper.setup(canvasId);
}

function drawSlots() {
    let i, j;
    for(i=0; i<7; i++) {
        state[i] = [];
        for(j=0; j<24; j++) {
            const topLeft = new paper.Point(CONSTANTS.STARTX + j*CONSTANTS.CELL_WIDTH, CONSTANTS.STARTY + i*CONSTANTS.CELL_HEIGHT);
            const rectSize = new paper.Size(CONSTANTS.CELL_WIDTH, CONSTANTS.CELL_HEIGHT);
            const rect = new paper.Rectangle(topLeft, rectSize);
            const path = new paper.Path.Rectangle(rect);
            path.fillColor = CONSTANTS.COLOR_UNSELECTED;
            path.strokeColor = CONSTANTS.COLOR_BORDER;

            state[i][j] = {
                cell: path,
                selected: false,
                x1: topLeft.x,
                y1: topLeft.y,
                x2: topLeft.x + CONSTANTS.CELL_WIDTH,
                y2: topLeft.y + CONSTANTS.CELL_HEIGHT
            };
            ((day, hour, slot) => {
                slot.on("click", function(ev) {
                    utils.flipCell(state[day][hour]);
                });
                slot.on("mousedrag", f => f);
            })(i, j, path);
        }
    }
}

function drawColHeader() {
    // DAY CONTROLLERS
    const days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];

    let i, j;
    for(i=0; i<7; i++) {
        const topLeft = new paper.Point(0, CONSTANTS.STARTY + i*CONSTANTS.CELL_HEIGHT);
        const rectSize = new paper.Size(CONSTANTS.STARTX, CONSTANTS.CELL_HEIGHT);
        const rect = new paper.Rectangle(topLeft, rectSize);
        const path = new paper.Path.Rectangle(rect);

        const label = new paper.PointText();
        label.content = days[i];
        label.fillColor = CONSTANTS.COLOR_HEADER;
        label.position = new paper.Point(CONSTANTS.STARTX/2, topLeft.y + CONSTANTS.CELL_HEIGHT/2);

        path.fillColor = CONSTANTS.COLOR_HEADER_BG;
        path.strokeColor = CONSTANTS.COLOR_BORDER;

        dayState[i] = {
            cell: path,
            selected: false,
            x1: topLeft.x,
            y1: topLeft.y,
            x2: topLeft.x + CONSTANTS.CELL_WIDTH,
            y2: topLeft.y + CONSTANTS.CELL_HEIGHT
        };
        ((day, slot) => {
            function selectAllHours(ev) {
                utils.flipRow(dayState, state, day);
            }
            slot.on("click", selectAllHours);
            label.on("click", selectAllHours);
        })(i, path);
    }
}

function drawRowHeader() {
    // HOUR CONTROLLERS
    const hours = "12 am,1 am,2 am,3 am,4 am,5 am,6 am,7 am,8 am,9 am,10 am,11 am,12 pm,1 pm,2 pm,3 pm,4 pm,5 pm,6 pm,7 pm,8 pm,9 pm,10 pm,11 pm"
                .toUpperCase().split(",");
    let i, j;
    for(i=0; i<24; i++) {
        const topLeft = new paper.Point(CONSTANTS.STARTX + i * CONSTANTS.CELL_WIDTH, 0);
        const rectSize = new paper.Size(CONSTANTS.CELL_WIDTH, CONSTANTS.STARTY);
        const rect = new paper.Rectangle(topLeft, rectSize);
        const path = new paper.Path.Rectangle(rect);

        const label = new paper.PointText();
        label.content = hours[i];
        label.fillColor = "#fff";
        label.position = new paper.Point(topLeft.x + CONSTANTS.CELL_WIDTH/2, topLeft.y + CONSTANTS.STARTY/2);
        label.rotation = -90;

        path.fillColor = CONSTANTS.COLOR_HEADER_BG;
        path.strokeColor = CONSTANTS.COLOR_BORDER;

        hourState[i] = {
            cell: path,
            selected: false,
            x1: topLeft.x,
            y1: topLeft.y,
            x2: topLeft.x + CONSTANTS.CELL_WIDTH,
            y2: topLeft.y + CONSTANTS.CELL_HEIGHT
        };
        ((hour, slot) => {
            function selectAllDays() {
                utils.flipCol(hourState, state, hour);
            }
            label.on("click", selectAllDays);
            slot.on("click", selectAllDays);
        })(i, path);
    }
}

function drawFiller() {
    // filler
    const filler = new paper.Path.Rectangle(
        new paper.Rectangle(
            new paper.Point(0,0),
            new paper.Size(CONSTANTS.STARTX, CONSTANTS.STARTY)
        )
    );
    filler.fillColor = CONSTANTS.COLOR_HEADER_BG;
}

function attachEvents() {
    // Marquee Select
    paper.view.on("mousedrag", function(ev) {
        const pos = ev.point;
        if(!dragState.dragging) {
            dragState.dragging = true;
            dragState.dragStart = pos;
            dragState.startCell = utils.findCell(pos, state);
            if(dragState.startCell) {
                dragState.paintSelected = !dragState.startCell.selected;
            } else {
                dragState.paintSelected = true;
            }
        }
        utils.findAllSelected(state, dragState.dragStart, pos, function(slot) {
            utils.setState(slot, dragState.paintSelected);
        });
    });
    // End drag-mode
    paper.view.on("mouseup", function(ev) {
        dragState.dragging = false;
    });
}

export default function renderCanvas(canvasId) {
    initCanvas(canvasId);
    drawRowHeader();
    drawColHeader();
    drawFiller();
    drawSlots();
    attachEvents();
}

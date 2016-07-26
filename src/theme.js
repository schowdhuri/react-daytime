const COLOR_SELECTED = '#7cdc4b';
const COLOR_UNSELECTED = '#e3e3e4';
const COLOR_BORDER = '#f2f2f2';
const COLOR_HEADER_BG = '#777572';
const COLOR_HEADER_BG_SELECTED = '#61c72d';
const COLOR_HEADER = '#fff';
const COLOR_HEADER_SELECTED = '#fff';

export default class Theme {
    constructor(customTheme={}) {
        if(customTheme.cell) {
            this.cell = {
                backgroundColor: [
                    customTheme.cell.backgroundColor && customTheme.cell.backgroundColor[0] || COLOR_UNSELECTED,
                    customTheme.cell.backgroundColor && customTheme.cell.backgroundColor[1] || COLOR_SELECTED
                ]
            };
        } else {
            this.cell = {
                backgroundColor: [ COLOR_UNSELECTED, COLOR_SELECTED ]
            };
        }
        if(customTheme.header) {
            this.header = {
                color: [
                    customTheme.header.color && customTheme.header.color[0] || COLOR_HEADER,
                    customTheme.header.color && customTheme.header.color[1] || COLOR_HEADER_SELECTED
                ],
                backgroundColor: [
                    customTheme.header.backgroundColor && customTheme.header.backgroundColor[0] || COLOR_HEADER_BG,
                    customTheme.header.backgroundColor && customTheme.header.backgroundColor[1] || COLOR_HEADER_BG_SELECTED
                ],
                fontFamily: customTheme.header.fontFamily || ''
            };
        } else {
            this.header = {
                color: [ COLOR_HEADER, COLOR_HEADER_SELECTED ],
                backgroundColor: [ COLOR_HEADER_BG, COLOR_HEADER_BG_SELECTED ]
            };
        }
        if(customTheme.border) {
            this.border = {
                color: [
                    customTheme.border.color || COLOR_BORDER
                ]
            };
        } else {
            this.border = {
                color: COLOR_BORDER
            };
        }
    }
}

# react-daytime

![react-daytime screenshot](/screenshots/01.png?raw=true)


## Demo

Live demo: [schowdhuri.github.io/react-daytime](http://schowdhuri.github.io/react-daytime/)

To build the example locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-daytime is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-daytime.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-daytime --save
```


## Usage

```
import ReactDaytime from 'react-daytime';

<ReactDaytime onChange={handleChange} theme={colorTheme} defaultValue={defaultValue} />
```

### Props

* `onChange` - fired every time the selection is changed. The event handler is passed the new selection state. The value is an object of the form `{ [day]: [ Array of selected hours ] }`. See sample selection object below.
* `theme` - changes the color scheme. See sample theme object below.
* `defaultValue` - sets the initial selection

__Sample theme__

Colors are saved as arrays.  The first color in the array is used for 'normal' state and the second for 'selected' state.

```
{
  cell: {
    backgroundColor: [ "#f2f2f2", "#3de3e6" ]
  },
  header: {
    color: [ "#000000", "#ffffff" ],
    backgroundColor: [ "#97e0c0", "#4f806a" ],
    fontFamily: "Roboto, sans-serif"
  },
  border: {
    color: "#fff" // there is no selected border color
  }
}
```

__Sample selection object__
```
{
  "Fri": [ 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 0 ],
  "Mon": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
}
```

## Development (`src`, `lib` and the build process)

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.


## License

The MIT License (MIT)

Copyright (c) 2017 Subir Chowdhuri.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


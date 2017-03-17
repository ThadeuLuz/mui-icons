# Mui Icons

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/mui-icons.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mui-icons

Effortlessly include icons from the most popular icon libraries in you [Material-UI](http://www.material-ui.com/#/) project. This project wraps each icon with Mui's [SvgIcon](http://www.material-ui.com/#/components/svg-icon) component and exports them using ES6 imports, so they are easy to import and use, and will match your theme.

## Installation

This package has `material-ui` as a peer dependency

    npm install react-icons-mui material-ui --save

## Usage

Simply import the icons you want and add them to [IconButtons](http://www.material-ui.com/#/components/icon-button) or anywhere else.

```javascript
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Pizza from 'mui-icons/ionicons/pizza';

const PizzaButton = () => (
  <IconButton>
    <Pizza />
  <IconButton>
);

export default PizzaButton;
```

## Libraries Included

| Name | Folder Name | Home Page | Number if Icons |
|---|---|---|---|
| Community Material Design Icons | `cmdi` | https://materialdesignicons.com/ | 1956 |
| Evil Icons | `evilicons` | http://evil-icons.io/ | 70 |
| FontAwesome | `fontawesome` | http://fontawesome.io/ | 694 |
| Ionicons | `ionicons` | http://ionicons.com/ | 859 |
| Material Design Icons | `mdi` | https://material.io/icons/ | 959 |
| Github Octicons | `octicons` | https://octicons.github.com/ | 176 |
| Typicons | `typicons` | http://www.typicons.com/ | 336 |

## Configuration

Any props added to an Icon will be forwarded to Mui's SvgIcon element (except for `children`, which will be the paths of the icon you want). [Check the Mui docs](http://www.material-ui.com/#/components/svg-icon) to see it's props.

## Known Issues

- Ionicons uses style on some icons, which react doesn't seem to like.
- `svgscaler` breaks IonIcons and EvilIcons. Using style to reset scale and position.

## Final Notes

This package is based on the excelent [react-icons](https://github.com/gorangajic/react-icons) package.

### Licence

MIT

* Icons are taken from the other projects so please check each project licences accordingly.

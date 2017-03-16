# Mui Icons

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/mui-icons.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mui-icons

Effortlessly include icons from the most popular icon libraries in you [Material-UI](http://www.material-ui.com/#/) project. This project just wraps each icon with Mui's [SvgIcon](http://www.material-ui.com/#/components/svg-icon) component and exports them using ES6 imports.

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

| Name | Folder Name | Home Page |
|---|---|---|
| Material Design Icons | `mdi` | https://material.io/icons/
| FontAwesome | `fontawesome` | http://fontawesome.io/ |
| Typicons | `typicons` | http://www.typicons.com/ |
| Github Octicons | `octicons` | https://octicons.github.com/ |
| Ionicons | `ionicons` | http://ionicons.com/ |
| Evil Icons | `evilicons` | http://evil-icons.io/ |

## Configuration

Any props added to an Icon will be forwarded to Mui's SvgIcon element (except for `children`, which will be the path of the icon you want). [Check the Mui docs](http://www.material-ui.com/#/components/svg-icon) to see it's props.

## Final Notes

This package is heavily based on top of the excelent [react-icons](https://github.com/gorangajic/react-icons) package.

### Licence

MIT

* Icons are taken from the other projects so please check each project licences accordingly.

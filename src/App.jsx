import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import IconList from './IconList';

const Menu = ({ setLibrary, library, ...props }) => (
  <IconMenu
    {...props}
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Community M. D. Icons"
      onTouchTap={() => { setLibrary('cmdi'); }}
      disabled={library === 'cmdi'}
    />
    <MenuItem
      primaryText="EvilIcons"
      onTouchTap={() => { setLibrary('evilicons'); }}
      disabled={library === 'evilicons'}
    />
    <MenuItem
      primaryText="FontAwesome"
      onTouchTap={() => { setLibrary('fontawesome'); }}
      disabled={library === 'fontawesome'}
    />
    <MenuItem
      primaryText="IonIcons"
      onTouchTap={() => { setLibrary('ionicons'); }}
      disabled={library === 'ionicons'}
    />
    <MenuItem
      primaryText="Material Design Icons"
      onTouchTap={() => { setLibrary('mdi'); }}
      disabled={library === 'mdi'}
    />
    <MenuItem
      primaryText="Github Octicons"
      onTouchTap={() => { setLibrary('octicons'); }}
      disabled={library === 'octicons'}
    />
    <MenuItem
      primaryText="Typicons"
      onTouchTap={() => { setLibrary('typicons'); }}
      disabled={library === 'octtypiconsicons'}
    />
  </IconMenu>
);
Menu.propTypes = {
  setLibrary: PropTypes.func.isRequired,
  library: PropTypes.string.isRequired,
};
Menu.muiName = 'IconMenu';


class App extends Component {
  state = {
    library: 'mdi',
  };

  render() {
    const { library } = this.state;

    return (
      <div style={{ height: '100%' }}>
        <AppBar
          style={{ position: 'fixed' }}
          title="Mui Icons"
          iconElementLeft={<span />}
          iconElementRight={
            <Menu
              library={library}
              setLibrary={
                (lib) => { this.setState({ library: lib }); }
              }
            />
          }
        />
        <IconList library={library} />
      </div>
    );
  }
}

export default App;

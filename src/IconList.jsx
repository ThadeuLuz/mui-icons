import React, { PropTypes } from 'react';
import { values, keys } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';

import * as Cmdi from '../cmdi';
import * as Evilicons from '../evilicons';
import * as Fontawesome from '../fontawesome';
import * as Ionicons from '../ionicons';
import * as Mdi from '../mdi';
import * as Octicons from '../octicons';
import * as Typicons from '../typicons';

const libraries = {
  cmdi: Cmdi,
  evilicons: Evilicons,
  fontawesome: Fontawesome,
  ionicons: Ionicons,
  mdi: Mdi,
  octicons: Octicons,
  typicons: Typicons,
};

const style = {
  container: {
    padding: '72px 8px  8px  8px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  content: {
    display: 'block',
    padding: 8,
  },
};


const IconList = ({ library }) => {
  const Lib = libraries[library];

  const keyArray = keys(Lib);
  const buttons = values(Lib).map((Icon, i) => (
    <div key={keyArray[i]} style={style.content}>
      <RaisedButton
        label={<span style={{ textTransform: 'none' }}>{keyArray[i]}</span>}
        secondary
        icon={<Icon />}
      />
    </div>
  ));

  return (
    <div style={style.container}>
      {buttons}
    </div>
  );
};
IconList.propTypes = {
  library: PropTypes.string.isRequired,
};

export default IconList;

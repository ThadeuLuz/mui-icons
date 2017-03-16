import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import { mkdirSync, removeSync, readFileSync, writeFileSync } from 'fs-extra';

// Grabbing svgs from source makes updates easier (font awesome and typicons take more work)
const libraries = {
  mdi: { 
    glob: './node_modules/material-design-icons/*/svg/production/*_24px.svg',
    remove: ['ic_', '_24px'],
  },
  cmdi: {
    glob: './iconsSrc/fontawesome/*.svg',
  },
  fontawesome: {
    glob: './iconsSrc/fontawesome/*.svg',
  },
  typicons: {
    glob: './iconsSrc/typicons/*.svg',
  },
  octicons: {
    glob: './node_modules/octicons/build/svg/*.svg',
  },
  ionicons: { 
    glob: './node_modules/ionicons/dist/svg/*.svg',
  },
  evilicons: {
    glob: './node_modules/evil-icons/assets/icons/*.svg',
    remove: ['ei-'],
  }
};

const compiled = _.template(
`import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const Icon = props => (
  <SvgIcon {...props}>
    <g><%= svgPaths %></g>
  </SvgIcon>
)

export default Icon;
`);

const summary = {};

_.forEach(libraries, (config, code) => {
  // Setup dirs
  removeSync(`./${code}`)
  mkdirSync(`./${code}`);

  // Create empty array for each lib
  summary[code] = [];

  // Find and loop through svgs
  const filePaths = glob.sync(config.glob);

  filePaths.slice(0, 10).forEach((filePath) => {

    let basename = path.basename(filePath, '.svg');
    (config.remove || []).forEach(s => basename = basename.replace(s, ''))

    const svgPaths = readFileSync(filePath, 'utf-8')
      .replace(/<svg.*?>/, '')
      .replace("</svg>", "");

    writeFileSync(`./${code}/${basename}.js`, compiled({ svgPaths }));

    summary[code].push(basename);
    console.log(`Built file for ${code}: ${basename}`);

  });
});

writeFileSync(`./index.js`, `module.exports = ${JSON.stringify(summary, null, 2)}`);

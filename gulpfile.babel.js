/* eslint-disable no-param-reassign */
import gulp from 'gulp';
import svgscaler from 'svg-scaler';
import rename from 'gulp-rename';
import del from 'del';
import svgo from 'gulp-svgo';
import concatFilenames from 'gulp-concat-filenames';
import _, { upperFirst, camelCase, template, includes } from 'lodash';
import transform from 'gulp-transform';

// Source svgs
const globs = {
  mdi: './node_modules/material-design-icons/*/svg/production/*_24px.svg',
  evilicons: './node_modules/evil-icons/assets/icons/*.svg',
  octicons: './node_modules/octicons/build/svg/*.svg',
  ionicons: './node_modules/ionicons/dist/svg/*.svg',
  // Couldn't find them on npm, copied them to src/icons
  typicons: './src/icons/typicons/*.svg',
  cmdi: './src/icons/cmdi/*.svg',
  fontawesome: './src/icons/fontawesome/*.svg',
};

const compiled = template(
`import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const Icon = props => (
  <SvgIcon {...props}>
    <g><%= content %></g>
  </SvgIcon>
);

export default Icon;
`);

// The glob on mdi returns files with the same name. Exporting both causes an error on react.
const exported = [];
const concatConfig = c => ({
  root: `./${c}/`,
  template: (f) => {
    const moduleName = upperFirst(camelCase(`${c}-${f.replace('.jsx', '')}`));
    if (exported.includes(moduleName)) return `// export ${moduleName} from './${f}'`;
    exported.push(moduleName);
    return `export ${moduleName} from './${f}'`;
  },
});

const fix = (opt = {}) => (_content) => {
  let content = _content;

  // Remove xml
  content = _.replace(content, '<?xml version="1.0"?>', '');

  // Remove svg tags
  content = _.replace(content, /<svg .*?>/, '');
  content = _.replace(content, '</svg>', '');

  // Remove style tags and their content
  content = _.replace(content, /<style.*?\/style>/, '');

  // Remove fill
  content = _.replace(content, /fill=".*?"/, '');
  content = _.replace(content, /fill-opacity=".*?"/, '');

  // Remove namespace atts
  content = _.replace(content, /xlink:href=".*?"/, '');

  // Evilicons and Ionicons can't be scaled with svgscaler. We have to use css.
  if (opt.scale) {
    // We are in react, remember? So style={{...}}
    content = `<g style={{ transform: 'scale(${opt.scale})'}}>${content}</g>`;
  }

  if (opt.translate) {
    content = `<g style={{ transform: 'translate(${opt.translate})'}}>${content}</g>`;
  }

  return compiled({ content });
};

// Logs errors on common problems
const check = (content, v) => {
  if (!includes(content, 'export') ||
  !includes(content, '</g>') ||
  includes(content, 'NaN') ||
  includes(content, 'xml version')) {
    console.error('Broken:', v.path); // eslint-disable-line no-console
  }
  return content;
};

gulp.task('cmdi', ['clean'], () => gulp.src(globs.cmdi)
  .pipe(svgscaler({ width: 24 }))
  .pipe(svgo())
  .pipe(transform(fix(), { encoding: 'utf8' }))
  .pipe(rename({ dirname: '/', extname: '.jsx' }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./cmdi/'))
  .pipe(concatFilenames('index.js', concatConfig('cmdi')))
  .pipe(gulp.dest('./cmdi/')));


gulp.task('evilicons', ['clean'], () => gulp.src(globs.evilicons)
  // .pipe(svgscaler({ width: 24 })) // This breaks on evil icons! throws a bunch of NaN
  .pipe(svgo())
  // This is hacky, but we have to apply a manual transform/scale
  .pipe(transform(fix({ scale: '0.6', translate: '-3px,-3px' }), { encoding: 'utf8' }))
  .pipe(rename((path) => {
    path.dirname = '/';
    path.basename = path.basename.replace('ei-', '');
    path.extname = '.jsx';
  }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./evilicons/'))
  .pipe(concatFilenames('index.js', concatConfig('evilicons')))
  .pipe(gulp.dest('./evilicons/')));


gulp.task('fontawesome', ['clean'], () => gulp.src(globs.fontawesome)
  .pipe(svgscaler({ width: 24 }))
  .pipe(svgo())
  .pipe(transform(fix(), { encoding: 'utf8' }))
  .pipe(rename({ dirname: '/', extname: '.jsx' }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./fontawesome/'))
  .pipe(concatFilenames('index.js', concatConfig('fontawesome')))
  .pipe(gulp.dest('./fontawesome/')));


gulp.task('ionicons', ['clean'], () => gulp.src(globs.ionicons)
  // .pipe(svgscaler({ width: 24 })) // Breaks everything. Throws a bunch of NaN
  .pipe(svgo())
  // This is hacky, but we have to apply css scale
  .pipe(transform(fix({ scale: '0.045' }), { encoding: 'utf8' }))
  .pipe(rename({ dirname: '/', extname: '.jsx' }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./ionicons/'))
  .pipe(concatFilenames('index.js', concatConfig('ionicons')))
  .pipe(gulp.dest('./ionicons/')));


gulp.task('mdi', ['clean'], () => gulp.src(globs.mdi)
  .pipe(svgscaler({ width: 24 }))
  .pipe(svgo())
  .pipe(transform(fix(), { encoding: 'utf8' }))
  .pipe(rename((path) => {
    path.dirname = '/';
    path.basename = path.basename.replace('_24px', '').replace('ic_', '');
    path.extname = '.jsx';
  }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./mdi/'))
  .pipe(concatFilenames('index.js', concatConfig('mdi')))
  .pipe(gulp.dest('./mdi/')));


gulp.task('octicons', ['clean'], () => gulp.src(globs.octicons)
  .pipe(svgscaler({ width: 24 }))
  .pipe(svgo())
  .pipe(transform(fix(), { encoding: 'utf8' }))
  .pipe(rename({ dirname: '/', extname: '.jsx' }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./octicons/'))
  .pipe(concatFilenames('index.js', concatConfig('octicons')))
  .pipe(gulp.dest('./octicons/')));


gulp.task('typicons', ['clean'], () => gulp.src(globs.typicons)
  .pipe(svgscaler({ width: 24 }))
  .pipe(svgo())
  .pipe(transform(fix(), { encoding: 'utf8' }))
  .pipe(rename({ dirname: '/', extname: '.jsx' }))
  .pipe(transform(check, { encoding: 'utf8' }))
  .pipe(gulp.dest('./typicons/'))
  .pipe(concatFilenames('index.js', concatConfig('typicons')))
  .pipe(gulp.dest('./typicons/')));


gulp.task('build', [
  'cmdi',
  'evilicons',
  'fontawesome',
  'ionicons',
  'mdi',
  'octicons',
  'typicons',
]);


gulp.task('clean', () => del([
  './cmdi/',
  './evilicons/',
  './fontawesome/',
  './ionicons/',
  './mdi/',
  './octicons/',
  './typicons/',
]));

gulp.task('default', ['build']);

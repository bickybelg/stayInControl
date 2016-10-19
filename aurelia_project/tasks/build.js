import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS
  ),
  writeBundles,
  //copyToCordova //own input
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  copyToCordova();
  return build.dest();
}

//own input
function copyToCordova() {
  console.log("Started copying Aurelia files to www/ folder");
  copyIndexToCordova();
  copyAureliaSrcToCordova();
  copyScriptFolder();
  copyStylesFolder();
  console.log("Finished copying Aurelia files to www/ folder");
}

function copyIndexToCordova() {
  return gulp.src("index.html").pipe(gulp.dest('www/'));
}
function copyAureliaSrcToCordova() {
  return gulp.src("./src/*").pipe(gulp.dest('www/src/'));
}
function copyScriptFolder() {
  return gulp.src("./scripts/*").pipe(gulp.dest('www/scripts/'));
}
function copyStylesFolder() {
  return gulp.src("./styles/*").pipe(gulp.dest('www/styles/'));
}
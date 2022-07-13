const fs = require('fs-extra');
const path = require('path');

const spawn = require('cross-spawn')

const VueBuild = spawn('npm', ['run', 'build-client'])

VueBuild.on('exit', function (code, signal) {
  console.log('Client Dev process exited with ' +
    `code ${code} and signal ${signal}`);
  if (signal === null) {
    buildStatic()
  }
});

VueBuild.stdout.on('data', (data) => {
  console.log(`[Client Dev]: ${data}`);
});

VueBuild.stderr.on('data', (data) => {
  console.error(`[Client Dev]: ${data}`);
});

const buildStatic = () => {
  const oldPath = path.join(__dirname, '..', 'src', 'client', 'views')
  const newPath = path.join(__dirname, '..', 'dist')
  fs.copy(oldPath, newPath, err =>{
    if(err) return console.error(err);
    console.log('copying view files success!');
  });

  // move css
  const oldPathCSS = path.join(__dirname, '..', 'src', 'client', 'static', 'css')
  const newPathCSS = path.join(__dirname, '..', 'dist', 'css')

  fs.copy(oldPathCSS, newPathCSS, err =>{
    if(err) return console.error(err);
    console.log('copying css files success!');
  });

  // move css
  const oldPathImages = path.join(__dirname, '..', 'src', 'client', 'static', 'images')
  const newPathImages = path.join(__dirname, '..', 'dist', 'images')

  fs.copy(oldPathImages, newPathImages, err =>{
    if(err) return console.error(err);
    console.log('copying css files success!');
  });
}

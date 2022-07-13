const fs = require('fs')
const path = require('path');

// const spawn = require('cross-spawn')

// const VueBuild = spawn('npm', ['run', 'build-client'])

// VueBuild.on('exit', function (code, signal) {
//   console.log('Client Dev process exited with ' +
//     `code ${code} and signal ${signal}`);
//   if (signal === null) {
//     buildStatic()
//   }
// });

// VueBuild.stdout.on('data', (data) => {
//   console.log(`[Client Dev]: ${data}`);
// });

// VueBuild.stderr.on('data', (data) => {
//   console.error(`[Client Dev]: ${data}`);
// });

function move (oldPath, newPath, callback) {

  fs.rename(oldPath, newPath, function (err) {
      if (err) {
          if (err.code === 'EXDEV') {
              copy();
          } else {
            callback && callback(err);
          }
          return;
      }
      callback && callback();
  });

function copy() {
      var readStream = fs.createReadStream(oldPath);
      var writeStream = fs.createWriteStream(newPath);

      readStream.on('error', callback);
      writeStream.on('error', callback);

      readStream.on('close', function () {
          fs.unlink(oldPath, callback);
      });

      readStream.pipe(writeStream);
  }
}

const buildStatic = () => {
  const oldPath = path.join(__dirname, '..', 'src', 'views')
  const newPath = path.join(__dirname, '..', 'dist')
  move(oldPath, newPath)
}

buildStatic()
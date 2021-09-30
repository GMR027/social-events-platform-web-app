'use strict';

const fs = require('fs');
const packageJSON = require('./package.json');
const a = packageJSON.version.split('.');

console.log('package.json current version:', packageJSON.version);

if ( Number(a[2]) === 9 ) {
  if ( Number(a[1]) === 9 ) {
    a[0] = Number(a[0]) + 1;
    a[1] = 0;
  } else {
    a[1] = Number(a[1]) + 1;
  }
  a[2] = 0;
} else {
  a[2] = Number(a[2]) + 1;
}

packageJSON.version = `${a[0]}.${a[1]}.${a[2]}`;

console.log('package.json new version:', packageJSON.version);

const data = JSON.stringify(packageJSON, null, 2);
fs.writeFileSync('package.json', data);

return;

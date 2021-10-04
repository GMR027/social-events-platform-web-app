#! /bin/bash

mkdir views -p

cp build/index.html views/index.hbs
sed -i 's/\.\/cordova\.js//g' views/index.hbs

echo "Index done";
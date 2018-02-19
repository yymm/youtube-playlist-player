#!/bin/sh
[ -d docs ] || mkdir docs
cp -rf dist/* docs/
sed -i 's/src\=\//src\=/g' docs/index.html
sed -i 's/href\=\//href\=/g' docs/index.html

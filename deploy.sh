#!/bin/sh
rm -r docs
[ -d docs ] || mkdir docs
cp -rf dist/* docs/
sed -i 's/src\=\//src\=\.\//g' docs/index.html
sed -i 's/href\=\//href\=\.\//g' docs/index.html
sed -i '/"url"/s/"\//"\.\//g' docs/precache-manifest.*.js
sed -i 's/\/precache\-manifest/\.\/precache\-manifest/g' docs/service-worker.js
sed -i 's/"\/","service-worker/"\.\/","service-worker/g' docs/js/app.*.js
sed -i '/"src"/s/"\//"\.\//g' docs/manifest.json
sed -i '/"start_url"/s/"\//"\.\//g' docs/manifest.json

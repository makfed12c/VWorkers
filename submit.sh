#!/bin/sh
set -e
rm edge.zip
zip -r edge.zip src test demo extraParams.hxml haxelib.json LICENSE README.md -x "*/\.*"
haxelib submit edge.zip

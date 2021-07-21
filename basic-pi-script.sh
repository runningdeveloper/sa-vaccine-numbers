#!/bin/bash

# super simple script to run on the raspberry pi and commit the update

git pull
ISPI=true node index.mjs
git commit -m "scrape update" -- ./website/db.json
git push
echo "Done!"

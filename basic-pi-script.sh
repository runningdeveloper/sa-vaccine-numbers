#!/bin/bash

# super simple script to run on the raspberry pi and commit the update

cd /home/pi/sa-vaccine-numbers
git pull
ISPI=true /usr/local/bin/node index.mjs
git commit -m "scrape update" -- ./website/db.json
git push
echo "Done!"

# SA Vaccine Numbers

A small experiment to get the daily vaccination numbers in South Africa. Then send the numbers to twitter or something.

## Still a Work in Progress (WIP)

## How

The NICD is publishing data to a power bi dashboard here [https://sacoronavirus.co.za/latest-vaccine-statistics/](https://sacoronavirus.co.za/latest-vaccine-statistics/). So I am trying to read this data with a [Puppeteer](https://pptr.dev/) script and write the results to a json file.

Will try to keep the scraper up to date when things change

### Challenges

Cannot get the github action to run the puppeteer script. It doesn't seem to like the url, it cannot resolve the DNS for the powerbi website. I guess it has something to do with the action being a VM in azure. You can check some random debugging in the puppeteer-testing branch. So new solution to automate is to run the scrip on a raspberry pi at my home once a day.

Some details mainly for me to remember what I did:

- run using this command on the PI (it doesn't like the bundled chrome) ISPI=true node index.mjs
- setup the bash scrip to pull from the repo, run and then commit db.json, push

## Why

I don't really know what I'm doing. I wanted a simple vaccine number tracker to watch, can't wait till I'm allowed to get mine. If you think this is not useful or detrimental to the vaccine efforts let me know an I'll consider taking this down.

## Disclaimer

I got no affiliation with any health departments or government in South Africa. These numbers are read from the dashboard on [https://sacoronavirus.co.za/](https://sacoronavirus.co.za/). There are some disclaimers on this data on the dashboard page [https://sacoronavirus.co.za/latest-vaccine-statistics/](https://sacoronavirus.co.za/latest-vaccine-statistics/). The scaped data collected might be wrong if the dashboard is changed.
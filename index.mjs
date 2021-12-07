import puppeteer from 'puppeteer'
import { format, isValid, parse } from 'date-fns'
import { parseNumbers } from './utils.mjs';
import JSONdb from 'simple-json-db'
const db = new JSONdb('./website/db.json');

const url = `https://app.powerbi.com/view?r=eyJrIjoiMDNlNTMyZWUtYjkyYS00NGE1LTliZTktZDI4MDU0ZTU0OTk1IiwidCI6ImE1MTczNzFjLWYzMTYtNDg0Yy1hYzVjLTk4Yjc2MTI3NzkwYSIsImMiOjl9`

const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.ISPI?'chromium-browser':null,
    args: ['--disable-features=site-per-process']
});
const page = await browser.newPage();

await page.goto(url, { waitUntil: 'networkidle2' }).catch(e => {throw new Error(e)});

// wait for the nav icons
await page.waitForSelector(`.navigation-wrapper`, {
    visible: true,
})

// click for the next page 

await page.$eval(`[aria-label="Next Page"]`, el => el.click());

await page.waitForTimeout(3000)

const frameOne = page.frames().find(a => a.name() === 'visual-sandbox')

// wait for random selector to show up
await frameOne.waitForSelector(`.contentGrp`, {
    visible: true,
})

const reportNameSelector = `#pvExplorationHost text > title`
const reportName = await page.$eval(reportNameSelector, el => el.textContent);
console.log('name', reportName)

// const dateSelector = `#pvExplorationHost text > title`
const reportDate = reportName.substring(reportName.length-11) // await page.$$eval(dateSelector, els => els.map((el) => el.textContent)[1]);
console.log('reportDate', reportDate)

const vaccineTodaySelector = `.contentGrp title`
const vaccineToday = await frameOne.$eval(vaccineTodaySelector, el => el.textContent);
console.log('vaccineToday', parseNumbers(vaccineToday))

// click for the next page 

await page.$eval(`[aria-label="Next Page"]`, el => el.click());

await page.waitForTimeout(3000)

const frameTwo = page.frames().find(a => a.name() === 'visual-sandbox')


await frameTwo.waitForSelector(`.contentGrp`, {
    visible: true,
})

const totalVaccineSelector = `.contentGrp title`
const totalVaccine = await frameTwo.$eval(totalVaccineSelector, el => el.textContent);
console.log('totalVaccine', parseNumbers(totalVaccine))


// click for the next page 

await page.$eval(`[aria-label="Next Page"]`, el => el.click());

await page.waitForTimeout(3000)

await page.$eval(`[aria-label="Next Page"]`, el => el.click());

await page.waitForTimeout(3000)


const frameJohnson = page.frames().filter(a => a.name() === 'visual-sandbox')[1]

const framePfizer = page.frames().filter(a => a.name() === 'visual-sandbox')[2]

const frameSecondPfizer = page.frames().filter(a => a.name() === 'visual-sandbox')[6]

await framePfizer.waitForSelector(`.contentGrp`, {
    visible: true,
})

await frameSecondPfizer.waitForSelector(`.contentGrp`, {
    visible: true,
})


await frameJohnson.waitForSelector(`.contentGrp`, {
    visible: true,
})

const totalJohnsonSelector = `.contentGrp title`
const totalJohnson = await frameJohnson.$eval(totalJohnsonSelector, el => el.textContent);
console.log('totalJohnson', parseNumbers(totalJohnson))


const totalPfizerSelector = `.contentGrp title`
const totalPfizer = await framePfizer.$eval(totalPfizerSelector, el => el.textContent);
console.log('totalPfizer', parseNumbers(totalPfizer))

const totalSecondPfizerSelector = `.contentGrp title`
const totalSecondPfizer = await frameSecondPfizer.$eval(totalSecondPfizerSelector, el => el.textContent);
console.log('totalSecondPfizer', parseNumbers(totalSecondPfizer))


const totalCompletedVaccine = parseNumbers(totalJohnson) + parseNumbers(totalSecondPfizer)
console.log('totalCompletedVaccine', parseNumbers(totalCompletedVaccine))

// do something with the results

// get the date
const parsedDate = parse(reportDate, 'dd MMMM yyyy', new Date())

if(!isValid(parsedDate)){
    throw new Error('Cannot parse date something is probably wrong', reportDate)
}

// not sure if i should use this as the key

const reportKey = format(parsedDate, 'dd-MM-yyyy')

if(!db.has(reportKey)){
    db.set(reportKey, {
        recorded: new Date(),
        reportName: reportName,
        reportDate: reportDate,
        vaccineToday: parseNumbers(vaccineToday),
        totalVaccine: parseNumbers(totalVaccine),
        totalJohnson: parseNumbers(totalJohnson),
        totalPfizer: parseNumbers(totalPfizer),
        totalSecondPfizer: parseNumbers(totalSecondPfizer),
        totalCompletedVaccine: totalCompletedVaccine
    })
}else{
    throw new Error('Already done this date')
}

await page.close();

await browser.close();

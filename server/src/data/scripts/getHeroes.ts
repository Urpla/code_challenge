const puppeteer = require("puppeteer");
import { writeFile } from "fs";
import { resolve } from "path";
import Hero from "../../models/hero";

async function getHeroes() {
  const START_URL = "https://www.marvel.com/characters";
  const heroes: Hero[] = [];

  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  
  console.log('Getting heroes from website', START_URL);
  await page.goto(START_URL);

  await page.waitForSelector("body");


  await browser.close();

  writeFile(
    resolve(__dirname, "../heroes.json"),
    JSON.stringify(heroes, null, 2),
    err => {
      if (err) {
        throw err;
      }
      console.log("Finished writing file");
    }
  );
}

getHeroes();

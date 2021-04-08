import puppeteer from "puppeteer";
import { link, linkSync, writeFile } from "fs";
import { resolve } from "path";
import Hero, { HeroInfos } from "../../models/hero";
import { v4 as uuid } from "uuid";
import { rejects } from "assert";

async function getHeroes() {
  const BASE_URL = "https://www.marvel.com";
  const CHARACTER_LIST_URL = BASE_URL + "/characters";
  const heroes: Hero[] = [];

  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

  console.log("Getting heroes from website", CHARACTER_LIST_URL);
  await page.goto(CHARACTER_LIST_URL, { timeout: 0 });

  await page.waitForSelector("body");

  // scrape the link to the heroes pages
  await page.waitForSelector('div[class="content-grid content-grid__6"] > div[class="grid-base grid__6 "]');
  const urlDatas: string[] = await page.evaluate(() => {
    const urls = document.querySelectorAll('div[class="content-grid content-grid__6"] > div[class="grid-base grid__6 "]');

    // collect the links from the a element href
    const links = [];
    for (let i = 0; i < urls[0].childNodes.length; i++) {
      const aNode = urls[0].childNodes[i].childNodes[0] as HTMLElement;
      links.push(aNode.getAttribute("href"));
    }

    return links;
  });

  await browser.close();

  // getting the Heroes data from the hero pages
  let heroPromise = [];
  const newBrowser = await puppeteer.launch({
    headless: true
  });

  process.setMaxListeners(Infinity);

  for (let i = 0; i < urlDatas.length; i++) {
    heroPromise.push(
      new Promise(async (resolve, rejects) => {
        const newPage = await newBrowser.newPage();

        console.log(`Scrapping hero data from ${urlDatas[i]}`);

        await newPage.goto(BASE_URL + urlDatas[i], { timeout: 0 });

        await newPage.waitForSelector("body");

        let hero: Hero;

        try {
          // get the hero data
          const heroCompiledData = await newPage.evaluate(() => {
            // get hero story
            const bioNode = document.querySelectorAll('div[class="content-block__body"]')[0] as HTMLElement;

            // get hero name
            const nameNode = document.querySelectorAll('div[class="masthead__container masthead__container_playing-false "]')[0]
              .childNodes[0] as HTMLElement;

            // get hero photo
            const photoNode = document.querySelectorAll(
              'div[class="masthead__background__wrapper"] > figure[class="img__wrapper masthead__background"]'
            )[0].childNodes[0] as HTMLElement;
            const photoUrl = photoNode.style.backgroundImage.split('"')[1];

            const getHeroesInfos = (): HeroInfos => {
              const heightNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[0]?.childNodes[0] as HTMLElement;
              const weightNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[0]?.childNodes[1] as HTMLElement;

              const eyesNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[1]?.childNodes[0] as HTMLElement;
              const hairNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[1]?.childNodes[1] as HTMLElement;

              return {
                height: heightNode?.innerText?.replace("HEIGHT", "").trim() ?? "None",
                weight: weightNode?.innerText?.replace("WEIGHT", "").trim() ?? "None",
                eyes: eyesNode?.innerText?.replace("EYES", "").trim() ?? "None",
                hair: hairNode?.innerText?.replace("HAIR", "").trim() ?? "None"
              };
            };

            return {
              photo: photoUrl,
              name: nameNode?.innerText.trim() ?? "Unamed",
              infos: getHeroesInfos(),
              bio: bioNode?.innerText?.replace("BIOGRAPHY", "").trim() ?? "None"
            };
          });

          // add a unique id to the compiled data
          hero = { id: uuid(), ...heroCompiledData };

          heroes.push(hero);

          resolve("Success");
        } catch (err) {
          rejects(err);
        }
      })
    );
  }

  await Promise.all(heroPromise);
  await newBrowser.close();

  // write the Hero data into a file
  writeFile(resolve(__dirname, "../heroes.json"), JSON.stringify(heroes, null, 2), (err) => {
    if (err) {
      throw err;
    }
    console.log("Finished writing file");
  });
}

getHeroes();

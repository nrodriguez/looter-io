// import { Page } from 'puppeteer';
// const puppeteer = require('puppeteer-extra'); //Till they fix puppeteer-extra typing issue
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
// import * as cheerio from 'cheerio';

// export async function login(page:Page, username:string, password:string): Promise<void>{
//   await page.type('#login_form_username_email', username);
//   await page.type('#login_form_password', password);
//   await page.click('#email-login-form > form > div.form__actions.br--none.p--t--0.jc--sb > button[data-et-name=login]');
//   await page.waitForNavigation();
//   const loggedInSelector = '#app > header > nav.header--fixed > div > ul > li.ps--r.header__account-info-list__item > div > div:nth-child(2) > div > ul > li:nth-child(1) > a';
//   await page.waitForSelector(loggedInSelector,  { timeout: 10000 });
// }

// export async function search(page: Page, query){
//   await page.type('#searchInput', query);
//   await page.click('#searchForm > div.search-box-con > button');
//   await page.waitForNavigation();
// }

// async function loggedInCheck(page){
//   try {
//       await page.waitForSelector('.dropdown__selector img.user-image', { timeout: 5000 });
//       return true;
//   } catch(err) {
//       console.log('NOT LOGGED IN');
//       return false;
//   }
// }
// export default async function scraper(marketplace: string): Promise<any>{
//   console.log('Marketplace is', marketplace);
//   let elements;
//   let $;
  
//   try{
//     puppeteer
//       .use(StealthPlugin())
//       .use(AdblockerPlugin({blockTrackers: true}));

//     const browser = await puppeteer.launch({
//       headless: false,
//       ignoreHTTPSErrors: true,
//       args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-infobars',
//         '--window-position=0,0',
//         '--ignore-certifcate-errors',
//         '--ignore-certifcate-errors-spki-list',
//         '--window-size=1920,1080',
//         '--enable-automation'
//       ],
//     });
//     console.log("BROWSER GOOD?");
//     const page = await browser.newPage();

//     let isLogged;
//     // Get cookies
//     const cookies = await page.cookies();
//     if (cookies) {
//       console.log('Trying to use cached cookies...');
//       await page.setCookie(...cookies);
//       isLogged = await loggedInCheck(page);
//    }

//    if (!isLogged) {
//     console.log(`Cookies from the cache didn't work. Try to log in.`);
//     //Go to the merchant's website
//     await page.goto('https://poshmark.com/');
//     console.log("PAGE GOOD");

//     await page.bringToFront();
//     await page.click('.header__login-signup a[data-et-name=intro_tap_login]');
//     await page.waitForNavigation();

//     //TODO: Change to `process.env.${merchant.toUpper()}_USERNAME
//     const username = process.env.POSHMARK_USERNAME;
//     const password = process.env.POSHMARK_PASSWORD;
    
//     // let isLogged = false;

//     //Login called for specific merchant
//     //Poshmark.login(page, username, password)
//     await login(page, username, password);
//     console.log('LOGGED IN');
//     await search(page, 'thanos');
    
//     const pageData = await page.evaluate(() => {
//       return {
//         html: document.documentElement.innerHTML
//       };
//     });

//     $ = cheerio.load(pageData.html);

//     elements = $('#content div.tile').toArray().map((item) => {
//       const itemDetails = $(item).find('.item__details');
//       const name = $(itemDetails).find('a.tile__title');
//       const imgSrc = $(item).find('.card img').data('src') || $(item).find('.card img').attr('src');
      
//       return {
//         url: `https://poshmark.com${$(name).attr('href')}`,
//         photoUrl: imgSrc,
//         name: $(name).text().trim(),
//         price: $(itemDetails).find('span.p--t--1').text().trim(),
//         originalPrice: $(itemDetails).find('span.p--l--1').text().trim(),
//         merchant: 'Poshmark'
//       };
//     });
//     console.log('ELEMENTS======>', elements[0]);
//     isLogged = await loggedInCheck(page);
//   }

    


   


//     // await browser.close();
//   } catch(e){
//     console.log('ERROR', e);
//   }

//   return {
//     elements
//   };
// }
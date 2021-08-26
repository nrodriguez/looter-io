import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export async function login(page, username, password){
  await page.$eval('#login_form_username_email', (el, username:string) => el.value = username, username);
  console.log("ADDED username");
  await page.screenshot({path: './screenshots/login_1.png'});
  // await page.waitForTimeout(2000);

  await page.$eval('#login_form_password', (el, password:string) => el.value = password, password);
  // await page.waitForTimeout(2000);
  console.log("ADD PASS");
  await page.screenshot({path: './screenshots/login_2.png'});
  
  await page.click('#email-login-form > form > div.form__actions.br--none.p--t--0.jc--sb > button[data-et-name=login]');
  console.log("CLICKED LOGIN");
  await page.screenshot({path: './screenshots/logged_in.png'});
}

export default async function scraper(marketplace: string): Promise<any>{
  console.log('Marketplace is', marketplace);
  
  try{
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    console.log("BROWSER GOOD?");
    const page = await browser.newPage();
    await page.goto('https://poshmark.com/');
    console.log("PAGE GOOD");
    await page.screenshot({path: './screenshots/homepage.png'});

    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML
      };
    });

    const $ = cheerio.load(pageData.html);

    await page.click('.header__login-signup a[data-et-name=intro_tap_login]');
    await page.waitForNavigation();
    await page.screenshot({path: './screenshots/login.png'});
    const username = process.env.POSHMARK_USERNAME;
    const password = process.env.POSHMARK_PASSWORD;
    
    await login(page, username, password);
    // await page.waitForNavigation();
    console.log('LOGIN AGAIn');
    await login(page, username, password);
    await login(page, username, password);
    await login(page, username, password);
    
    
    
    
    // await browser.close();
  } catch(e){
    console.log('ERROR', e);
  }
  return {hey: 'there'};
}
import puppeteer from 'puppeteer';
import credentials from '../../credentials.json';
import { links } from '../constants/links';
import { loginWithGoogle } from './loginWithGoogle';
import { selectors } from '../constants/selectors';

const LIKE_INTERVAL_MSEC = 1000;

const puppeteerConfig: puppeteer.LaunchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: false,
};

export const autoLike = async () => {
  try {
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    await page.goto(links.tinder, {
      waitUntil: 'domcontentloaded',
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(links.tinder, ['geolocation']);
    await page.setGeolocation({
      latitude: credentials.geoLocation.latitude,
      longitude: credentials.geoLocation.longitude,
    });
    await page.waitFor(1000);
    await loginWithGoogle(browser, page);
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.waitFor(1000);
    const acceptCookieButton = (await page.$x(selectors.xpath.acceptCookieButton))[0];
    await acceptCookieButton.click();
    const likeButton = await page.waitForSelector(selectors.likeButton);
    setInterval(() => likeButton.click(), LIKE_INTERVAL_MSEC);
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

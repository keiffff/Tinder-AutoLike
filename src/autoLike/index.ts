import puppeteer from 'puppeteer';
import credentials from '../../credentials.json';
import { links } from '../constants/links';
import { loginWithGoogle } from './loginWithGoogle';
import { selectors } from '../constants/selectors';

const MIN_LIKE_INTERVAL_SEC = 0.5;
const MAX_LIKE_INTERVAL_SEC = 5;

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
    const intervalLike = () => {
      const ramdomIntervalMsec =
        Math.floor(
          Math.random() * (MAX_LIKE_INTERVAL_SEC - MIN_LIKE_INTERVAL_SEC + 1) +
            MIN_LIKE_INTERVAL_SEC,
        ) * 1000;
      likeButton.click();
      setTimeout(intervalLike, ramdomIntervalMsec);
    };
    intervalLike();
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

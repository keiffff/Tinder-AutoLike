import puppeteer from 'puppeteer';
import credentials from '../../credentials.json';
import { selectors } from '../constants/selectors';

export const loginWithGoogle = async (browser: puppeteer.Browser, page: puppeteer.Page) => {
  try {
    const loginButton = (await page.$x(selectors.xpath.loginButton))[0];
    await loginButton.click();
    await page.waitFor(1000);
    const loginWithGoogleButton = (await page.$x(selectors.xpath.loginWithGoogleButton))[0];
    const [emailInputPage] = await Promise.all([
      browser.waitForTarget((t) => t.opener() === page.target()).then((t) => t.page()),
      loginWithGoogleButton.click(),
    ]);
    await emailInputPage.waitForSelector(selectors.inputEmail);
    await emailInputPage.type(selectors.inputEmail, credentials.email);
    const emailInputPageContinueButton = (
      await emailInputPage.$x(selectors.xpath.loginWithGoogleContinueButton)
    )[0];
    await Promise.all([
      emailInputPage.waitForNavigation({ waitUntil: 'networkidle0' }),
      emailInputPageContinueButton.click(),
    ]);
    await emailInputPage.waitForSelector(selectors.inputPassword);
    await emailInputPage.type(selectors.inputPassword, credentials.password);
    const passwordInputPageContinueButton = (
      await emailInputPage.$x(selectors.xpath.loginWithGoogleContinueButton)
    )[0];
    await Promise.all([
      emailInputPage.waitForNavigation({ waitUntil: 'networkidle0' }),
      passwordInputPageContinueButton.click(),
    ]);
    console.info('Login Succeeded!');
  } catch (e) {
    console.error(e);
  }
};

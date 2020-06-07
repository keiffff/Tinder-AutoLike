export const selectors = {
  inputEmail: 'input[type="email"]',
  inputPassword: 'input[type="password"]',
  likeButton: 'button[aria-label="いいね！"]',
  xpath: {
    loginButton: '//span[contains(text(), "ログイン")]',
    loginWithGoogleButton: '//span[contains(text(), "Googleでログインする")]',
    loginWithGoogleContinueButton: '//span[contains(text(), "次へ")]',
    acceptCookieButton: '//span[contains(text(), "はい")]',
  },
} as const;

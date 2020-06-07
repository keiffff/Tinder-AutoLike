# Tinder-AutoLike

puppeteerを使ってtinderのいいねを自動化

## セットアップ

```bash
$ yarn install
```

```bash
$ touch credentials.json
```

`credentials.json` に以下を記述します。

```json
{
  "email": your google account email,
  "password": your google account password,
  "geoLocation": {
    "latitude": your latitude,
    "longitude": your longitude
  }
}
```

geoLocationはブラウザの開発者ツールから以下で取得できます。
ブラウザから位置情報の取得を許可する必要があります。

```js
navigator.geolocation.getCurrentPosition(pos => console.log(pos));
```

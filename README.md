# imgur-anon

A version of [`imgur`](https://github.com/KenEucker/imgur) without the need to sign in

## Installation

```shell
npm install imgur-anon
```

## Quickstart

```js
import * as client from 'imgur-anon';
const response = client.upload({
  image: createReadStream('/home/kai/dank-meme.jpg'),
  type: 'stream',
});
// call client.XYZ as you would from the original repo - https://github.com/KenEucker/imgur
```

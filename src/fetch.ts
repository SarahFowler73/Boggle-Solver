const fetch = require('node-fetch');

export const fetchWord: any = (word: string) => fetch(
  `https://wordsapiv1.p.mashape.com/words/${word}`,
  {
    method: 'GET',
    // this is obviously super unsafe and should be handled with environment variables!
    // gh pages doesn't allow you to do that unfortunately!!!
    headers: {"X-RapidAPI-Key": "9cec01def3mshbab011fd8d8f4a4p12ebf8jsn00b43fb8e433"}
  },
);
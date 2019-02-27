import fetch from 'node-fetch';

export const fetchWord = (word: string) => fetch(
  `https://wordsapiv1.p.mashape.com/words/${word}`,
  {
    method: 'GET',
  },
).then(resp => {console.log(resp); return resp});
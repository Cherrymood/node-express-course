const { updateWith } = require("lodash");

let sum = 100;
let currency = uah;
let rate = 42;

function exRate(sum, rate, currency) {
  console.log(
    `Convert ${sum} ${currency} to US dollar. We will get ${sum / rate}`
  );
}

exRate(sum, rate, currency);

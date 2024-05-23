//helperFunctions.js

function generateRandomParams(count)  {
  let params = [];
  for (let i = 0; i < count; i++) {
    params.push(Math.random() * 10 - 5);
  }
  return params;
}

// console.log(generateRandomParams(768))

export { generateRandomParams };

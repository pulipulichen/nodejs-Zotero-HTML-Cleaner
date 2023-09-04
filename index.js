const getFolders = require('./getFolders.js')
const getFilenameAndURL = require('./getFilenameAndURL.js')
const ProcessItem = require('./ProcessItem.js')

const fs = require('fs')
const path = require('path')

const NodeCacheSqlite = require('./NodeCacheSqlite.js')

var MAX_CONCURRENCY_LIMIT = 5;
var IDLE_DELAY = 500;


let errors = []
let main = async function () {
  let expire = 1000 * 60 * 3
  // expire = 1000
  let output = await NodeCacheSqlite.get('items', 'all', async () => {
    let keys = getFolders()
    // console.log(output)


    let o = []
    o = await appendInfo(keys, o, errors)
    return o
  }, expire)
    
  // console.log(output.slice(0, 10))

  console.log(output)
  return false
  let max = output.length
  console.log('max', max)
  // max = 10
  let interval = 15
  for (let i = 0; i < max; i++) {
    // let queue = []
    // for (let j = 0; j < interval; j++) {
    //   queue = loop(output[i + j])
    // }

    // console.log(`= ${i} / ${max} ===============================`)
    // await Promise.all([
    //   loop(output[i + 0]),
    //   loop(output[i + 1]),
    //   loop(output[i + 2]),
    //   loop(output[i + 3]),
    //   loop(output[i + 4]),
    // ]);

    while (running > MAX_CONCURRENCY_LIMIT) {
      await sleep(getRandomNumber(1000, 10000))
    }

    await sleep(getRandomNumber(100, 1000))
    loop(output[i])
  }
  // await ProcessItem(output[0])

  writeError(errors)
}

let running = 0


function sleep(time = 500)
{
    return(new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(); }, time);
    }));
}

function getRandomNumber(min, max) {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();

  // Scale and shift the random number to fit the desired range
  const scaledNumber = randomNumber * (max - min + 1) + min;

  // Use Math.floor to ensure the result is an integer
  return Math.floor(scaledNumber);
}


let loop = async function (o) {

  while (running > MAX_CONCURRENCY_LIMIT) {
    await sleep(getRandomNumber(1000, 10000))
  }

  running++
  try {
    await ProcessItem(o)
    await sleep(getRandomNumber(1000, 3000))
  }
  catch (err) {
    errors.push(JSON.stringify(o) + ' ' +  err.message)
  }
  running--
}

let appendInfo = async function (keys, output) {
  
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let result = await getFilenameAndURL(key)
    if (!result) {
      errors.push(`Filename is not found: ${key}`)
      continue
    }
    let {filename, url} = result

    output.push({
      key,
      filename,
      url
    })
  }

  return output
}

let writeError = function (err) {
  if (err.length === 0) {
    return false
  }
  fs.writeFileSync('./errors.txt', err.join('\n'), { encoding: 'utf8' })
}


main()
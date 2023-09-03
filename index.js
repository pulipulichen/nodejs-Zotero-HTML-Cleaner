const getFolders = require('./getFolders.js')
const getFilenameAndURL = require('./getFilenameAndURL.js')
const ProcessItem = require('./ProcessItem.js')

const fs = require('fs')
const path = require('path')

let errors = []
let main = async function () {
  let keys = getFolders()
  // console.log(output)


  let output = []
  output = await appendInfo(keys, output, errors)

  // console.log(output.slice(0, 10))

  // console.log(output[0])
  for (let i = 0; i < output.length; i++) {
  // for (let i = 0; i < 3; i++) {
    let o = output[i]
    console.log(o.key)
    try {
      await ProcessItem(output[i])
    }
    catch (err) {
      errors.push(JSON.stringify(output[i]) + ' ' +  err.message)
    }
  }
  // await ProcessItem(output[0])

  writeError(errors)
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
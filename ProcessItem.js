const path = require('path');
const fs = require('fs');
const ShellSpawn = require('./ShellSpawn.js')

let basePath = `/mnt/microsd/ext4/zotero/storage/`

let processFiles = async function (item) {
  let {filename, url, key} = item

  let targetFilenameTemp = path.join('/mnt/microsd/ext4/trash/202309/zotero/', filename)
  
  
  // await ShellSpawn([path.join(__dirname, 'singlefile.sh'), url, targetFilenameTemp])
  let sourceDirectory = path.join(basePath, key)
  let destinationFilename = path.join(sourceDirectory, filename)
  await ShellSpawn([path.join(__dirname, 'singlefile.sh'), 'file://' + destinationFilename, targetFilenameTemp])

  // ----------------------------------------------------------------

  // 先建立暫存資料夾
  let destinationDirectory = path.join(sourceDirectory, `${key}_tmp`)

  // ----------------

  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
  }

  // ----------------

  let files = fs.readdirSync(sourceDirectory)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    const sourceFilePath = path.join(sourceDirectory, file);

    // Check if the item is a file (not a directory).
    if (fs.statSync(sourceFilePath).isFile()) {
      const destinationFilePath = path.join(destinationDirectory, file);

      // Move the file to the destination directory.
      fs.renameSync(sourceFilePath, destinationFilePath);
    }
  }

  // ----------------

  // await ShellSpawn(['mv', targetFilenameTemp])
  let targetFilename = path.join(sourceDirectory, filename)
  fs.renameSync(targetFilenameTemp, targetFilename)

  // ---------------
  // await trash(destinationDirectory)
  // await ShellSpawn(['trash', destinationDirectory])
  const destinationFileTrashPath = path.join('/mnt/microsd/ext4/trash/202309/zotero/', `${key}_tmp`);
  fs.renameSync(destinationDirectory, destinationFileTrashPath)
}

module.exports = processFiles
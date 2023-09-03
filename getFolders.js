const fs = require('fs');
const path = require('path');

const main = function () {
  const outputDirectory = '/mnt/microsd/ext4/NextCloudZotero/storage/'; // Change this to the path of your /output/ directory
  const folderNames = [];

  // Function to check if a directory contains an HTML file
  function containsHtmlFile(dir) {
    const files = fs.readdirSync(dir);
    return files.some(file => file.endsWith('.html'));
  }

  // Function to count the number of non-hidden files in a directory
  function countFilesInDir(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => (!file.startsWith('.') && file !== 'desktop.ini' )).length;
  }

  // Function to search each folder in /output/
  function searchFolders(directory) {
    const folders = fs.readdirSync(directory);

    for (const folder of folders) {
      const folderPath = path.join(directory, folder);
      const stats = fs.statSync(folderPath);

      if (stats.isDirectory()) {
        if (containsHtmlFile(folderPath) && countFilesInDir(folderPath) > 1) {
          folderNames.push(folder);
        }
      }
    }
  }

  // Start searching the /output/ directory
  searchFolders(outputDirectory);

  // console.log('Folders with HTML file and more than 1 non-hidden file:');
  // console.log(folderNames);

  return folderNames;
}

module.exports = main

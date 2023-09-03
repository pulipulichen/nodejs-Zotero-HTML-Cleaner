const sqlite3 = require('sqlite3').verbose();

let db
let main = async function (key) {
  if (!db) {
    db = new sqlite3.Database('/mnt/microsd/ext4/zotero/zotero.sqlite'); 
  }
    
  // Replace 'my_database.db' with your database file name or path

  return new Promise((resolve, reject) => {
    let sql = `select substr(path, 9) as filename, value as url from items left JOIN itemAttachments using (itemID) left JOIN itemData using(itemID) left JOIN itemDataValues using (valueID) where items.key = '${key}' and fieldID = 13`
    // console.log(sql)
    db.all(sql, 
      (err, rows) => {
      if (err) {
        // console.error(err.message);
        reject(err)
        return;
      }
    
      // Process the rows
      // rows.forEach((row) => {
      //   console.log(row.id, row.username, row.email);
      // });

      // console.log(rows)
      resolve(rows[0])
    });
  })
    
}

module.exports = main
# nodejs-Zotero-HTML-Cleaner

docker run singlefile "https://link.springer.com/referenceworkentry/10.1007/978-1-4614-7163-9_214-1" > 978-1-4614-7163-9_214-1.html

items
2JHWX8VU
key 
itemID: 6640 

itemData
fieldID: 1, 13, 14
valueID: 27644, 28475, 28476

13 url


itemAttachments
itemID -> path

select itemID from items where key = '2JHWX8VU'

select substr(path, 9), value from items left JOIN itemAttachments using (itemID) left JOIN itemData using(itemID) left JOIN itemDataValues using (valueID) where items.key = '2JHWX8VU' and fieldID = 13

// ----------

KYN47FY3
21047

storage:[FULLTEXT] Learning styles research.html
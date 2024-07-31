const express = require('express');
const client = require('redis').createClient();
const { promisify } = require('util');
const app = express();

const listProducts = [
  { Id: 1, name: 'Suitcase 250', price: 50, stock: 4 }, 
  { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
]

function getItemById(id) {
  for (const item of listProducts) {
    if (item.Id === parseInt(id))
      return { itemId: item.Id, itemName: item.name, price: item.price, initialAvailableQuantity: item.stock };
  }
  return null;
}

async function reserveStockById(itemId, stock) {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
}

app.get('/list_products', (req, res) => {
  const objs = [];
  for (const item of listProducts) {
    const obj = getItemById(item.Id);
    objs.push(obj);
  }
  res.send(objs);
});

app.get('/list_products/:itemId', (req, res) => {
  const item = getItemById(req.params.itemId);
  if (item === null)
   res.send({ "status": "Product not found" })
  else {
    getCurrentReservedStockById(item.itemId)
      .then((result) => parseInt(result || 0))
      .then((reservedStock) => {
        item.currentQuantity = item.initialAvailableQuantity - reservedStock;
        res.json(item);
      });
  }
});

app.get('/reserve_product/:itemId', (req, res) => {
  const item = getItemById(req.params.itemId);
  if (item === null) {
    res.send({ "status": "Product not found" });
  }
  else {
    getCurrentReservedStockById(item.itemId)
      .then((result) => parseInt(result || 0))
      .then((reservedStock) => {
        if (item.initialAvailableQuantity - reservedStock > 0 ) {
          reserveStockById(item.itemId, reservedStock + 1)
            .then(result => {
              res.send({"status": "Reservation confirmed", "itemId": item.itemId});
            });
        }
        else {
          res.send({"status": "Not enough stock available", "itemId": item.itemId});
    }});
  }
});

app.listen(1245);

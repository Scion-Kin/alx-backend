const listProducts = [
  { Id: 1, name: 'Suitcase 250', price: 50, stock: 4 }, 
  { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
]

function getItemById(id) {
  for (const i of listProducts) {
    if (i.Id == id)
      return i
  }
}



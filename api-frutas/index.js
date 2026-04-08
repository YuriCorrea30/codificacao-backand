import fs from "fs/promises";

// ler frutas
async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  const fruits = JSON.parse(data);
  return fruits;
}

// salvar frutas
async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

// listar todas
async function getAllFruits() {
  const fruits = await readFruits();
  return fruits;
}

// buscar por id
async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));
  return fruit;
}

// criar fruta
async function createFruit(nome) {
  const fruits = await readFruits();

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);

  await writeFruits(fruits);

  return newFruit;
}

// atualizar fruta
async function updateFruit(id, novoNome) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  fruits[index].nome = novoNome;

  await writeFruits(fruits);

  return fruits[index];
}

// deletar fruta
async function deleteFruit(id) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  fruits.splice(index, 1);

  await writeFruits(fruits);

  return true;
}


// TESTES

const allFruits = await getAllFruits();
console.log("Todas as frutas:");
console.log(allFruits);

const fruit = await getFruitById(1);
console.log("Buscar fruta:");
console.log(fruit);

const newFruit = await createFruit("Abacaxi");
console.log("Fruta criada:");
console.log(newFruit);

const updatedFruit = await updateFruit(2, "Banana Prata");
console.log("Fruta atualizada:");
console.log(updatedFruit);

const removed = await deleteFruit(3);
console.log("Fruta removida?", removed);

const finalList = await getAllFruits();
console.log("Lista final:");
console.log(finalList);
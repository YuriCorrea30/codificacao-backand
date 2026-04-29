const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/jogos.json");

// ler arquivo
function readData() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
      return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");

    if (!data) return [];

    return JSON.parse(data);

  } catch (error) {
    console.error("Erro ao ler arquivo:", error.message);
    return [];
  }
}

// escrever arquivo
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao escrever arquivo:", error.message);
  }
}

module.exports = {
  readData,
  writeData
};
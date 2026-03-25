const filmes = [
    { id: 1, nome: " Em busca do vale encantado"},
    { id: 2, nome: "Jurasic Park"},
    { id: 3, nome: "Acamapmento jurassico"},
];

function getAll() {
    return filmes;
}

function getById(id) {
    return filmes.find(filme => filme.id == id)
}

module.exports = {
    getAll,
    getById
};
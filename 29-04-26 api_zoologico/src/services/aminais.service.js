export const getAll = (readData) => {
  return readData();
};

export const getById = (id, readData) => {
  const animais = readData();
  return animais.find(a => a.id === id);
};

export const create = (body, readData, writeData) => {
  const { nome, especie } = body;

  if (!nome || !especie) {
    throw new Error("Nome e espécie são obrigatórios");
  }

  const animais = readData();

  const novo = {
    id: animais.length ? animais[animais.length - 1].id + 1 : 1,
    nome,
    especie
  };

  animais.push(novo);
  writeData(animais);

  return novo;
};

export const updatePut = (id, body, readData, writeData) => {
  const { nome, especie } = body;

  if (!nome || !especie) {
    throw new Error("Nome e espécie são obrigatórios");
  }

  const animais = readData();
  const index = animais.findIndex(a => a.id === id);

  if (index === -1) return null;

  const atualizado = { id, nome, especie };

  animais[index] = atualizado;
  writeData(animais);

  return atualizado;
};

export const updatePatch = (id, body, readData, writeData) => {
  const animais = readData();
  const index = animais.findIndex(a => a.id === id);

  if (index === -1) return null;

  animais[index] = {
    ...animais[index],
    ...body
  };

  writeData(animais);

  return animais[index];
};

export const remove = (id, readData, writeData) => {
  const animais = readData();
  const novos = animais.filter(a => a.id !== id);

  if (animais.length === novos.length) return false;

  writeData(novos);
  return true;
};
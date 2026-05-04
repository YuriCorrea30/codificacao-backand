class AnimaisService {

  async getAll(readData) {
    return await readData();
  }

  async getById(id, readData) {
    const animais = await readData();
    return animais.find(a => a.id === id);
  }

  async create(body, readData, writeData) {
    const { nome, especie } = body;

    if (!nome || !especie) {
      throw new Error("Nome e espécie são obrigatórios");
    }

    const animais = await readData();

    const novo = {
      id: animais.length ? animais[animais.length - 1].id + 1 : 1,
      nome,
      especie
    };

    animais.push(novo);
    await writeData(animais);

    return novo;
  }

  async updatePut(id, body, readData, writeData) {
    const { nome, especie } = body;

    if (!nome || !especie) {
      throw new Error("Nome e espécie são obrigatórios");
    }

    const animais = await readData();
    const index = animais.findIndex(a => a.id === id);

    if (index === -1) return null;

    const atualizado = { id, nome, especie };

    animais[index] = atualizado;
    await writeData(animais);

    return atualizado;
  }

  async updatePatch(id, body, readData, writeData) {
    const animais = await readData();
    const index = animais.findIndex(a => a.id === id);

    if (index === -1) return null;

    animais[index] = {
      ...animais[index],
      ...body
    };

    await writeData(animais);

    return animais[index];
  }

  async remove(id, readData, writeData) {
    const animais = await readData();
    const novos = animais.filter(a => a.id !== id);

    if (animais.length === novos.length) return false;

    await writeData(novos);
    return true;
  }
}

export const animaisService = new AnimaisService();
let pacientes = [
    { id: 1, nome: "Yuri", idade: 30},
    { id: 2, nome: "Yan", idade: 24},
];

export const getAll = () => pacientes;

export const getById = (id) => pacientes.find(pacientes => pacientes.id === id);

export const create = (paciente) => {
    pacientes.push(paciente);
    return paciente;
};

export const update = (id, dados) => {
    const paciente = pacientes.find(pacientes => pacientes.id === id);
    if (paciente) {
        Object.assign(paciente, dados);
    }
    return paciente;
};

export const remove = (id) => {
    pacientes = pacientes.filter(p => p.id !== id);
};
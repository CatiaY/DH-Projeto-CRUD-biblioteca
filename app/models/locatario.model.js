module.exports = (sequelize, Sequelize) => {
    const Locatario = sequelize.define ("tb_locatarios", {
        nome: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    return Locatario;
}
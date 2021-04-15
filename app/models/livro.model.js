module.exports = (sequelize, Sequelize) => {
    const Livro = sequelize.define ("tb_livros", {
        nome: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        sinopse: {
            type: Sequelize.STRING
        },
        dataLancamento: {
            type: Sequelize.DATEONLY
        },
        dataAluguel: {
            type: Sequelize.DATEONLY
        },
        disponivel: {
            type: Sequelize.BOOLEAN
        }
    });

    return Livro;
}

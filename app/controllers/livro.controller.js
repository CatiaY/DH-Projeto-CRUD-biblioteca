const db = require ("../models");

Livro = db.livro;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.nome || !req.body.autor || !req.body.dataLancamento || !req.body.dataAluguel) {
        res.status(400).send({
            message: "Preencha todas as informações solicitadas."
        });

        return;
    }    
   
    const livro = {
        nome: req.body.nome,
        autor: req.body.autor,
        sinopse: req.body.sinopse,
        dataLancamento: req.body.dataLancamento,
        dataAluguel: req.body.dataAluguel,
        disponivel: req.body.disponivel ? req.body.disponivel : false
    }
    
    Livro.create(livro)    
    .then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({            
            message: err.message || "Erro interno ao cadastrar o livro."
        });
    })
};


exports.findAll = (req, res) => {  
    
    const autor = req.query.autor;
    
    let condition = autor ? { autor: {[Op.like]: `%${autor}%`}} : null;
    // let condition = autor ? { autor: autor } : null;    

    Livro.findAll({ where: condition })    
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erro interno ao buscar os livros."
        });
    })
};


exports.updateStatus = (req, res) => {
    const id = req.params.id;
    const status = req.body.disponivel;
    
    if(!req.body.disponivel) {
        res.status(400).send({
            message: "Informe o status para o qual gostaria de alterar."
        });

        return;
    }    
   

    Livro.update(req.body, {
        where: { id : id }
    })    
    .then (num => {
        if (num == 1) {
            res.send ({
                message: "Livro atualizado com sucesso! =D"
            });
        }
        else {
            res.send({
                message: `Não foi possível atualizar o livro de id #${id}, livro não encontrado ou body vazio.`
            });
        }
    })
    .catch (err => {
        res.status(500).send ({
            message: err.message || `Erro interno ao atualizar o livro de id ${id}.`
        })
    });
}
const db = require ("../models");

Locatario = db.locatario;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    
    if(!req.body.nome || !req.body.cpf) {        
        res.status(400).send({
            message: "Preencher nome e cpf."
        });
        return;
    }
    
    
    const locatario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        status: req.body.status ? req.body.status : false
    }

    
    Locatario.create(locatario)    
    .then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({            
            message: err.message || "Erro interno ao criar o locatário."
        });
    })
};


exports.findAll = (req, res) => {    
    Locatario.findAll()
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erro interno ao buscar os dados."
        });
    })
};


exports.findAllAtivos = (req, res) => {
    Locatario.findAll({where: { status: true }})
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erro interno ao buscar os dados."
        });
    })
};


exports.delete = (req, res) => {
    const id = req.params.id;
    
    Locatario.destroy({
        where: { id : id }
    })
    .then (num => {
        if (num == 1) {
            res.send ({
                message: "Locatário excluído com sucesso! =D"
            });
        }
        else {
            res.send({
                message: `Não foi possível excluir o locatário de id #${id}, locatário não encontrado ou id não enviado.`
            });
        }
    })
    .catch (err => {
        res.status(500).send ({
            message: err.message || `Erro interno ao excluir o locatário de id ${id}.`
        })
    });
}


exports.deleteAll = (req, res) => {    
    Locatario.destroy({ 
        where: {}, 
        truncate: false })
    .then(nums => {
        res.send({ message: `${nums} locatários deletados com sucesso!`});
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Erro ao deletar todos os locatários."
        });
    });
}
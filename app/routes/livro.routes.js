const { livro } = require("../models");

module.exports = app => {
    const livros = require ("../controllers/livro.controller");
    
    let router = require ("express").Router();

    router.post("/", livros.create);
    router.get("/", livros.findAll);
    // router.get("/autor", tutorials.findbyAutor);
    router.put("/:id", livros.updateStatus);

    app.use('/api/livros', router);
}
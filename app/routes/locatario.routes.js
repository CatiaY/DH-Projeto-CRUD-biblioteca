const { locatario } = require("../models");

module.exports = app => {
    const locatarios = require ("../controllers/locatario.controller");
    let router = require ("express").Router();

    router.post("/", locatarios.create);    
    router.get("/", locatarios.findAll);    
    router.get("/ativos", locatarios.findAllAtivos);
    router.delete("/:id", locatarios.delete);
    router.delete("/", locatarios.deleteAll);

    app.use('/api/locatarios', router);
}
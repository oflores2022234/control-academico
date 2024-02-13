const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    cursosPost} = require('../controllers/curso.controller');


const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("descripcion", "La descripcion no puede estar vacia").not().isEmpty(),
        check("modalidad", "La modalidad no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], cursosPost);


    module.exports = router;


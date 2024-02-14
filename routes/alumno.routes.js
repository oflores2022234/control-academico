const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    alumnosPost,
    alumnosGet} = require('../controllers/alumno.controller');

const { existeEmailA, esRoleValido, existeAlumnoId} = require('../helpers/db-validators');
 
const router = Router();

router.get("/", alumnosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeEmailA),
        check('role').custom(esRoleValido),
        validarCampos,
    ], alumnosPost);

    module.exports = router;
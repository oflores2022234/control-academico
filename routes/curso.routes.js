const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    cursosPost,
    cursosGet,
    getCursoById,
    putCursos,
    cursosDelete} = require('../controllers/curso.controller');
const { existeCursoById } = require('../helpers/db-validators');


const router = Router();

router.get("/", cursosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("descripcion", "La descripcion no puede estar vacia").not().isEmpty(),
        check("modalidad", "La modalidad no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], cursosPost);
router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById);
router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),

        validarCampos
    ], putCursos);
router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], cursosDelete);


    module.exports = router;


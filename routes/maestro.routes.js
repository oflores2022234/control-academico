const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    maestrosPost,
    maestrosGet,
    putMaestros} = require('../controllers/maestro.controller');


const { existenteEmail, esRoleValido, existeMeatroById, } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');

const { existeCursoById, existeAsignacionMaestroCurso  } = require('../helpers/db-validators');

const router = Router();

router.get("/", maestrosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("telefono", "el telefono debe ser mayor o igual de 8 digitos").isLength({min:8}),
        validarCampos,
    ], maestrosPost);

    router.put(
        "/:id",
        [
            check('id', 'No es un id válido').isMongoId(),
            check("curso", "No puedes impartir más de 3 cursos").isArray({max: 3}),
            check('curso.*').custom(async (cursoId, { req }) => {
                const maestroId = req.params.id;
                /* Verificamos ssi el alumno ya esta asignado a los cursos */
                if (await existeAsignacionMaestroCurso(maestroId, cursoId)) {
                    throw new Error('El maestro ya está impartiendo el curso proporcionado');
                }
                return true;
            }),
            validarCampos,
            
        ],
        putMaestros
    );



    module.exports = router;
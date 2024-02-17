const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    alumnosPost,
    alumnosGet,
    putAlumnos} = require('../controllers/alumno.controller');

const { existeEmailA, esRoleValido, existeAlumnoId} = require('../helpers/db-validators');
const { existeCursoById, existeAsignacionAlumnoCurso  } = require('../helpers/db-validators');
 
const router = Router();

router.get("/", alumnosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeEmailA),
        validarCampos,
    ], alumnosPost);

    router.put(
        "/:id",
        [
            check('id', 'No es un id válido').isMongoId(),
            check("curso", "No puedes asignarte a más de 3 cursos").isArray({max: 3}),
            check('curso.*').custom(async (cursoId, { req }) => {
                const alumnoId = req.params.id;
                /* Verificamos ssi el alumno ya esta asignado a los cursos */
                if (await existeAsignacionAlumnoCurso(alumnoId, cursoId)) {
                    throw new Error('El alumno ya está asignado al curso proporcionado');
                }
                return true;
            }),
            validarCampos,
            
        ],
        putAlumnos
    );

    module.exports = router;
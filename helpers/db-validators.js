
const Role = require('../models/role');
const Maestro = require('../models/maestro');
const Curso = require('../models/curso');
const Alumno = require('../models/alumno');

/*Validaciones para ROL */

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

/*VALIDACIONES MAESTRO */

const existenteEmail = async (correo = '') => {
    const existeEmail = await Maestro.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeMeatroById = async (id = '') => {
    const existeMaestro = await Maestro.findOne({id});
    if(existeMaestro){
        throw new Error(`El id ${id} no pertenede a un usuario`);
    }
}

const existeAsignacionMaestroCurso = async (maestroId, cursoId) => {
    const asignacion = await Maestro.findOne({ _id: maestroId, curso: cursoId });
    return asignacion !== null;
};

/*VALIDACIONES PARA ALUMNO */

const existeEmailA = async (correo = '') => {
    const existeEmailA = await Alumno.findOne({correo});
    if(existeEmailA){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeAlumnoId = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El id ${id} no pertenede a un alumno`);
    }

}

const existeAsignacionAlumnoCurso = async (alumnoId, cursoId) => {
    const asignacion = await Alumno.findOne({ _id: alumnoId, curso: cursoId });
    return asignacion !== null;
};



/*VALIDACIONES PARA CURSOS */

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`el id ${id} no pertenece a un curso`)
    }
}



module.exports = {
    esRoleValido,
    existenteEmail,
    existeMeatroById,
    existeCursoById,
    existeEmailA,
    existeAlumnoId,
    existeAsignacionAlumnoCurso,
    existeAsignacionMaestroCurso
}
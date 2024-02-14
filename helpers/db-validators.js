
const Role = require('../models/role');
const Maestro = require('../models/maestro');
const Curso = require('../models/curso');

/*Validaciones para rol */

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

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
    existeCursoById
}
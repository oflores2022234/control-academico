const Curso = require('../models/curso');

/*VALIDACIONES PARA CURSOS */

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`el id ${id} no pertenece a un curso`)
    }
}

module.exports = {
    existeCursoById
}
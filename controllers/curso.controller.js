const Curso = require('../models/curso');
const { response, request } = require('express');

const cursosPost = async (req, res) => {
    const {nombre, descripcion, modalidad} = req.body;
    const curso = new Curso({nombre, descripcion, modalidad});

    await curso.save();
    res.status(202).json({
        curso
    });

}


module.exports = {
    cursosPost
}
const { request, response } = require('express');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const bycryptjs = require('bycryptjs');

const login = async (req = request, res = respose) => {
    const { correo, password } = req.body;

    try {
        const maestro = await Maestro.findOne({correo});

        if(!maestro){
            return res.status(400).json({
                msg: "Credencias incorrectas, correo no existe en la base de datos."
            });
        }

        if(!maestro.estado){
            return res.status(400).json({
                msg: " El usuario no existe en la base de datos."
            });
         };

         const validarPassword = bycryptjs.compareSync(password, maestro.password);
         if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
         }

        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}

module.exports = {
    login
}
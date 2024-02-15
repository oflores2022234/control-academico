const jwt = require('jsonwebtoken');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const { request, response } = require('express');

const validarJWT = async(req = request, res =  response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion';
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        let user = await Maestro.findOne({ uid });

        if (!user) {
            user = await Alumno.findOne({ uid });
            if (!user) {
              return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
              });
            }
          }
      

        if(!user.estado){
            return res.status(400).json({
                msg: "token no válido, usuario con estado false"
            });
        }

        req.user = user;
        next();
        
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }

}

module.exports = {
    validarJWT
}
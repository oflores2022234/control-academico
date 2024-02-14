const { request, response } = require('express');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const bcryptjs = require('bcryptjs');

const login = async (req = request, res = respose) => {
    const { correo, password } = req.body;

    try {

        let user = await Maestro.findOne({ correo });

        if (!user) {
            user = await Alumno.findOne({ correo });
            if (!user) {
              console.log('Usuario no encontrado en ninguna colección');
              return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
              });
            }
          }
      
          console.log('Usuario encontrado:', user);

        if(!user.estado){
            return res.status(400).json({
                msg: "El Usuario no existe en la Base de datos"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
         if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
         }

        /*
        const maestro = await Maestro.findOne({correo});
        const alumno = await Alumno.findOne({correo});


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

         const validarPasswordM = bycryptjs.compareSync(password, maestro.password);
         if(!validarPasswordM){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
         }*/

         /*---------------------------------------------- */
         /*
         if(!alumno){
            return res.status(400).json({
                msg: "Credenciales Incorrectas, correo no existe en la base de datos"
            });
         }

         if(!alumno.estado){
            return res.status(400).json({
                msg: " El usuario no existe en la base de datos"
            });
         }

         const validarPasswordA = bycryptjs.compareSync(password, alumno.password);
         if(!validarPasswordA){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
         }*/



         res.status(200).json({
            msg: "Bienvenido"
         });

        
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
/*
nombre
correo
usuario
telefono
password
cursosImpartir
rol
Estado
*/

const {Schema, model} = require('mongoose');

const MaestroSchema = Schema({

    nombre:{
        type: String,
        require: [true, "El nombre es obligatrio"]
    },
    correo:{
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true
    },
    usuario:{
        type: String,
        require: [true, "El usuario es obligatorio"],
        unique: true
    },
    telefono:{
        type: String,
        require: [true, "El telefono es obligatorio"]
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    cursos:[{
        nombre: String
    }],
    role:{
        type: String,
        require: auto,
        enum: ["TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }

});
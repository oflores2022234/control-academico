const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({

    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    telefono:{
        type: String,
        require: [true, 'El telefono es obligatorio']
    },
    curso:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
    
});

module.exports = model('Maestro', MaestroSchema);
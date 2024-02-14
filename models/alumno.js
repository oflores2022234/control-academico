const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({

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
    curso:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        require: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }

});

module.exports = model('Alumno', AlumnoSchema);
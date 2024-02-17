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
        type: String,
        default: "none"
    },
    role:{
        type: String,
        default: "TEACHER_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
    
});

MaestroSchema.methods.toJson = function(){
    const{ __v, password, _id, ...maestro} = this.toObject();
    maestro.uid = _id;
    return maestro;
}

module.exports = model('Maestro', MaestroSchema);
import * as mongoose from 'mongoose';

export const FerreteriaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        unique:true,
        required:true
    },
    precio:{
        type:Number,
        required:false
    },
    proveedor:{
        type: String,
        require: false
    },
    descripcion: {
        type: String,
        required:false
    }
}, {
    timestamps: true // para data create and update datetime
});


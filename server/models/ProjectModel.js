// 1 ODM - Mongoose
import mongoose from 'mongoose';
import { number } from 'yup';

// 2 Desestructuracion del modulo de esquemas (Schemas) de Mongoose
const { Schema } = mongoose;

// 3 crear un Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tel: {
    type: number,
    required: true,
  },
});

// Generar el modelo a partir de un Schema
//  Compilar el modelo
export default mongoose.model('project', ProjectSchema);

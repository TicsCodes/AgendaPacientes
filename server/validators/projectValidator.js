import * as Yup from 'yup';

// 2 Crear el esquema de validación
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre del Paciente'),

  ocupation: Yup.string()
    .max(500, 'La descripción esta limitada a 500 caracteres')
    .required('Se requiere ocupacion del paciente'),

  date: Yup.string().required('Asignar fecha de la cita'),

  hour: Yup.string().required('Se debe asignar la hora de la cita'),

  tel: Yup.number()
    .max(15, 'Minimo 10 caracteres')
    .required('Se requiere telefono de contacto'),

  mail: Yup.string()
    .max(50, 'Correo valido limitado a 50 caracteres')
    .min(15, 'Correo valido 15 caracteres minimo')
    .required('Se requiere correo electronico'),
});

// 3 Creamos el middleware de validacion
const getProject = (req) => {
  // Extraemos la info del formualrio
  const { name, ocupation, date, hour, tel, mail } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    name,
    ocupation,
    date,
    hour,
    tel,
    mail,
  };
};

export default { projectSchema, getProject };

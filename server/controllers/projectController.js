import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Actions Methods */
// Lista los proyectos
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1 Pedirle a la base de datos
  // que me de todos lo proyectos que tiene
  // db.projects.find()
  try {
    log.info('🧙‍♂️🧙‍♂️ Listando Agenda de Pacientes ... 🧙‍♂️🧙‍♂️');
    const projectsDocs = await ProjectModel.find();
    log.info('🐉🐉 Pacientes listados con exito ... 🐉🐉');
    res.json(projectsDocs);
  } catch (error) {
    log.error(`🧟‍♂️🧟‍♂️ Error al listar pacientes: ${error.message}🧟‍♂️🧟‍♂️`);
    res.status(500).json(error);
  }
};

// Agrega ideas de proyectos
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODo: Agregar codigo para agregar proyectos
};

// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
const addPost = async (req, res) => {
  // Desestructurando la informacion
  // del formulario o de un posible error
  const { errorData, validData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};
  // Verifico si hay error de validacion
  if (errorData) {
    log.error('🐲🐲 Validacion de paciente incorrecta 🐲🐲');
    // Rescantado los datos del formulario
    project = errorData.value;
    // Usamos reduce para generar un objeto
    // de errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una vaiabre temporal para evitar
      // el error "no-param-reassign" el cual me
      // exorta a evitar reasignar los valores de
      // los argumentos una funcion
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
    // La validacion fallo
    return res.render('projects/addProjectView', { project, errorModel });
  }
  log.info('👻👻 Registro de Paciente valido 👻👻');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en projectModel
  const projectModel = new ProjectModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    log.info('Salvando Agenda...⌛⌛');
    // Se salva el documento projecto
    project = await projectModel.save();
    log.info('🐉🐉 Agenda registrada con exito 🐉🐉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`☠️☠️ No se ha registrado al paciente :${error.message} ☠️☠️`);
    return res.status(500).json({ error });
  }
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};

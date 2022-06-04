// Usando el patron Factory para la creacion
// de un middleware de validacion

const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // construir un objeto a validar
    const dataObject = getObject(req);
    // Se realiza el proceso de validacion
    try {
      // se valida el objeto con el shape
      // validate acepta 2 argumentos
      // arg1 el objeto a validar
      // arg2 opciones de validacion
      const validData = await shape.validate(dataObject, {
        abortEarly: false,
      });
      // Incrustar el objeto valido en la peticion
      req.validData = validData;
    } catch (error) {
      // Crear un objeto que reporta el error
      req.errorData = error;
    }
    // Continuamos la cadena de middlewares
    return next();
  };

// Exportando Factory de validacion
export default Validator;

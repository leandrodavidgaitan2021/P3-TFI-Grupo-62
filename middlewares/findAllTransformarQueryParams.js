export const findAllTransformarQueryParams = (req, res, next) => {
  //Si no están definidos limit y offset no hago paginación
  req.query.limit = req.query.limit ? Number(req.query.limit) : 0;
  req.query.offset = req.query.offset ? Number(req.query.offset) : 0;

  //obtengo los filtros para cada campo. Si no están no los inclucyo en el objeto
  const filterObj = {};
  const orderObj = {};

  const { nombres, apellido, order } = req.query;

  if (nombres) filterObj.nombres = nombres;
  if (apellido) filterObj.apellido = apellido;
  if (order) orderObj[order] = req.query.asc === "true" ? "ASC" : "DESC";

  req.query.filter = filterObj;
  req.query.order = orderObj;

  next();
};

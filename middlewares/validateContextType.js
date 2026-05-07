//Valida que el Context-Type se application/json

const validateContextType = (req, res, next) => {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(415).send("Content-Type debe ser application/json");
  }
  next();
};

export default validateContextType;

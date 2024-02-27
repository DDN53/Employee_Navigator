const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Something went wrong!";
  let data = null; // Declare data variable

  if (err instanceof Custom401Error) {
    statusCode = 401;
    message = "Unauthorized";
  } else if (err instanceof Custom201Error) {
    statusCode = 201;
    message = "Created";
    data = err.data;
  } else if (err instanceof Custom400Error) {
    statusCode = 400;
    message = "Bad Request";
  }

  res.status(statusCode).json({ message, data });
};

class Custom401Error extends Error {}
class Custom201Error extends Error {
  constructor(data) {
    super();
    this.data = data;
  }
}
class Custom400Error extends Error {}

module.exports = {
  errorHandlingMiddleware,
  Custom401Error,
  Custom201Error,
  Custom400Error,
};

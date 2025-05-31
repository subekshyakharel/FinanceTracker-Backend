export const errorHandler = (error, req, res, next) => {
  //set default statuscode & message
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

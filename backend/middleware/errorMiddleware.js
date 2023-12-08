const routeNotFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Prevents 200 status code from being sent when there's an error.
  let message = err.message;

  // Handle mongoose's CastError for invalid MongoDB ObjectID.
  if (err.name === 'CastError' && err.kind === 'ObjectID') {
    statusCode = 400;
    message = 'Invalid ID. Resource not found.';
  }

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Only show stack trace in development mode.
  });
}

export { routeNotFound, errorHandler };
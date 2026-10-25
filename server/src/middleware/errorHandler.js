const errorHandler = (err, req, res, next) => {
  console.error('[API Error]', err.stack || err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `An entry with this ${field} already exists.`
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Resource not found with id: ${err.value}`
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Internal Error'
  });
};

module.exports = errorHandler;

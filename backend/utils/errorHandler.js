export const handleControllerError = (error, res, defaultMessage = "Server error") => {
  
  const statusCode = error.response?.status || 500;
  const errorMessage = error.message || defaultMessage;
  
  res.status(statusCode).json({
    error: errorMessage,
  });
};
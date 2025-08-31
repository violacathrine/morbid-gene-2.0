export const handleControllerError = (error, res, defaultMessage = "Server error") => {
  console.error(`❌ ${defaultMessage}:`, error);
  
  const statusCode = error.response?.status || 500;
  const errorMessage = error.message || defaultMessage;
  
  res.status(statusCode).json({
    error: errorMessage,
  });
};
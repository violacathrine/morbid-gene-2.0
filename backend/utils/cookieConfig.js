export const getCookieConfig = (isProduction = process.env.NODE_ENV === 'production') => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});

export const getClearCookieConfig = (isProduction = process.env.NODE_ENV === 'production') => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict'
});
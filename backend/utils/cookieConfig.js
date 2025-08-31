export const getCookieConfig = (isProduction = process.env.NODE_ENV === 'production') => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/',
  // Partitioned attribute for CHIPS (Cookies Having Independent Partitioned State)
  // Helps with Safari's ITP and third-party cookie restrictions
  ...(isProduction && { partitioned: true })
});

export const getClearCookieConfig = (isProduction = process.env.NODE_ENV === 'production') => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict',
  path: '/'
});
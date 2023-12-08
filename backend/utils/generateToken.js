import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  // Create JWT token.
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '120d', // Expires in 120 days
  });

  // Set cookie.
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict', // Cookie can only be sent in a first-party context and not be sent along with requests initiated by third party websites.
    secure: process.env.NODE_ENV === 'production', // Allow cookie to be used for https only in production.
    maxAge: 1000 * 60 * 60 * 24 * 120, // Expires 120 days
  });
}

export default generateToken;
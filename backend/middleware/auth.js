// middleware/auth.js
export function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    req.session = { user: null };
    return next();
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session = { user: data };
    console.log('Usuario autenticado:', req.session.user);
  } catch (error) {
    req.session = { user: null };
  }

  next();
}

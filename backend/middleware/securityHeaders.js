// middleware/securityHeaders.js

export const securityHeadersMiddleware = (req, res, next) => {
  // 🔒 Remover headers peligrosos INMEDIATAMENTE
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  res.removeHeader('Access-Control-Allow-Headers');
  res.removeHeader('Access-Control-Allow-Methods');
  
  // 🔒 Aplicar headers de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; form-action 'self';"
  );
  
  next();
};
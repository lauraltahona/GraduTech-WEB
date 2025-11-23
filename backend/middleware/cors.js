import cors from 'cors';

// 🔒 Lista blanca de dominios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  // En producción, añade tus dominios:
  // 'https://tudominio.com',
  // 'https://www.tudominio.com'
];

// 🔒 Configuración restrictiva de CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requests sin origin (como desde el mismo servidor)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido para este origen'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length'],
  maxAge: 600, // Pre-flight cache por 10 minutos
  optionsSuccessStatus: 200 // Para navegadores antiguos
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
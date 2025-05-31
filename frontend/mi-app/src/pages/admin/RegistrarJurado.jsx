import React, { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  GraduationCap,
  BadgeIcon as IdCard,
  Eye,
  EyeOff,
  Award,
} from "lucide-react";
import "../../styles/admin/registrarDocente.css";
import "../../shared/shared.css";

const careers = [
  "Ingeniería de Sistemas",
  "Ingeniería Ambiental",
  "Administración de Empresas",
  "Contaduría Pública",
  "Derecho",
  "Psicología",
  "Sociología"
];

const RegistrarJurado = () => {
  const [form, setForm] = useState({
    idJurado: "",
    carrera: "",
    usuario: {
      nombre: "",
      correo: "",
      contraseña: "",
    },
  });

  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["nombre", "correo", "contraseña"].includes(name)) {
      setForm({ ...form, usuario: { ...form.usuario, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/jurado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ ${data.message || "Jurado registrado correctamente"}`);
      } else {
        setMensaje(`❌ Error: ${data.error || "No se pudo registrar el jurado"}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="register-teacher-container">
      <div className="page-header">
        <div className="header-content-teacher">
          <div className="header-icon">
            <GraduationCap />
          </div>
          <div className="header-text-teacher">
            <h1 className="page-title">Registrar Jurado</h1>
            <p className="page-subtitle">
              Completa la información para crear una nueva cuenta de jurado
            </p>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-header">
          <div className="form-header-icon">
            <Award />
          </div>
          <div className="form-header-text">
            <h2 className="form-title">Información del Jurado</h2>
            <p className="form-subtitle">Todos los campos son obligatorios</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-grid-teacher">
            <div className="form-group">
              <label htmlFor="idJurado" className="form-label-teacher">
                <IdCard size={16} />
                ID Jurado
              </label>
              <input
                id="idJurado"
                name="idJurado"
                type="text"
                placeholder="Ej. JUR2024001"
                value={form.idJurado}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="carrera" className="form-label-teacher">
                <GraduationCap size={16} />
                Carrera
              </label>
              <select
                id="carrera"
                name="carrera"
                value={form.carrera}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecciona una carrera</option>
                {careers.map((career) => (
                  <option key={career} value={career}>
                    {career}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nombre" className="form-label-teacher">
                <User size={16} />
                Nombre Completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre y apellidos"
                value={form.usuario.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo" className="form-label-teacher">
                <Mail size={16} />
                Correo Electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="usuario@unicesar.edu.co"
                value={form.usuario.correo}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña" className="form-label-teacher">
                <Lock size={16} />
                Contraseña
              </label>
              <div className="password-input-container">
                <input
                  id="contraseña"
                  name="contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={form.usuario.contraseña}
                  onChange={handleChange}
                  className="form-input password-input"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions-teacher">
            <button type="submit" className="submit-button-teacher">
              <UserPlus size={20} />
              <span>Registrar Jurado</span>
            </button>
          </div>
        </form>

        {mensaje && <p className="form-message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default RegistrarJurado;

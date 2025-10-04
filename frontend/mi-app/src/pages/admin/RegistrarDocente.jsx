import React, { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  GraduationCap,
  Briefcase,
  BadgeIcon as IdCard,
  Eye,
  EyeOff,
  Award,
} from "lucide-react";
import "../../styles/admin/registrarDocente.css";
import "../../shared/shared.css";

const careers = [
  "Ingeniería de Sistemas",
  "Ingeniería Agroindustrial",
  "Ingeniería Ambiental",
  "Administración de Empresas",
  "Contaduría Pública",
  "Derecho",
  "Psicología",
];

const RegistrarDocente = () => {
  const [form, setForm] = useState({
    profesion: "",
    carrera: "",
    usuario: {
      cedula: "",
      nombre: "",
      correo: "",
      password: "",
    },
  });

  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["cedula", "nombre", "correo", "password"].includes(name)) {
      setForm({ ...form, usuario: { ...form.usuario, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/docente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ ${data.message || "Docente registrado correctamente"}`);
      } else {
        setMensaje(
          `❌ Error: ${data.error || "No se pudo registrar el docente"}`
        );
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="register-teacher-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content-teacher">
          <div className="header-icon">
            <GraduationCap />
          </div>
          <div className="header-text-teacher">
            <h1 className="page-title">Registrar Docente</h1>
            <p className="page-subtitle">
              Completa la información para crear una nueva cuenta de docente
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <div className="form-header">
          <div className="form-header-icon">
            <Award />
          </div>
          <div className="form-header-text">
            <h2 className="form-title">Información del Docente</h2>
            <p className="form-subtitle">Todos los campos son obligatorios</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-grid-teacher">
            {/* Cédula */}
            <div className="form-group">
              <label htmlFor="cedula" className="form-label-teacher">
                <IdCard size={16} />
                Cédula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                placeholder="Ej. 222222222"
                value={form.usuario.cedula}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Profesión */}
            <div className="form-group">
              <label htmlFor="profesion" className="form-label-teacher">
                <Briefcase size={16} />
                Profesión
              </label>
              <input
                id="profesion"
                name="profesion"
                placeholder="Ingrese su profesión"
                value={form.profesion}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Carrera */}
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

            {/* Nombre */}
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

            {/* Correo */}
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

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label-teacher">
                <Lock size={16} />
                Contraseña
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={form.usuario.password}
                  onChange={handleChange}
                  className="form-input password-input"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions-teacher">
            <button type="submit" className="submit-button-teacher">
              <UserPlus size={20} />
              <span>Registrar Docente</span>
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="form-footer">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">
                <GraduationCap />
              </div>
              <div className="info-content">
                <h3 className="info-title">Privilegios del Docente</h3>
                <ul className="info-list">
                  <li>Acceso a gestión de proyectos</li>
                  <li>Evaluación de estudiantes</li>
                  <li>Generación de reportes</li>
                </ul>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon warning">
                <Award />
              </div>
              <div className="info-content">
                <h3 className="info-title">Requisitos</h3>
                <ul className="info-list">
                  <li>Cédula única en el sistema</li>
                  <li>Correo institucional válido</li>
                  <li>Contraseña segura (8+ caracteres)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {mensaje && (
          <p style={{ marginTop: "20px", textAlign: "center" }}>{mensaje}</p>
        )}
      </div>
    </div>
  );
};

export default RegistrarDocente;

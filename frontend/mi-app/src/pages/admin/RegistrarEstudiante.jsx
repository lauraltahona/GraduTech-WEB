import React, { useState } from "react";
import "../../styles/admin/registrarEstudiante.css";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  GraduationCap,
  Calendar,
  BadgeIcon as IdCard,
  Eye,
  EyeOff,
} from "lucide-react";

const careers = [
  "Ingeniería de Sistemas",
  "Ingeniería Ambiental",
  "Ingeniería Agroindustrial",
  "Contaduría Pública",
  "Psicología",
  "Sociología",
];

const RegistrarEstudiante = () => {
  const [form, setForm] = useState({
    id_estudiante: "",
    carrera: "",
    semestre: "",
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
      setForm({
        ...form,
        [name]: name === "semestre" ? parseInt(value, 10) : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/estudiante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ ${data.message || "Registrado correctamente"}`);
      } else {
        setMensaje(`❌ Error: ${data.error || "No se pudo registrar"}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="register-student-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content-student">
          <div className="header-icon">
            <UserPlus />
          </div>
          <div className="header-text-student">
            <h1 className="page-title">Registrar Estudiante</h1>
            <p className="page-subtitle">
              Completa la información para crear una nueva cuenta de estudiante
            </p>
          </div>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-grid-student">
            {/* ID Estudiante */}
            <div className="form-group">
              <label htmlFor="studentId" className="form-label-student">
                <IdCard size={16} />
                ID Estudiante
              </label>
              <input
                id="d_estudiante"
                name="id_estudiante"
                type="text"
                placeholder="Ej. 2024001234"
                value={form.id_estudiante}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Carrera */}
            <div className="form-group">
              <label htmlFor="career" className="form-label-student">
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
                <option value="">Seleccione carrera</option>
                {careers.map((career) => (
                  <option key={career} value={career}>
                    {career}
                  </option>
                ))}
              </select>
            </div>

            {/* Semestre */}
            <div className="form-group">
              <label htmlFor="semester" className="form-label-student">
                <Calendar size={16} />
                Semestre
              </label>
              <input
                id="semestre"
                name="semestre"
                placeholder="Ingrese su semestre actual"
                type="number"
                min="1"
                value={form.semestre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Nombre */}
            <div className="form-group">
              <label htmlFor="name" className="form-label-student">
                <User size={16} />
                Nombre Completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                value={form.usuario.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Correo */}
            <div className="form-group">
              <label htmlFor="email" className="form-label-student">
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

            {/* Contraseña */}
            <div className="form-group">
              <label htmlFor="password" className="form-label-student">
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
          <div className="form-actions">
            <button type="submit" className="submit-button-student">
              <UserPlus size={20} />
              <span>Registrar Estudiante</span>
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="form-footer">
          <div className="info-card">
            <div className="info-icon">
              <GraduationCap />
            </div>
            <div className="info-content">
              <h3 className="info-title">Información Importante</h3>
              <ul className="info-list">
                <li>El ID de estudiante debe ser único en el sistema</li>
                <li>La contraseña debe tener al menos 8 caracteres</li>
                <li>El correo electrónico será usado para notificaciones</li>
                <li>Todos los campos son obligatorios</li>
              </ul>
            </div>
          </div>
        </div>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </div>
    </div>
  );
};

export default RegistrarEstudiante;

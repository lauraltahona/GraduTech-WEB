from locust import HttpUser, task, between
import json

class ProyectoUser(HttpUser):
    """
    Clase que simula usuarios interactuando con la API del sistema de proyectos
    """
    # Tiempo de espera entre tareas (simula tiempo de pensamiento del usuario)
    wait_time = between(1, 3)
    
    # Token de autenticación (se obtiene en el login)
    token = None
    
    def on_start(self):
        """
        Se ejecuta una vez cuando el usuario inicia
        Aquí hacemos login para obtener el token
        """
        response = self.client.post("/usuario/login", 
            json={
                "correo": "admin@unicesar.edu.co",
                "contraseña": "hola1234"
            },
            name="Login"
        )
        
        if response.status_code == 200:
            data = response.json()
            self.token = data.get('token')
            print(f"✅ Login exitoso - Token obtenido")
        else:
            print(f"❌ Error en login: {response.status_code}")
    
    @task(3)
    def obtener_estudiantes(self):
        """
        EJEMPLO 1: Consultar todos los estudiantes
        Esta tarea se ejecuta 3 veces más frecuentemente que las demás
        """
        headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
            "Content-Type": "application/json"
        }
        
        with self.client.get(
            "/estudiante/getAll",
            headers=headers,
            catch_response=True,
            name="GET Estudiantes"
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Error: {response.status_code}")
    
    @task(2)
    def obtener_proyectos_asignados(self):
        """
        EJEMPLO 2: Consultar proyectos asignados a un docente
        Esta tarea se ejecuta 2 veces más frecuentemente
        """
        # ID de usuario de ejemplo (ajusta según tus datos)
        id_usuario = 5
        
        headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
            "Content-Type": "application/json"
        }
        
        with self.client.get(
            f"/proyectos/asignados/{id_usuario}",
            headers=headers,
            catch_response=True,
            name="GET Proyectos Asignados"
        ) as response:
            if response.status_code == 200:
                response.success()
            elif response.status_code == 400:
                # Es válido que no tenga proyectos
                response.success()
            else:
                response.failure(f"Error: {response.status_code}")
    
    @task(1)
    def obtener_fechas_limite(self):
        """
        EJEMPLO 3: Consultar fechas límite de entregas
        Esta tarea se ejecuta con frecuencia normal
        """
        # ID de usuario estudiante de ejemplo
        id_usuario = 5
        
        headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
            "Content-Type": "application/json"
        }
        
        with self.client.get(
            f"/entrega/fechas/{id_usuario}",
            headers=headers,
            catch_response=True,
            name="GET Fechas Límite"
        ) as response:
            if response.status_code == 200:
                response.success()
            elif response.status_code == 400:
                response.success()  # Puede no tener fechas
            else:
                response.failure(f"Error: {response.status_code}")


class DocenteUser(HttpUser):
    """
    Clase separada para simular comportamiento de docentes
    """
    wait_time = between(2, 5)
    token = None
    
    def on_start(self):
        """Login como docente"""
        response = self.client.post("/usuario/login", 
            json={
                "correo": "patino@unicesar.edu.co",
                "contraseña": "hola1234"
            },
            name="Login Docente"
        )
        
        if response.status_code == 200:
            data = response.json()
            self.token = data.get('token')
    
    @task(2)
    def obtener_docentes_disponibles(self):
        """
        Consultar docentes disponibles para asignación
        """
        headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
        }
        
        with self.client.get(
            "/docente/docentes-disponibles",
            headers=headers,
            catch_response=True,
            name="GET Docentes Disponibles"
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Error: {response.status_code}")
    
    @task(1)
    def obtener_proyectos_sin_docente(self):
        """
        Listar proyectos que necesitan asignación de docente
        """
        headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
        }
        
        with self.client.get(
            "/proyectos/sin-docente",
            headers=headers,
            catch_response=True,
            name="GET Proyectos Sin Docente"
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Error: {response.status_code}")


# Configuración adicional para pruebas más específicas
class EstudianteIntensiveUser(HttpUser):
    """
    Usuario que hace operaciones intensivas de lectura
    """
    wait_time = between(0.5, 2)
    token = None
    
    def on_start(self):
        response = self.client.post("/usuario/login", 
            json={
                "correo": "lvaltahona@unicesar.edu.co",
                "contraseña": "hola1234"
            }
        )
        if response.status_code == 200:
            self.token = response.json().get('token')
    
    @task
    def consultas_rapidas(self):
        """
        Realiza múltiples consultas rápidas
        """
        headers = {"Authorization": f"Bearer {self.token}"}
        
        # Consulta proyecto
        self.client.get("/proyectos/obtener/7", headers=headers, name="GET Mi Proyecto")
        
        # Consulta entregas
        self.client.get("/entrega/asignadas/7", headers=headers, name="GET Entregas")
        
        # Consulta fechas
        self.client.get("/entrega/fechas/7", headers=headers, name="GET Fechas")
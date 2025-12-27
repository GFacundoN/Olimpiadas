# 🏆 Olimpiadas de Programación 2025 - Agencia de turismo "E-Scapadas" - Grupo 007

Español | [English](README.md)

Este proyecto fue desarrollado como parte de las **Olimpíadas Nacionales de Educación Técnico Profesional 2025** en la especialidad **Programación**. Consiste en una plataforma web que permite a los usuarios explorar paquetes turísticos, filtrarlos, agregarlos a un carrito, completar un proceso de compra y consultar sus pedidos realizados.

---

# 👨‍💻 Integrantes

**Facundo Gandolfo**  
Líder de proyecto y diseñador gráfico  
Estudiante de Técnico en Programación  
Participante de las ONETP 2025  
🇦🇷 Argentina

**Lautaro Borges**  
Programador  
Estudiante de Técnico en Programación  
Participante de las ONETP 2025  
🇦🇷 Argentina

**Valentina Bernardi**  
Analista funcional  
Estudiante de Técnico en Programación  
Participante de las ONETP 2025  
🇦🇷 Argentina

**Diego Nuñez**  
Programador  
Estudiante de Técnico en Programación  
Participante de las ONETP 2025  
🇦🇷 Argentina

---

## 📦 Contenidos

- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Cómo Desplegar](#-cómo-desplegar)
- [Créditos](#-créditos)

---

## 🛠️ Tecnologías Utilizadas

### 🔹 Frontend

- Angular 17
- Tailwind CSS 4.1

### 🔸 Backend

- Java 17
- Spring Boot 3
- MySQL (phpMyAdmin)

---

## 🎯 Funcionalidades Principales

- 🔍 **Buscador con filtros dinámicos**: permite buscar paquetes turísticos filtrando por ciudad, categoría, tipo y duración.
- 🛒 **Carrito de compras**: sistema para agregar y eliminar paquetes seleccionados, con resumen automático.
- ✅ **Proceso de checkout**: carga de datos de pasajeros, validaciones en el formulario, y confirmación de compra.
- 📋 **Gestión de pedidos**: pedidos registrados en la base de datos con su respectivo estado.
- 📊 **Panel "Mis compras"**: listado de todos los pedidos realizados por el usuario con sus detalles.

---

## 📁 Estructura del Proyecto

```
turismo-olimpiadas/
├── frontend-olimpiadas/  ← Angular + Tailwind CSS
└── backend-olimpiadas/   ← Spring Boot + MySQL
```

- **frontend-olimpiadas/**: contiene componentes, servicios, rutas y lógica de presentación.
- **backend-olimpiadas/**: contiene controladores, servicios, entidades, DTOs, validaciones y la conexión a base de datos.

---

## 🚀 Cómo Desplegar

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) y **npm**
- **Java JDK 17** o superior
- **Maven** (para construir el backend)
- **MySQL** (o phpMyAdmin)
- **Angular CLI**: `npm install -g @angular/cli`

### 1️⃣ Configuración de la Base de Datos

1. Crear una base de datos MySQL:
```sql
CREATE DATABASE turismo_db;
```

2. Configurar la conexión en `backend-olimpiadas/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/turismo_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

3. Las tablas se crearán automáticamente por Spring Boot en la primera ejecución.

### 2️⃣ Despliegue del Backend

1. Navegar al directorio del backend:
```bash
cd backend-olimpiadas
```

2. Instalar dependencias y construir el proyecto:
```bash
mvn clean install
```

3. Ejecutar la aplicación Spring Boot:
```bash
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3️⃣ Despliegue del Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend-olimpiadas
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el servidor de desarrollo:
```bash
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

### 4️⃣ Acceder a la Aplicación

Una vez que ambos servidores estén ejecutándose:

1. Abre tu navegador y ve a `http://localhost:4200`
2. El frontend se comunicará automáticamente con el backend en el puerto 8080
3. ¡Comienza a explorar paquetes turísticos!

### 📝 Notas Adicionales

- Asegúrate de que tanto el backend como el frontend estén ejecutándose simultáneamente
- Verifica que MySQL esté corriendo antes de iniciar el backend
- Si encuentras problemas de CORS, verifica la configuración de CORS en el backend

---

# 🎓 Créditos

Este sistema fue desarrollado como parte del proyecto de la especialidad **Programación** en la competencia **ONETP 2025**.

El desarrollo integra:

- Diseño frontend responsive con Angular y Tailwind CSS
- Lógica de negocio y persistencia en Java con Spring Boot
- Base de datos MySQL estructurada con entidades relacionales
- Validaciones, filtros y control de pedidos integrados en toda la app

Agradecemos a nuestros docentes y a la comunidad técnica por el acompañamiento durante el desarrollo del proyecto.

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

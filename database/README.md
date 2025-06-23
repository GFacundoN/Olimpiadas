# Base de Datos - Proyecto E-Scapadas

Este sistema utiliza una base de datos MySQL gestionada con phpMyAdmin.  
Contiene toda la estructura y datos necesarios para que la aplicación funcione correctamente.

---

## 📦 Archivo incluido

- `e-scapadas.sql` → contiene:
  - Estructura de las tablas: `usuario`, `paquete`, `pedido`
  - Claves primarias y foráneas
  - Índices y relaciones
  - Un registro de ejemplo para el usuario "Jefe de Ventas"

---

## ▶️ Instrucciones para importar

1. Abrir **phpMyAdmin**.
2. Crear una nueva base de datos con el nombre: `e-scapadas`.
3. Ir a la pestaña **"Importar"**.
4. Seleccionar el archivo `e-scapadas.sql` incluido en esta carpeta.
5. Hacer clic en **"Continuar"**.

Esto creará automáticamente las tablas con su estructura y registros base.

---

## 🧪 Datos de prueba

El script incluye un usuario jefe de ventas:

- **Usuario**: `jefe@empresa.com`
- **Contraseña**: `Jefecontraseña1234.`  

---

## 🛠️ Requisitos

- MySQL o MariaDB
- phpMyAdmin o equivalente

---

![logo-color](https://github.com/user-attachments/assets/4bfc5671-9f28-4340-a1fc-7f97d110e2f9)

# Aplicación web para adopción y busqueda de mascotas

Conectando Huellas es una aplicación web que busca ayudar a conectar refugios de animales con futuros dueños y ayudar a difundir información de mascotas perdidas.

## Funcionalidades Principales

- Visualizar mascotas perdidas y en adopción 
- Filtrar mascotas
- Registrar mascotas
- Gestión de mascotas por usuario
- Registro y autenticación de usuarios
- Visualizacion de datos en mapa.
- Carga de Imágenes.
- Envío de Correos.

## Tecnologías utilizadas

Frontend:

- React, Vite, Mantine, React Map GL
- React Router DOM
- JSON Server
- ESLint, Prettier, ESLint y Prettier

Backend:

- Node.js (Express) usando TypeScript
- PostgreSQL
- Cypress para pruebas end-to-end

## Peticiones a la Base de Datos

  - Crear usuario
    
    ```
    const res = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Ana",
          correo: "ana84168@gmail.com",
          phone: "999161999",
          address: "Av. 7 de Abril - Lima",
          password: "***********",
        }),
      });
    ```



## Avances 04/10/2024

- Diseño y maquetacion de las paginas: Home, Detalle de Mascota, Formularios (Crear y Editar Mascota), Inicio de Sesión, Registro de Usuario, filtros
- Seleccion de libreria de mapa e implementación
- Validación de datos en formularios
- Implementación de json server para el registro y lectura de mascotas
- Actualización de ReadMe

## Avances 11/10/2024

- Crear el diagrama relacional que incluya las tablas necesarias para la aplicación
- Especificar las relaciones entre las tablas
- Definir las operaciones CRUD para cada tabla
- Agregar ejemplos de peticiones para cada una de las operaciones definidas al ReadMe
- Registro y actualización de registros de mascotas con json-server
- Registro de usuarios con json-server
- Implementación de contexto en la aplicación

## Integrantes

- Ana Albirena
- Alexander Puma
- Antony Antezana

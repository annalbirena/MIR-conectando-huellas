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

- Actualizar usuario

  ```
  const res = await fetch('http://localhost:8080/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Ana",
        correo: "ana84168@gmail.com",
        phone: "999161988",
        address: "Av. 8 de Abril - Lima",
        password: "***********",
      }),
    });
  ```

- Crear mascota en Adopción

  ```
  const res = await fetch('http://localhost:8080/api/registeradoption_pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Firulais",
        type:'Perro',
        age_unit:'1'. / 0:meses. 1:años
        age:'1',
        sex:'Macho',
        breed:'Dalmata',
        size:'Pequeño',
        image:'.............',
        location_latitude:'15511',
        location_length:'82551',
        contact_name:'Luis',
        contact_phone:'958952515',
        contact_adreess:'Av. Los Cipreses 18 Lima',
        status_adopt:'0', / 0:en adopcion, 1:adoptado
        aditional_descripcion:'Perrito de 1 año que se encuentra en búsqueda de un hogar',
      }),
    });
  ```

- Actualizar "ESTADO" de mascota en Adopción

  ```
  const res = await fetch('http://localhost:8080/api/registeradoption_pets/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status_adopt:'1', / 0:en adopcion, 1:adoptado
      }),
    });
  ```

- Crear mascota Perdida

  ```
  const res = await fetch('http://localhost:8080/api/registerlost_pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Michi",
        type:'Gato',
        age_unit:'0'. / 0:meses. 1:años
        age:'8',
        sex:'Hembra',
        breed:'Cruzado',
        size:'Pequeño',
        image:'.............',
        location_latitude:'5151',
        location_length:'98754',
        lost_date:'07/10/2024'
        contact_name:'Tomas',
        contact_phone:'957752515',
        contact_adreess:'Calle Los Olmos 25 Magdalena del Mar Lima',
        status_lost:'0', / 0:perdido, 1:encontrado
        aditional_descripcion:'Se perdio el día Lunes cerca a la caceta de vigilantes del mercado Central',
      }),
    });
  ```

- Actualizar "ESTADO" de mascota Perdida

  ```
  const res = await fetch('http://localhost:8080/api/registerlost_pets/2', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status_lost:'1', / 0:perdido, 1:encontrado
      }),
    });
  ```

- Actualizar mascota

  ```
  const res = await fetch('http://localhost:8080/api/pets/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Michi",
        type:'Gato',
        age_unit:'1'. / 0:meses. 1:años
        age:'1',
        sex:'Hembra',
        breed:'Cruzado',
        size:'Mediano',
        image:'.............',
        location_latitude:'5151',
        location_length:'98754',
      }),
    });
  ```

- Consultar mascotas

  ```
  const response = await fetch('http://localhost:8080/api/pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  ```

- Consulta mascota

  ```
  const response = await fetch(`http://localhost:8080/api/pets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  ```

- Consulta mascota por sexo

  ```
  const response = await fetch(`http://localhost:8080/api/pets?sexo=${sexo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  ```

- Consulta mascota despúes de cierta fecha
  ```
  const response = await fetch(`http://localhost:8080/api/pets?lostAfter=${fecha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
- Antony Antezana
- Alexander Puma

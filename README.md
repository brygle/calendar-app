# Calendar App

Aplicación full stack para registrar y administrar eventos en un calendario.

El proyecto está organizado en dos aplicaciones independientes:

- **Frontend:** React.
- **Backend:** Node.js con JavaScript.
- **Base de datos:** MongoDB.

## Estructura del proyecto

```text
calendar-app/
├── frontend/          # Aplicación React
├── backend/           # API Node.js
│   ├── .env.example   # Plantilla de variables de entorno
│   └── ...
├── .gitignore
└── README.md
```

## Requisitos previos

Antes de ejecutar el proyecto, instala:

- [Node.js](https://nodejs.org/) y npm.
- [MongoDB](https://www.mongodb.com/) local o una instancia en [MongoDB Atlas](https://www.mongodb.com/atlas).
- Git.

## Configuración del backend

### 1. Instalar dependencias

Abre una terminal en la carpeta del backend:

```bash
cd backend
npm install
```

### 2. Crear las variables de entorno

Crea un archivo llamado `.env` dentro de `backend/`, tomando como referencia `backend/.env.example`.

```env
PORT=3000
DB_CNN=mongodb://localhost:27017/calendar-app
SECRET_JWT_SEED=replace_with_a_secure_random_secret
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que se ejecuta la aplicación Node.js. |
| `DB_CNN` | Cadena de conexión a MongoDB. |
| `SECRET_JWT_SEED` | Clave secreta utilizada para firmar y verificar los JWT. |

**Notas importantes:**

- Si utilizas MongoDB Atlas, reemplaza `DB_CNN` por la cadena de conexión de tu clúster.
- Genera un valor aleatorio y privado para `SECRET_JWT_SEED`. Puedes crear uno con:

  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- No compartas el archivo `.env` ni publiques sus valores. El archivo `.env` debe permanecer fuera del control de versiones.
- Si la contraseña de MongoDB contiene caracteres especiales, asegúrate de codificarlos correctamente en la URI.

### 3. Ejecutar el backend

Utiliza el script disponible en `backend/package.json`. Por ejemplo, si está definido el script `start`:

```bash
npm run dev
```

## Configuración del frontend

### 1. Instalar dependencias

Desde la raíz del repositorio:

```bash
cd frontend
npm install
```

### 2. Ejecutar el frontend

Utiliza el script definido en `frontend/package.json`. En un proyecto React con Vite normalmente es:

```bash
npm run dev
```

Si utilizas otra herramienta de React, consulta los scripts disponibles en `frontend/package.json`.

## Ejecutar el proyecto

Abre dos terminales:

**Terminal 1 — Backend**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
npm run dev
```

Asegúrate de que el frontend apunte a la URL del backend y que MongoDB esté disponible.

## Variables de entorno y seguridad

- No subas archivos `.env` al repositorio.
- Mantén actualizado `.env.example` cuando agregues o cambies variables, pero utiliza valores vacíos o de ejemplo, nunca secretos reales.
- No incluyas credenciales, tokens ni cadenas de conexión privadas en el código fuente.

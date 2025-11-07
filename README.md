
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install

# AppRemitos - Backend (remitos-back)

Backend en NestJS + TypeORM para exponer la API de búsqueda de remitos.

Provee el endpoint principal:

- GET /remitos  — parámetros opcionales: razon, clienteId, numeroRemito, desde, hasta, page, limit

La respuesta es paginada: `{ items: Remito[], total: number, page: number, limit: number }`.

## Características

- NestJS (TypeScript)
- TypeORM (soporte mssql)
- Validaciones con `class-validator` y `class-transformer` (DTOs)
- Manejo explícito de errores (tabla no encontrada, errores de consulta)
- CORS configurable para desarrollo

## Badges

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0055A8?logo=typeorm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![MS SQL](https://img.shields.io/badge/MSSQL-CC2927?logo=microsoft-sql-server&logoColor=white)

## Requisitos

- Node.js 14+ (recomendado 16+)
- npm
- SQL Server accesible (host/usuario/password/db)

## Variables de entorno (.env)

Ejemplo mínimo (`remitos-back/.env`):

```env
DB_HOST=127.0.0.1
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourStrong!Passw0rd
DB_DATABASE=remitos_db

# Nombre y schema de la tabla de remitos (ajusta a tu BD)
REMITOS_TABLE_NAME=remitos
REMITOS_SCHEMA=dbo

# CORS: origen del frontend
FRONTEND_ORIGIN=http://localhost:4200

# En desarrollo puedes permitir que TypeORM sincronice el esquema (cuidado en prod)
TYPEORM_SYNCHRONIZE=false

# Opcional: definir logging y otras opciones
TYPEORM_LOGGING=false
```

Notas:

- Si `TYPEORM_SYNCHRONIZE=true` TypeORM intentará crear/alterar tablas automáticamente — úsalo solo en desarrollo.
- Asegúrate que `REMITOS_TABLE_NAME` y `REMITOS_SCHEMA` coincidan exactamente con la tabla en la base de datos para evitar errores `Invalid object name '...'`.

## Instalación y ejecución (desarrollo)

Instala dependencias y lanza en modo desarrollo:

```bash
cd remitos-back
npm install
# crear/configurar remitos-back/.env con las variables anteriores
npm run start:dev
```

Comandos útiles:

- `npm run start:dev` — arranque con watch (recomendado en desarrollo)
- `npm run start` — arranque normal
- `npm run start:prod` — producción (build previo)

## Endpoint de prueba rápida (curl)

Ejemplo para obtener la primera página (20 por defecto):

```bash
curl "http://localhost:3000/remitos?page=1&limit=20"
```

Filtrar por razón social (parcial):

```bash
curl "http://localhost:3000/remitos?razon=Acme&page=1&limit=20"
```

## Migraciones / Creación de tabla (SQL de ejemplo)

Si no quieres usar `TYPEORM_SYNCHRONIZE`, aquí hay un SQL de ejemplo (ajusta tipos/longitudes) para crear una tabla básica `remitos`:

```sql
CREATE TABLE dbo.remitos (
	id INT IDENTITY(1,1) PRIMARY KEY,
	numeroRemito NVARCHAR(100) NOT NULL,
	clienteId NVARCHAR(100) NULL,
	razonSocial NVARCHAR(255) NULL,
	fecha DATETIME2 NOT NULL,
	linkRemito NVARCHAR(500) NULL
);
```

Recomendación: usar migrations de TypeORM en proyectos más grandes. Si quieres, puedo generar una migration inicial basada en la entidad `Remito`.

## CORS

El origen permitido está controlado por `FRONTEND_ORIGIN` en `.env`. Si pruebas desde `http://localhost:4200`, asegúrate que esa URL esté en la variable y reinicia el backend.

## Tests

Si el proyecto incluye tests (jest), ejecuta:

```bash
npm run test        # unit
npm run test:e2e    # e2e (si están configurados)
```

## Depuración de errores comunes

- "Invalid object name 'remitos'" — revisa `REMITOS_TABLE_NAME` y `REMITOS_SCHEMA`, y que la BD contenga la tabla. En desarrollo puedes usar `TYPEORM_SYNCHRONIZE=true` temporalmente.
- Problemas CORS — revisar `FRONTEND_ORIGIN` y que backend haya sido reiniciado.
- Conexión a BD — verifica `DB_HOST`, `DB_PORT`, credenciales y que el servidor SQL permita conexiones remotas.

## Desarrollo y mejoras sugeridas

- Añadir migrations con TypeORM (preferible a synchronize)
- Tests unitarios del `RemitosService` y de integración para `/remitos`
- Validación más estricta o normalización del contrato JSON (usar camelCase consistentemente)

## Contribuir

1. Fork / branch
2. Añadir tests y cambios
3. Pull request describiendo cambios

## Licencia

Revisa el fichero `LICENSE` en la raíz del repositorio.

## Contacto

Para preguntas o problemas abre un issue en el repositorio.



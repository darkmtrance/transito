# TránsitoPeru - Consulta de Reglas de Tránsito

![TránsitoPeru Logo](https://via.placeholder.com/200x60?text=TransitoPeru)

## Descripción

TránsitoPeru es una aplicación web que permite a los usuarios consultar información sobre las reglas de tránsito en Perú de manera rápida y sencilla. La plataforma utiliza un webhook para procesar las consultas y devolver respuestas relevantes, ayudando a los conductores y peatones a entender mejor la normativa vial peruana.

## Características

- **Consulta Interactiva**: Interfaz amigable para realizar consultas sobre normativas de tránsito.
- **Respuestas Instantáneas**: Integración con un sistema de procesamiento de consultas mediante webhook.
- **Diseño Responsivo**: Experiencia de usuario optimizada para dispositivos móviles y de escritorio.
- **Información Categorizada**: Contenido organizado para facilitar el acceso a diferentes tipos de normativas.
- **Seguimiento de Sesiones**: Análisis de consultas para mejorar el servicio.

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (para iconos)

## Vista Previa

La aplicación está disponible en: [https://darkmtrance.github.io/transito/](https://darkmtrance.github.io/transito/)

## Instalación y Uso Local

### Requisitos Previos

- Node.js (versión 16.x o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/darkmtrance/transito.git
   cd transito
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

5. Vista previa de la versión de producción:
   ```bash
   npm run preview
   ```

## Estructura del Proyecto

```
transito/
├── public/          # Archivos públicos estáticos
├── src/             # Código fuente
│   ├── App.tsx      # Componente principal
│   ├── main.tsx     # Punto de entrada
│   └── index.css    # Estilos globales (Tailwind)
├── .github/         # Configuraciones de GitHub Actions
├── package.json     # Dependencias y scripts
└── vite.config.ts   # Configuración de Vite
```

## API / Webhook

El proyecto utiliza un webhook para procesar las consultas:

- **Endpoint**: `https://n8n.matomaylla.com/webhook-test/b41cc15f-f9f0-44b8-9eeb-1b4840c50d4a`
- **Método**: POST
- **Formato de solicitud**: JSON
- **Estructura de respuesta**: `{ "output": "resultado" }`

## Despliegue

La aplicación está configurada para desplegarse automáticamente en GitHub Pages cuando se realiza un push a la rama principal utilizando GitHub Actions.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un fork del proyecto, realiza tus cambios y envía un pull request.

## Licencia

[MIT](LICENSE)

## Contacto

Para cualquier consulta o sugerencia, por favor contactar a través de [GitHub](https://github.com/darkmtrance).

---

Desarrollado con ❤️ para mejorar la seguridad vial en Perú.
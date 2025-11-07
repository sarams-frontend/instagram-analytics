# Instagram Analytics Platform

Una plataforma web moderna para analizar perfiles de Instagram, similar a HypeAuditor. Obtén métricas detalladas, análisis de audiencia y estadísticas de engagement de cualquier creador de contenido.

## 🚀 Características

- **Búsqueda de Usuarios**: Analiza cualquier perfil público de Instagram
- **Métricas de Engagement**: Tasa de engagement, promedio de me gusta y comentarios
- **Análisis de Audiencia**: Calidad de seguidores, seguidores reales vs sospechosos
- **Clasificaciones**: Rankings globales, nacionales y por categoría
- **Categorías de Contenido**: Identifica las temáticas principales del creador
- **Tendencias de Seguidores**: Visualiza el crecimiento histórico con gráficos interactivos
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta en [RapidAPI](https://rapidapi.com/)
- API Key de una de las siguientes APIs de Instagram en RapidAPI:
  - [Instagram Statistics API](https://rapidapi.com/artemlipko/api/instagram-statistics-api)
  - [Instagram API - Fast & Reliable Data Scraper](https://rapidapi.com/mediacrawlers-mediacrawlers-default/api/instagram-api-fast-reliable-data-scraper)

## 🔧 Instalación

1. **Clona o descarga el proyecto**

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` y agrega tu API Key de RapidAPI:

   ```env
   VITE_RAPIDAPI_KEY=tu_clave_de_rapidapi_aqui
   VITE_RAPIDAPI_HOST=instagram-statistics-api.p.rapidapi.com
   ```

## 🔑 Cómo Obtener tu API Key de RapidAPI

1. **Regístrate en RapidAPI**
   - Ve a [RapidAPI](https://rapidapi.com/)
   - Crea una cuenta gratuita o inicia sesión

2. **Suscríbete a una API de Instagram**
   - Busca "Instagram Statistics API" o "Instagram API"
   - Selecciona un plan (hay planes gratuitos disponibles)
   - Suscríbete a la API

3. **Obtén tu API Key**
   - En la página de la API, ve a la pestaña "Endpoints"
   - En el panel de código, verás tu `X-RapidAPI-Key`
   - Copia esta clave y agrégala a tu archivo `.env`

## 🎯 Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:5173](http://localhost:5173)

### Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Vista Previa de Producción

```bash
npm run preview
```

## 📱 Cómo Usar la Aplicación

1. **Abre la aplicación** en tu navegador
2. **Ingresa un nombre de usuario** de Instagram (sin el @)
   - Ejemplo: `noelbayarri`
3. **Haz clic en "Analizar"**
4. **Explora los resultados**:
   - Información del perfil
   - Métricas de engagement
   - Categorías de contenido
   - Rankings y clasificaciones
   - Calidad de la audiencia
   - Gráfico de crecimiento de seguidores

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de JavaScript
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de CSS
- **Recharts**: Librería de gráficos
- **Axios**: Cliente HTTP
- **Lucide React**: Iconos
- **RapidAPI**: Plataforma de APIs

## 📂 Estructura del Proyecto

```
instagram-analytics/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── EngagementStats.tsx
│   │   ├── ContentCategories.tsx
│   │   ├── Rankings.tsx
│   │   ├── AudienceQuality.tsx
│   │   ├── FollowerGrowthChart.tsx
│   │   └── MetricCard.tsx
│   ├── pages/            # Páginas de la aplicación
│   │   └── HomePage.tsx
│   ├── services/         # Servicios y lógica de negocio
│   │   └── instagram.service.ts
│   ├── types/            # Tipos de TypeScript
│   │   └── instagram.ts
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── public/               # Archivos estáticos
├── .env.example          # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔄 Integración con Lovable

Para usar este proyecto con Lovable:

1. **Sube el proyecto a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin tu-repositorio-github
   git push -u origin main
   ```

2. **Importa en Lovable**:
   - Ve a [Lovable](https://lovable.dev/)
   - Crea un nuevo proyecto
   - Conecta tu repositorio de GitHub
   - Lovable detectará automáticamente la configuración de Vite y React

3. **Configura las variables de entorno en Lovable**:
   - En el panel de Lovable, ve a Settings → Environment Variables
   - Agrega `VITE_RAPIDAPI_KEY` con tu clave de API
   - Agrega `VITE_RAPIDAPI_HOST` si usas un host diferente

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js` para cambiar la paleta de colores:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#tu-color-aqui',
        // ...
      },
    },
  },
}
```

### Agregar Nuevas Métricas

1. Actualiza los tipos en `src/types/instagram.ts`
2. Modifica el servicio en `src/services/instagram.service.ts`
3. Crea un nuevo componente en `src/components/`
4. Agrégalo a `HomePage.tsx`

## 🐛 Solución de Problemas

### Error: "API Key not configured"

- Verifica que el archivo `.env` existe y contiene `VITE_RAPIDAPI_KEY`
- Reinicia el servidor de desarrollo después de crear el `.env`

### Error: "Request failed with status 403"

- Tu API Key puede ser inválida o haber expirado
- Verifica tu suscripción en RapidAPI
- Asegúrate de que el nombre del host coincide con la API que estás usando

### Error: "Cannot find module"

- Ejecuta `npm install` para instalar todas las dependencias
- Verifica que todas las rutas de importación usen el alias `@/`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- Revisa la documentación de [RapidAPI](https://docs.rapidapi.com/)
- Consulta la documentación de [Vite](https://vitejs.dev/)
- Consulta la documentación de [React](https://react.dev/)

## 🎉 Próximas Funcionalidades

- [ ] Análisis de hashtags más utilizados
- [ ] Comparación entre múltiples perfiles
- [ ] Exportación de reportes en PDF
- [ ] Análisis de contenido por tipo (fotos, videos, reels)
- [ ] Mejores horarios para publicar
- [ ] Análisis de demografía de audiencia
- [ ] Historial de búsquedas
- [ ] Dashboard con múltiples perfiles

---

Desarrollado con ❤️ usando React, TypeScript y RapidAPI

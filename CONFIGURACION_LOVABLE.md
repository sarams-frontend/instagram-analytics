# Guía de Configuración para Lovable

Esta guía te ayudará a subir y configurar tu proyecto de Instagram Analytics en Lovable.

## 📋 Paso 1: Preparar el Proyecto

### 1.1 Verificar que todo está en orden

Asegúrate de que tienes todos los archivos necesarios:

```
✅ package.json
✅ vite.config.ts
✅ tsconfig.json
✅ index.html
✅ src/ (carpeta con todos los componentes)
✅ .env.example
✅ README.md
```

### 1.2 Crear el archivo .gitignore (ya incluido)

El archivo `.gitignore` ya está creado y excluye:
- `node_modules/`
- `.env` (para proteger tu API key)
- `dist/`

## 🚀 Paso 2: Subir a GitHub

### 2.1 Inicializar Git

```bash
git init
```

### 2.2 Agregar todos los archivos

```bash
git add .
```

### 2.3 Hacer el primer commit

```bash
git commit -m "Initial commit: Instagram Analytics Platform"
```

### 2.4 Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com/)
2. Haz clic en "New repository"
3. Nombre sugerido: `instagram-analytics`
4. Descripción: "Plataforma de análisis de Instagram similar a HypeAuditor"
5. Déjalo como **público** o **privado** según prefieras
6. **NO** inicialices con README (ya tenemos uno)
7. Haz clic en "Create repository"

### 2.5 Conectar con el repositorio remoto

Copia los comandos que GitHub te muestra, algo como:

```bash
git remote add origin https://github.com/TU-USUARIO/instagram-analytics.git
git branch -M main
git push -u origin main
```

## 💻 Paso 3: Importar en Lovable

### 3.1 Acceder a Lovable

1. Ve a [Lovable](https://lovable.dev/)
2. Inicia sesión con tu cuenta

### 3.2 Crear un nuevo proyecto

1. Haz clic en **"New Project"** o **"Create Project"**
2. Selecciona **"Import from GitHub"**
3. Autoriza a Lovable a acceder a tus repositorios si te lo pide
4. Busca y selecciona tu repositorio `instagram-analytics`
5. Haz clic en **"Import"**

### 3.3 Esperar la detección automática

Lovable detectará automáticamente:
- ✅ Framework: React + Vite
- ✅ Lenguaje: TypeScript
- ✅ Estilos: Tailwind CSS
- ✅ Gestor de paquetes: npm

## 🔑 Paso 4: Configurar Variables de Entorno en Lovable

### 4.1 Obtener tu API Key de RapidAPI

Si aún no tienes tu API key:

1. Ve a [RapidAPI](https://rapidapi.com/)
2. Busca "Instagram Statistics API" o "Instagram API - Fast & Reliable Data Scraper"
3. Suscríbete (hay planes gratuitos)
4. Copia tu `X-RapidAPI-Key`

### 4.2 Agregar las variables de entorno en Lovable

1. En tu proyecto de Lovable, ve a **Settings** o **Project Settings**
2. Busca la sección **"Environment Variables"**
3. Agrega las siguientes variables:

```
VITE_RAPIDAPI_KEY = tu_clave_de_rapidapi_aqui
VITE_RAPIDAPI_HOST = instagram-statistics-api.p.rapidapi.com
```

**Importante**:
- El `VITE_RAPIDAPI_HOST` debe coincidir con el host de la API que elegiste en RapidAPI
- Si usas otra API de Instagram, cambia el host según corresponda

### 4.3 Guardar y redesplegar

1. Guarda las variables de entorno
2. Lovable reconstruirá el proyecto automáticamente con las nuevas variables

## 🎨 Paso 5: Personalización en Lovable (Opcional)

### 5.1 Usar el Editor de Lovable

Lovable tiene un editor visual donde puedes:

- **Modificar componentes** visualmente
- **Cambiar colores** arrastrando y soltando
- **Ajustar el layout** sin tocar código
- **Ver cambios en tiempo real**

### 5.2 Editar con Prompts

También puedes pedirle a Lovable que haga cambios con lenguaje natural:

Ejemplos:
- "Cambia el color naranja a azul"
- "Agrega un botón para compartir en Twitter"
- "Haz el título más grande"

## 🌐 Paso 6: Publicar

### 6.1 Deploy automático

Lovable despliega automáticamente cada cambio que hagas. Tu aplicación estará disponible en una URL como:

```
https://tu-proyecto.lovable.app
```

### 6.2 Dominio personalizado (opcional)

Si tienes un dominio propio:

1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de Lovable para configurar los DNS

## 🔄 Paso 7: Workflow de Desarrollo

### 7.1 Trabajar localmente y sincronizar

Si prefieres trabajar en tu editor local (VS Code, etc.):

```bash
# 1. Hacer cambios en tu código local
# 2. Commit
git add .
git commit -m "Descripción de los cambios"

# 3. Push a GitHub
git push

# 4. Lovable detectará los cambios y redesplegaráautomáticamente
```

### 7.2 Trabajar en Lovable

Alternativamente, puedes:

1. Hacer cambios directamente en el editor de Lovable
2. Lovable hará commit automáticamente a tu repositorio
3. Puedes pullear los cambios a tu máquina local cuando quieras

```bash
git pull
```

## ✅ Checklist Final

Verifica que todo está funcionando:

- [ ] El proyecto está en GitHub
- [ ] Lovable ha importado el proyecto correctamente
- [ ] Las variables de entorno están configuradas
- [ ] La aplicación se ve correctamente en la preview de Lovable
- [ ] Puedes buscar un usuario de Instagram y ver resultados (o al menos el error de API si no configuraste la key todavía)
- [ ] El sitio está desplegado y accesible públicamente

## 🐛 Solución de Problemas

### Error: "Build failed"

- Verifica que todas las dependencias están en `package.json`
- Asegúrate de que no hay errores de TypeScript
- Revisa los logs de build en Lovable

### Error: "Environment variables not found"

- Confirma que las variables comienzan con `VITE_`
- Verifica que las guardaste correctamente en Lovable
- Reconstruye el proyecto manualmente si es necesario

### La aplicación no muestra datos

- Verifica que tu API key es válida en RapidAPI
- Confirma que no has excedido el límite de tu plan gratuito
- Abre la consola del navegador para ver errores detallados

## 📚 Recursos Adicionales

- [Documentación de Lovable](https://docs.lovable.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de RapidAPI](https://docs.rapidapi.com/)
- [Guía de React](https://react.dev/)

## 🎉 ¡Listo!

Tu aplicación de Instagram Analytics está lista para usar. Ahora puedes:

1. Compartir el enlace con otros
2. Seguir desarrollando nuevas funcionalidades
3. Personalizar el diseño a tu gusto
4. Agregar más métricas y análisis

---

¿Necesitas ayuda? Revisa el README.md principal o consulta la documentación de Lovable.

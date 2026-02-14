# 🛒 PrecioAR - Comparador Inteligente de Precios

Aplicación web con IA para comparar precios en e-commerce argentinos (Coto Digital, Carrefour, Jumbo, etc.)

## 🚀 Características

- ✅ Comparación de precios en múltiples tiendas simultáneamente
- 🤖 Análisis inteligente con Claude AI
- 💰 Detección automática del mejor precio
- 📱 Diseño responsive y moderno
- ⚡ Resultados en tiempo real

## 📋 Requisitos

- Node.js 16+ 
- Cuenta en Vercel (gratis)
- API Key de Anthropic (Claude)

## 🛠️ Instalación Local

1. **Clona o descarga los archivos del proyecto**

2. **Instala las dependencias:**
```bash
npm install
```

3. **Ejecuta en modo desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🌐 Deploy en Vercel (GRATIS)

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Crea un repositorio en GitHub**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (puede ser privado)
   - Sube todos los archivos del proyecto

2. **Conecta con Vercel**
   - Ve a https://vercel.com
   - Crea una cuenta gratuita (usa tu cuenta de GitHub)
   - Click en "Add New" → "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite/React

3. **Configura las variables de entorno**
   - En la configuración del proyecto, NO necesitas agregar variables de entorno
   - La API de Claude se llama directamente desde el navegador

4. **Deploy**
   - Click en "Deploy"
   - Espera 1-2 minutos
   - ¡Tu app estará en línea! Recibirás un link como: `https://tu-proyecto.vercel.app`

### Opción 2: Deploy con Vercel CLI

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel

# Sigue las instrucciones en la terminal
```

## 🔑 Obtener API Key de Anthropic

La aplicación usa la API de Claude de Anthropic. Hay dos formas de usarla:

### Forma 1: API Gratuita (Limitada)
- La app actualmente usa el endpoint público
- Tiene limitaciones de rate limiting
- Funciona sin configuración adicional

### Forma 2: Tu propia API Key (Recomendado para uso intensivo)

1. Ve a https://console.anthropic.com
2. Crea una cuenta
3. Ve a "API Keys" y genera una nueva key
4. Anthropic ofrece $5 de crédito gratis al registrarte

**Para usar tu propia API Key:**

Modifica el archivo `src/price-comparator.jsx`, busca la línea que dice:
```javascript
headers: {
  "Content-Type": "application/json",
},
```

Y cámbiala por:
```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": "tu-api-key-aqui",
},
```

⚠️ **IMPORTANTE:** Si usas tu propia API key, NO la subas a GitHub. Usa variables de entorno:

1. Crea un archivo `.env.local`:
```
VITE_ANTHROPIC_API_KEY=tu-api-key-aqui
```

2. Modifica el código para usar:
```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
},
```

3. En Vercel, agrega la variable de entorno en Settings → Environment Variables

## 📖 Cómo Usar

1. **Ingresa el producto que buscas**
   - Ejemplo: "Yerba Mate Rosamonte 1kg"
   - Ejemplo: "Smart TV Samsung 55 pulgadas"

2. **Agrega URLs de productos**
   - Copia y pega las URLs de los productos en diferentes tiendas
   - Puedes agregar 2-5 tiendas para comparar
   - Ejemplos:
     - Coto: https://www.cotodigital3.com.ar/...
     - Carrefour: https://www.carrefour.com.ar/...
     - Jumbo: https://www.jumbo.com.ar/...

3. **Click en "Comparar Precios"**
   - La IA buscará y comparará automáticamente
   - Verás cuál tiene el mejor precio
   - Recibirás una recomendación de compra

## 🏗️ Estructura del Proyecto

```
precioar-comparador/
├── src/
│   ├── price-comparator.jsx  # Componente principal
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos Tailwind
├── index.html                # HTML base
├── package.json              # Dependencias
├── vite.config.js            # Configuración Vite
├── tailwind.config.js        # Configuración Tailwind
└── postcss.config.js         # Configuración PostCSS
```

## 🎨 Personalización

### Cambiar Colores
Edita las clases de Tailwind en `src/price-comparator.jsx`:
- Fondos: `bg-purple-600` → `bg-blue-600`
- Gradientes: `from-purple-900` → `from-blue-900`

### Agregar más tiendas predefinidas
Modifica el placeholder de las URLs en el componente

## 🐛 Solución de Problemas

**Error: "Failed to fetch"**
- Verifica tu conexión a internet
- Revisa que las URLs sean válidas
- Asegúrate de que la API de Claude esté disponible

**Precios no se muestran correctamente**
- Algunos sitios pueden bloquear scraping
- La IA hace su mejor esfuerzo, pero algunos productos pueden no encontrarse
- Intenta con URLs más específicas del producto

**Rate limiting**
- Si usas mucho la app, considera obtener tu propia API key
- Espera unos segundos entre consultas

## 💡 Mejoras Futuras Posibles

- [ ] Backend con Node.js para scraping más robusto
- [ ] Cache de resultados
- [ ] Historial de búsquedas
- [ ] Alertas de precio
- [ ] Más tiendas argentinas (Mercado Libre, Frávega, etc.)
- [ ] Comparación de productos similares
- [ ] Gráficos de evolución de precios

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:
1. Fork el repositorio
2. Crea una rama con tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📄 Licencia

MIT License - Usa este proyecto libremente

## 🆘 Soporte

Si tienes problemas o preguntas:
- Revisa la documentación de Vercel: https://vercel.com/docs
- Documentación de Claude API: https://docs.anthropic.com
- Documentación de Vite: https://vitejs.dev

---

Hecho con ❤️ en Argentina 🇦🇷
Trigger rebuild

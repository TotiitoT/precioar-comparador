# 🚀 Guía Rápida de Deploy - 5 Minutos

## Paso 1: Preparar los archivos (YA HECHO ✅)
Todos los archivos necesarios ya están creados.

## Paso 2: Subir a GitHub

### Opción A: Desde la terminal (si tienes Git instalado)
```bash
# Navega a la carpeta del proyecto
cd precioar-comparador

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Haz commit
git commit -m "Initial commit - PrecioAR"

# Crea un repositorio en GitHub (ve a github.com/new)
# Luego conecta tu repositorio local:
git remote add origin https://github.com/TU-USUARIO/precioar.git
git branch -M main
git push -u origin main
```

### Opción B: Desde la interfaz de GitHub (más fácil)
1. Ve a https://github.com/new
2. Crea un repositorio llamado "precioar"
3. Click en "uploading an existing file"
4. Arrastra TODOS los archivos del proyecto
5. Click en "Commit changes"

## Paso 3: Deploy en Vercel

1. **Regístrate en Vercel**
   - Ve a https://vercel.com/signup
   - Usa tu cuenta de GitHub para registrarte (más fácil)

2. **Importa tu proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio "precioar"
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configuración**
   - Framework Preset: Vite (autodetectado)
   - Build Command: `npm run build` (autodetectado)
   - Output Directory: `dist` (autodetectado)
   - ¡No necesitas cambiar nada!

4. **Deploy**
   - Click en "Deploy"
   - Espera 1-2 minutos ⏱️
   - ¡LISTO! 🎉

5. **Tu link**
   - Recibirás un link como: `https://precioar.vercel.app`
   - ¡Compártelo con quien quieras!

## ⚡ Deploy Express (sin GitHub)

Si quieres deployar SIN GitHub:

```bash
# Instala Vercel CLI
npm install -g vercel

# Navega a tu proyecto
cd precioar-comparador

# Deploy
vercel

# Sigue las instrucciones:
# - Set up and deploy? Yes
# - Which scope? (tu cuenta)
# - Link to existing project? No
# - Project name? precioar
# - Directory? ./
# - Override settings? No

# ¡Deploy automático! 🚀
```

## 🎯 Resultado Final

Después del deploy tendrás:
- ✅ Una URL pública accesible desde cualquier lugar
- ✅ HTTPS automático (seguro)
- ✅ Actualizaciones automáticas (si usas GitHub)
- ✅ Performance optimizada
- ✅ 100% gratis

## 📱 Acceder a tu App

Puedes acceder desde:
- 💻 Computadora
- 📱 Celular
- 🖥️ Tablet
- 🌍 Cualquier navegador

## 🔄 Hacer Cambios

Si usaste GitHub:
1. Modifica tus archivos localmente
2. Haz commit y push a GitHub
3. Vercel re-deployea automáticamente

Si usaste Vercel CLI:
```bash
# Haz tus cambios y luego:
vercel --prod
```

## 🆘 Problemas?

**Build failed?**
- Asegúrate de tener todos los archivos
- Verifica que package.json esté correcto

**No funciona la búsqueda?**
- Revisa la consola del navegador (F12)
- Puede ser rate limiting de la API

**Quiero mi propio dominio?**
- En Vercel: Settings → Domains
- Agrega tu dominio personalizado (ej: precioar.com.ar)

---

¿Listo para deployar? ¡Adelante! 🚀

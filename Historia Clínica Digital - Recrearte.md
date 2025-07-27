# Historia Clínica Digital - Recrearte

## Descripción
Aplicación web para completar historias clínicas digitales que genera automáticamente un PDF con el membrete oficial de Recrearte. Diseñada para funcionar completamente en OneDrive sin necesidad de servidor.

## Archivos Incluidos
- `historia_clinica.html` - Página principal de la aplicación
- `styles.css` - Estilos y diseño responsive
- `script.js` - Funcionalidad JavaScript
- `logo_recrearte.png` - Logo oficial de Recrearte
- `README.md` - Este archivo de documentación

## Instalación en OneDrive

### Paso 1: Subir Archivos
1. Accede a tu cuenta de OneDrive
2. Crea una nueva carpeta llamada "Historia_Clinica_Recrearte"
3. Sube todos los archivos a esta carpeta:
   - historia_clinica.html
   - styles.css
   - script.js
   - logo_recrearte.png

### Paso 2: Abrir la Aplicación
1. Haz clic derecho en el archivo `historia_clinica.html`
2. Selecciona "Abrir con" → "Navegador web" o "Abrir en navegador"
3. La aplicación se abrirá en tu navegador predeterminado

## Cómo Usar la Aplicación

### Navegación
- **Menú Lateral**: Haz clic en cualquier sección para navegar directamente
- **Botones de Navegación**: Usa "Anterior" y "Siguiente" para moverte paso a paso
- **Barra de Progreso**: Muestra tu avance en el formulario

### Completar el Formulario

#### Sección 1: Datos Personales
- Completa todos los campos marcados con asterisco (*) - son obligatorios
- La edad se calcula automáticamente al ingresar la fecha de nacimiento

#### Sección 2: Equipo Médico
- Ingresa información sobre médicos de referencia

#### Sección 3: Grupo Familiar
- Usa el botón "+" para agregar más familiares
- Usa el botón "-" para eliminar filas

#### Secciones 4-11: Información Médica
- Completa según corresponda
- Los campos de antropometría calculan automáticamente el IMC

#### Sección 12: Evaluación Final
- Completa la evaluación y recomendaciones
- Haz clic en "Generar PDF" para crear el documento final

### Funcionalidades Especiales

#### Auto-guardado
- Los datos se guardan automáticamente mientras escribes
- Si cierras la aplicación, los datos se mantienen para la próxima sesión

#### Validación
- Los campos obligatorios se marcan en rojo si están vacíos
- No puedes avanzar sin completar los campos requeridos

#### Cálculos Automáticos
- **Edad**: Se calcula automáticamente desde la fecha de nacimiento
- **IMC**: Se calcula automáticamente con peso y talla

#### Generación de PDF
- El PDF incluye el membrete oficial de Recrearte
- Se descarga automáticamente con el nombre del paciente y la fecha
- Formato profesional con todas las secciones completadas

## Compatibilidad

### Navegadores Soportados
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari

### Dispositivos
- ✅ Computadoras de escritorio
- ✅ Laptops
- ✅ Tablets
- ✅ Teléfonos móviles (diseño responsive)

## Resolución de Problemas

### El PDF no se genera
- Asegúrate de que tu navegador permita descargas
- Verifica que JavaScript esté habilitado
- Completa todos los campos obligatorios

### Los datos no se guardan
- Verifica que el almacenamiento local esté habilitado en tu navegador
- No uses modo incógnito/privado

### La aplicación no se ve correctamente
- Asegúrate de que todos los archivos estén en la misma carpeta
- Verifica que el archivo `logo_recrearte.png` esté presente

### Problemas en dispositivos móviles
- Usa el menú hamburguesa (☰) para navegar en pantallas pequeñas
- Rota el dispositivo a horizontal para mejor visualización de tablas

## Características Técnicas

### Tecnologías Utilizadas
- HTML5 para la estructura
- CSS3 con diseño responsive
- JavaScript vanilla para funcionalidad
- jsPDF para generación de documentos
- LocalStorage para persistencia de datos

### Seguridad y Privacidad
- Todos los datos se almacenan localmente en tu navegador
- No se envía información a servidores externos
- Los PDFs se generan completamente en tu dispositivo

## Soporte

Para soporte técnico o consultas sobre la aplicación, contacta al equipo de desarrollo.

---

**Desarrollado para Recrearte**  
*Historia Clínica Digital - Versión 1.0*


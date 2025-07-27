# Diseño de Estructura Web - Historia Clínica Recrearte

## Organización por Secciones

### 1. Encabezado
- Logo de Recrearte (extraído del membrete)
- Título: "Historia Clínica Digital"
- Fecha actual (auto-completada)
- Barra de progreso del formulario

### 2. Sección 1: Datos Personales
- Nombre y Apellido (campo de texto)
- Fecha de Nacimiento (selector de fecha)
- Edad (calculada automáticamente)
- DNI (campo numérico)
- Lugar de Nacimiento (campo de texto)
- Dirección Actual (campo de texto largo)
- Teléfono de Referencia (campo numérico)

### 3. Sección 2: Equipo Médico
- Equipo y/o Médicos de Referencia (área de texto)

### 4. Sección 3: Grupo Familiar
- Tabla dinámica con botones +/- para agregar/quitar filas
- Columnas: N°, Apellido y Nombre, Dirección, Teléfono, Referencia

### 5. Sección 4: Antecedentes
- Antecedentes Familiares (área de texto grande)
- Antecedentes Personales (área de texto grande)
- Intolerancias a Medicamentos (área de texto)

### 6. Sección 5: Información Laboral y Educativa
- Ocupación (campo de texto)
- Educación (campo de texto)

### 7. Sección 6: Vida Cotidiana
- Alimentación (área de texto)
- Sueño (área de texto)
- Actividad Física (área de texto)

### 8. Sección 7: Medicamentos y Vacunas
- Esquema de Vacunas (área de texto + opción de adjuntar archivo)
- Indicaciones de Medicamentos (área de texto)

### 9. Sección 8: Control y Seguimiento
- Fecha (selector de fecha)
- Telefónico (checkbox)
- Familiar/Personal (radio buttons)

### 10. Sección 9: Datos Vitales
- Tabla con campos: TA, T, FR, FC, SAT O2

### 11. Sección 10: Antropometría
- Peso, Talla, IMC, PC (campos numéricos)
- Cálculo automático de IMC

### 12. Sección 11: Examen por Aparatos
Subsecciones expandibles:
1. Desarrollo Psicomotriz (Motricidad, Lenguaje, Conducta Social)
2. Piel y Faneras
3. Audición
4. Visión
5. Pulmonar
6. Cardíaco
7. Abdominal
8. MMSS - MMII

### 13. Sección 12: Evaluación Final
- Evaluación General (área de texto grande)
- Recomendaciones (área de texto grande)
- Firma digital: "Milagros Quilici - MÉDICA"

## Características de Diseño

### Navegación
- Menú lateral fijo con las secciones
- Botones "Anterior" y "Siguiente" en cada sección
- Botón "Generar PDF" al final

### Validación
- Campos obligatorios marcados con asterisco
- Validación en tiempo real
- Mensajes de error claros
- No permitir avanzar sin completar campos obligatorios

### Responsive Design
- Diseño adaptable para móviles y tablets
- Menú colapsable en dispositivos pequeños
- Campos optimizados para touch

### Colores y Estilo
- Paleta de colores basada en el membrete de Recrearte
- Colores principales: azul, verde, naranja (del logo)
- Fondo blanco limpio
- Tipografía profesional y legible

### Funcionalidades Especiales
- Auto-guardado local (localStorage)
- Cálculo automático de edad e IMC
- Tabla dinámica para grupo familiar
- Secciones colapsables para mejor organización
- Vista previa antes de generar PDF


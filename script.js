// Variables globales
let currentSection = 1;
const totalSections = 12;
let familiarRowCount = 1;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    updateProgress();
    
    // Establecer fecha actual
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;
    
    // Cargar datos guardados si existen
    loadFormData();
});

// Configurar event listeners
function setupEventListeners() {
    // Navegación
    document.getElementById('prevBtn').addEventListener('click', previousSection);
    document.getElementById('nextBtn').addEventListener('click', nextSection);
    document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
    
    // Navegación por menú lateral
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionNumber = parseInt(this.dataset.section);
            goToSection(sectionNumber);
        });
    });
    
    // Toggle menú móvil
    document.getElementById('navToggle').addEventListener('click', function() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('show');
    });
    
    // Cálculo automático de edad
    document.getElementById('fechaNacimiento').addEventListener('change', calculateAge);
    
    // Cálculo automático de IMC
    document.getElementById('peso').addEventListener('input', calculateIMC);
    document.getElementById('talla').addEventListener('input', calculateIMC);
    
    // Auto-guardado
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('change', saveFormData);
        input.addEventListener('input', debounce(saveFormData, 1000));
    });
    
    // Validación en tiempo real
    const requiredInputs = document.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Inicializar formulario
function initializeForm() {
    showSection(currentSection);
    updateNavigationButtons();
}

// Mostrar sección específica
function showSection(sectionNumber) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar sección actual
    const currentSectionElement = document.getElementById(`seccion${sectionNumber}`);
    if (currentSectionElement) {
        currentSectionElement.classList.add('active');
    }
    
    // Actualizar navegación lateral
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (parseInt(link.dataset.section) === sectionNumber) {
            link.classList.add('active');
        }
    });
    
    currentSection = sectionNumber;
    updateProgress();
    updateNavigationButtons();
    
    // Scroll al top
    document.querySelector('.form-content').scrollTop = 0;
}

// Ir a sección específica
function goToSection(sectionNumber) {
    if (sectionNumber >= 1 && sectionNumber <= totalSections) {
        showSection(sectionNumber);
    }
}

// Sección anterior
function previousSection() {
    if (currentSection > 1) {
        showSection(currentSection - 1);
    }
}

// Sección siguiente
function nextSection() {
    if (validateCurrentSection()) {
        if (currentSection < totalSections) {
            showSection(currentSection + 1);
        }
    }
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    
    prevBtn.style.display = currentSection === 1 ? 'none' : 'inline-block';
    
    if (currentSection === totalSections) {
        nextBtn.style.display = 'none';
        generatePdfBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        generatePdfBtn.style.display = 'none';
    }
}

// Actualizar barra de progreso
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (currentSection / totalSections) * 100;
    progressFill.style.width = percentage + '%';
}

// Validar sección actual
function validateCurrentSection() {
    const currentSectionElement = document.getElementById(`seccion${currentSection}`);
    const requiredFields = currentSectionElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

// Validar campo individual
function validateField(event) {
    const field = event.target;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    // Validaciones específicas
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Ingrese un email válido');
        return false;
    }
    
    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        showFieldError(field, 'Ingrese un teléfono válido');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    if (field.hasAttribute('required') && field.value.trim()) {
        field.style.borderColor = '#28a745';
    } else {
        field.style.borderColor = '#e9ecef';
    }
}

// Calcular edad automáticamente
function calculateAge() {
    const birthDate = new Date(this.value);
    const today = new Date();
    
    if (birthDate && birthDate <= today && !isNaN(birthDate.getTime())) {
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        document.getElementById('edad').value = age;
    } else {
        document.getElementById('edad').value = '';
    }
}

// Calcular IMC automáticamente
function calculateIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const talla = parseFloat(document.getElementById('talla').value);
    
    if (peso && talla) {
        const tallaMts = talla / 100;
        const imc = peso / (tallaMts * tallaMts);
        document.getElementById('imc').value = imc.toFixed(2);
    }
}

// Agregar fila a tabla familiar
function addFamiliarRow() {
    familiarRowCount++;
    const tbody = document.getElementById('grupoFamiliarBody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${familiarRowCount}</td>
        <td><input type="text" name="familiar_nombre_${familiarRowCount}"></td>
        <td><input type="text" name="familiar_direccion_${familiarRowCount}"></td>
        <td><input type="tel" name="familiar_telefono_${familiarRowCount}"></td>
        <td><input type="text" name="familiar_referencia_${familiarRowCount}"></td>
        <td><button type="button" class="btn-remove" onclick="removeRow(this)">-</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Agregar event listeners a los nuevos campos
    const newInputs = newRow.querySelectorAll('input');
    newInputs.forEach(input => {
        input.addEventListener('change', saveFormData);
        input.addEventListener('input', debounce(saveFormData, 1000));
    });
}

// Remover fila de tabla familiar
function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
    
    // Reordenar números
    const rows = document.querySelectorAll('#grupoFamiliarBody tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
        
        // Actualizar nombres de los inputs
        const inputs = row.querySelectorAll('input');
        inputs[0].name = `familiar_nombre_${index + 1}`;
        inputs[1].name = `familiar_direccion_${index + 1}`;
        inputs[2].name = `familiar_telefono_${index + 1}`;
        inputs[3].name = `familiar_referencia_${index + 1}`;
    });
    
    familiarRowCount = rows.length;
}

// Guardar datos del formulario en localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById('historiaClinicaForm'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Guardar también datos de radio buttons y checkboxes
    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    radioButtons.forEach(radio => {
        data[radio.name] = radio.value;
    });
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        data[checkbox.name] = checkbox.checked;
    });
    
    localStorage.setItem('historiaClinicaData', JSON.stringify(data));
}

// Cargar datos del formulario desde localStorage
function loadFormData() {
    const savedData = localStorage.getItem('historiaClinicaData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        for (let [key, value] of Object.entries(data)) {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = value;
                } else if (field.type === 'radio') {
                    if (field.value === value) {
                        field.checked = true;
                    }
                } else {
                    field.value = value;
                }
            }
        }
    }
}

// Generar PDF
function generatePDF() {
    if (!validateAllSections()) {
        alert('Por favor complete todos los campos obligatorios antes de generar el PDF.');
        return;
    }
    
    // Cargar logo y generar PDF
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    
    logoImg.onload = function() {
        generatePDFWithLogo(this);
    };
    
    logoImg.onerror = function() {
        console.log('No se pudo cargar el logo, generando PDF sin logo');
        generatePDFWithLogo(null);
    };
    
    logoImg.src = 'logo_recrearte.png';
}

function generatePDFWithLogo(logoImage) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurar fuente
        doc.setFont('helvetica');
        
        let yPosition = 30;
        const pageHeight = doc.internal.pageSize.height;
        const marginLeft = 20;
        const marginRight = 20;
        const pageWidth = doc.internal.pageSize.width - marginLeft - marginRight;
        
        // Convertir logo a base64 si está disponible
        let logoBase64 = null;
        if (logoImage) {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = logoImage.width;
                canvas.height = logoImage.height;
                ctx.drawImage(logoImage, 0, 0);
                logoBase64 = canvas.toDataURL('image/png');
            } catch (error) {
                console.log('Error convirtiendo logo a base64:', error);
            }
        }
        
        // Función para agregar nueva página si es necesario
        function checkPageBreak(neededSpace = 20) {
            if (yPosition + neededSpace > pageHeight - 40) {
                doc.addPage();
                yPosition = 30;
                addSimpleHeader();
            }
        }
        
        // Función para agregar header simple
        function addSimpleHeader() {
            let titleX = marginLeft;
            
            // Agregar logo si está disponible
            if (logoBase64) {
                try {
                    const logoWidth = 25;
                    const logoHeight = 20; // Altura fija para mantener proporción
                    doc.addImage(logoBase64, 'PNG', marginLeft, yPosition - 5, logoWidth, logoHeight);
                    titleX = marginLeft + 30; // Mover título a la derecha del logo
                } catch (error) {
                    console.log('Error agregando logo al PDF:', error);
                }
            }
            
            // Título del documento
            doc.setFontSize(18);
            doc.setTextColor('#007bff');
            doc.setFont('helvetica', 'bold');
            doc.text('HISTORIA CLÍNICA', titleX, yPosition);
            
            // Fecha
            const fecha = document.getElementById('fecha').value;
            doc.setFontSize(12);
            doc.setTextColor('#000000');
            doc.setFont('helvetica', 'normal');
            doc.text(`Fecha: ${fecha}`, pageWidth - 30, yPosition);
            
            // Línea separadora
            doc.setDrawColor('#e9ecef');
            doc.line(marginLeft, yPosition + 10, pageWidth, yPosition + 10);
            
            yPosition += 25;
        }
        
        // Función para agregar sección
        function addSection(title, content) {
            checkPageBreak(30);
            
            // Título de sección
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor('#007bff');
            doc.text(title, marginLeft, yPosition);
            yPosition += 15;
            
            // Contenido
            doc.setTextColor('#000000');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            
            if (typeof content === 'object') {
                Object.entries(content).forEach(([key, value]) => {
                    if (value) {
                        checkPageBreak();
                        const text = `${key}: ${value}`;
                        const lines = doc.splitTextToSize(text, pageWidth);
                        lines.forEach(line => {
                            doc.text(line, marginLeft, yPosition);
                            yPosition += 5;
                        });
                    }
                });
            } else if (content) {
                const lines = doc.splitTextToSize(content, pageWidth);
                lines.forEach(line => {
                    checkPageBreak();
                    doc.text(line, marginLeft, yPosition);
                    yPosition += 5;
                });
            }
            
            yPosition += 8;
        }
        
        // Agregar header inicial
        addSimpleHeader();
        
        // Recopilar datos del formulario
        const formData = new FormData(document.getElementById('historiaClinicaForm'));
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Agregar datos de radio buttons y checkboxes
        const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
        radioButtons.forEach(radio => {
            data[radio.name] = radio.value;
        });
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            data[checkbox.name] = 'Sí';
        });
        
        // Generar contenido del PDF
        
        // Datos Personales
        addSection('DATOS PERSONALES', {
            'Nombre y Apellido': data.nombreApellido,
            'Fecha de Nacimiento': data.fechaNacimiento,
            'Edad': data.edad,
            'DNI': data.dni,
            'Lugar de Nacimiento': data.lugarNacimiento,
            'Dirección Actual': data.direccionActual,
            'Teléfono': data.telefono
        });
        
        // Equipo Médico
        if (data.equipoMedico) {
            addSection('EQUIPO Y/O MÉDICOS DE REFERENCIA', data.equipoMedico);
        }
        
        // Grupo Familiar
        checkPageBreak(30);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#007bff');
        doc.text('INTEGRANTES DEL GRUPO FAMILIAR', marginLeft, yPosition);
        yPosition += 15;
        
        // Tabla de familiares
        const familiarRows = document.querySelectorAll('#grupoFamiliarBody tr');
        if (familiarRows.length > 0) {
            familiarRows.forEach((row, index) => {
                const inputs = row.querySelectorAll('input');
                const nombre = inputs[0]?.value || '';
                const direccion = inputs[1]?.value || '';
                const telefono = inputs[2]?.value || '';
                const referencia = inputs[3]?.value || '';
                
                if (nombre || direccion || telefono || referencia) {
                    checkPageBreak();
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    doc.text(`${index + 1}. ${nombre} - ${direccion} - ${telefono} - ${referencia}`, marginLeft, yPosition);
                    yPosition += 6;
                }
            });
        }
        yPosition += 8;
        
        // Antecedentes
        if (data.antecedentesFamiliares) {
            addSection('ANTECEDENTES FAMILIARES DE RELEVANCIA', data.antecedentesFamiliares);
        }
        
        if (data.antecedentesPersonales) {
            addSection('ANTECEDENTES PERSONALES', data.antecedentesPersonales);
        }
        
        if (data.intoleranciaMedicamentos) {
            addSection('INTOLERANCIAS A MEDICAMENTOS', data.intoleranciaMedicamentos);
        }
        
        // Información Laboral y Educativa
        if (data.ocupacion || data.educacion) {
            addSection('INFORMACIÓN LABORAL Y EDUCATIVA', {
                'Ocupación': data.ocupacion,
                'Educación': data.educacion
            });
        }
        
        // Vida Cotidiana
        if (data.alimentacion || data.sueno || data.actividadFisica) {
            addSection('DATOS DE LA VIDA COTIDIANA', {
                'Alimentación': data.alimentacion,
                'Sueño': data.sueno,
                'Actividad Física': data.actividadFisica
            });
        }
        
        // Medicamentos y Vacunas
        if (data.esquemaVacunas || data.indicacionesMedicamentos) {
            addSection('MEDICAMENTOS Y VACUNAS', {
                'Esquema de Vacunas': data.esquemaVacunas,
                'Indicaciones de Medicamentos': data.indicacionesMedicamentos
            });
        }
        
        // Control y Seguimiento
        let controlInfo = '';
        if (data.fechaControl) controlInfo += `Fecha: ${data.fechaControl}`;
        if (data.telefonico) controlInfo += ' - Telefónico';
        if (data.tipoControl) controlInfo += ` - Tipo: ${data.tipoControl}`;
        
        if (controlInfo) {
            addSection('CONTROL Y SEGUIMIENTO', controlInfo);
        }
        
        // Datos Vitales
        if (data.ta || data.temperatura || data.fr || data.fc || data.satO2) {
            addSection('DATOS VITALES', {
                'TA': data.ta,
                'Temperatura': data.temperatura ? data.temperatura + '°C' : '',
                'FR': data.fr,
                'FC': data.fc,
                'SAT O2': data.satO2 ? data.satO2 + '%' : ''
            });
        }
        
        // Antropometría
        if (data.peso || data.talla || data.imc || data.pc) {
            addSection('ANTROPOMETRÍA', {
                'Peso': data.peso ? data.peso + ' kg' : '',
                'Talla': data.talla ? data.talla + ' cm' : '',
                'IMC': data.imc,
                'PC': data.pc ? data.pc + ' cm' : ''
            });
        }
        
        // Examen por Aparatos
        const examenData = {
            'Desarrollo Psicomotriz - Motricidad': data.motricidad,
            'Desarrollo Psicomotriz - Lenguaje': data.lenguaje,
            'Desarrollo Psicomotriz - Conducta Social': data.conductaSocial,
            'Piel y Faneras': data.pielFaneras,
            'Audición': data.audicion,
            'Visión': data.vision,
            'Pulmonar': data.pulmonar,
            'Cardíaco': data.cardiaco,
            'Abdominal': data.abdominal,
            'MMSS - MMII': data.mmssmmii
        };
        
        let hasExamenData = Object.values(examenData).some(value => value);
        if (hasExamenData) {
            addSection('EXAMEN POR APARATOS', examenData);
        }
        
        // Evaluación Final
        if (data.evaluacionGeneral) {
            addSection('EVALUACIÓN GENERAL', data.evaluacionGeneral);
        }
        
        if (data.recomendaciones) {
            addSection('RECOMENDACIONES', data.recomendaciones);
        }
        
        // Firma
        checkPageBreak(30);
        yPosition += 15;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Milagros Quilici', pageWidth - 50, yPosition);
        doc.setFont('helvetica', 'bold');
        doc.text('MÉDICA', pageWidth - 50, yPosition + 10);
        
        // Pie de página con leyenda de Recrearte
        checkPageBreak(30);
        yPosition = pageHeight - 25;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#007bff');
        doc.text('RECREARTE - CENTRO EDUCATIVO TERAPÉUTICO', doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#666666');
        doc.text('BUENOS AIRES 1950 - FUNES - SANTA FE', doc.internal.pageSize.width / 2, yPosition + 8, { align: 'center' });
        
        // Descargar PDF
        const nombrePaciente = data.nombreApellido || 'Historia_Clinica';
        const fechaHoy = new Date().toISOString().split('T')[0];
        const fileName = `${nombrePaciente.replace(/\s+/g, '_')}_${fechaHoy}.pdf`;
        
        doc.save(fileName);
        
        alert('PDF generado correctamente' + (logoBase64 ? ' con logo' : ' sin logo'));
        
    } catch (error) {
        console.error('Error generando PDF:', error);
        alert('Error al generar el PDF: ' + error.message);
    }
}

// Validar todas las secciones
function validateAllSections() {
    let isValid = true;
    
    for (let i = 1; i <= totalSections; i++) {
        const section = document.getElementById(`seccion${i}`);
        const requiredFields = section.querySelectorAll('input[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
    }
    
    return isValid;
}

// Funciones de utilidad
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Limpiar formulario
function clearForm() {
    if (confirm('¿Está seguro de que desea limpiar todo el formulario? Esta acción no se puede deshacer.')) {
        // Limpiar todos los campos del formulario
        const form = document.getElementById('historiaClinicaForm');
        form.reset();
        
        // Limpiar campos específicos
        document.getElementById('edad').value = '';
        document.getElementById('imc').value = '';
        
        // Limpiar tabla de grupo familiar (dejar solo una fila)
        const tbody = document.getElementById('grupoFamiliarBody');
        tbody.innerHTML = `
            <tr>
                <td>1</td>
                <td><input type="text" name="familiar_nombre_1"></td>
                <td><input type="text" name="familiar_direccion_1"></td>
                <td><input type="tel" name="familiar_telefono_1"></td>
                <td><input type="text" name="familiar_referencia_1"></td>
                <td><button type="button" class="btn-remove" onclick="removeRow(this)">-</button></td>
            </tr>
        `;
        familiarRowCount = 1;
        
        // Limpiar localStorage
        localStorage.removeItem('historiaClinicaData');
        
        // Establecer fecha actual
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('fecha').value = today;
        
        // Volver a la primera sección
        showSection(1);
        
        // Limpiar errores de validación
        const errorDivs = document.querySelectorAll('.field-error');
        errorDivs.forEach(div => div.remove());
        
        // Resetear estilos de campos
        const allInputs = document.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.style.borderColor = '#e9ecef';
        });
        
        // Configurar event listeners para los nuevos campos de la tabla familiar
        const newInputs = tbody.querySelectorAll('input');
        newInputs.forEach(input => {
            input.addEventListener('change', saveFormData);
            input.addEventListener('input', debounce(saveFormData, 1000));
        });
        
        alert('Formulario limpiado correctamente. Puede comenzar una nueva historia clínica.');
    }
}


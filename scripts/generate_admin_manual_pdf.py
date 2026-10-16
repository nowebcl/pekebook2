import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Canvas de doble pasada para calcular el total exacto de páginas
    y renderizar encabezados y pies de página minimalistas elegantes.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber > 1:
            self.saveState()
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            
            # Encabezado minimalista
            self.drawString(54, 750, "PEKEBOOK • MANUAL DEL ADMINISTRADOR & GUÍA DE GESTIÓN WEB")
            self.drawRightString(558, 750, "PANEL PRIVADO DE CONTROL")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.6)
            self.line(54, 742, 558, 742)
            
            # Pie de página minimalista
            self.line(54, 45, 558, 45)
            self.drawString(54, 32, "PekeBook Librería & Bazar • Puerto Montt • https://pekebook.cl/admin")
            self.drawRightString(558, 32, f"Página {self._pageNumber} de {page_count}")
            self.restoreState()

def build_admin_manual():
    desktop_path = r"C:\Users\NOWEB  DESKTOP\Desktop"
    output_filename = os.path.join(desktop_path, "MANUAL_ADMINISTRADOR_PEKEBOOK.pdf")
    
    print(f"Generando manual PDF en: {output_filename}")
    
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=60,
        bottomMargin=55
    )
    
    USABLE_WIDTH = 504
    styles = getSampleStyleSheet()
    
    # Paleta de colores minimalista clean
    C_TITLE = colors.HexColor("#0F172A")    # Slate 900
    C_TEXT = colors.HexColor("#334155")     # Slate 700
    C_MUTED = colors.HexColor("#64748B")    # Slate 500
    C_ACCENT = colors.HexColor("#EE2B91")   # PekeBook Pink
    C_LINE = colors.HexColor("#E2E8F0")     # Slate 200
    C_BG_SOFT = colors.HexColor("#F8FAFC")  # Slate 50
    C_BG_HIGHLIGHT = colors.HexColor("#FFF1F8") # Pink 50
    C_SUCCESS = colors.HexColor("#059669")  # Emerald 600
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=C_TITLE,
        spaceAfter=8
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=17,
        textColor=C_MUTED,
        spaceAfter=18
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=20,
        textColor=C_TITLE,
        spaceBefore=14,
        spaceAfter=9,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=16,
        textColor=C_ACCENT,
        spaceBefore=11,
        spaceAfter=5,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=C_TEXT,
        spaceAfter=7
    )
    
    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=C_ACCENT
    )
    
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=C_TEXT
    )
    
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=C_TITLE
    )
    
    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=C_TITLE
    )

    story = []

    # =========================================================================
    # PÁGINA 1: PORTADA EJECUTIVA MINIMAL CLEAN
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph(
        '<font color="#EE2B91"><b>PEKEBOOK</b></font> &nbsp;|&nbsp; PANEL DE ADMINISTRACIÓN WEB &amp; GESTIÓN DE CATÁLOGO',
        badge_style
    ))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("MANUAL DE ADMINISTRACIÓN Y GESTIÓN DE PRODUCTOS", title_style))
    story.append(Paragraph(
        "Guía oficial, paso a paso y fácil de entender para el administrador de PekeBook. "
        "Aprende a ingresar al panel privado, añadir productos, actualizar precios, cambiar stock "
        "y subir imágenes que se optimizan automáticamente al menor tamaño posible.",
        subtitle_style
    ))
    
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_ACCENT, spaceAfter=14))
    
    # Ficha de metadatos de acceso
    access_data = [
        [Paragraph("<b>Enlace de Acceso:</b>", table_cell_bold), Paragraph("<code>https://pekebook.cl/admin</code> (o <code>/#admin</code>)", table_cell),
         Paragraph("<b>Usuario Administrador:</b>", table_cell_bold), Paragraph("<code>contacto@pekebook.cl</code>", table_cell)],
        [Paragraph("<b>Contraseña Oficial:</b>", table_cell_bold), Paragraph("<code>Peke#2026!Book</code>", table_cell),
         Paragraph("<b>Tipo de Panel:</b>", table_cell_bold), Paragraph("Privado • Página Completa (Fondo Blanco)", table_cell)],
        [Paragraph("<b>Compatibilidad:</b>", table_cell_bold), Paragraph("PC, Mac, Notebook, Tablet y Smartphone", table_cell),
         Paragraph("<b>Versión Manual:</b>", table_cell_bold), Paragraph("Edición 2026 • Oficial", table_cell)],
    ]
    t_access = Table(access_data, colWidths=[105, 155, 110, 134])
    t_access.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_LINE),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_access)
    story.append(Spacer(1, 14))
    
    # Caja destacada de bienvenida
    welcome_text = """
    <b>BIENVENIDO A TU PANEL DE CONTROL PEKEBOOK:</b><br/>
    Este sistema fue diseñado exclusivamente para ti, con una interfaz <b>limpia, rápida y sin complejidades técnicas</b>. 
    No necesitas saber programación ni manejar bases de datos. Todo cambio que hagas (precios, stock, nuevos artículos o fotos) 
    <b>se refleja de inmediato y en tiempo real en la tienda que ven tus clientes</b>, sin demoras y sin problemas de caché.
    """
    t_welcome = Table([[Paragraph(welcome_text, body_style)]], colWidths=[USABLE_WIDTH])
    t_welcome.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_HIGHLIGHT),
        ('BOX', (0,0), (-1,-1), 1, C_ACCENT),
        ('TOPPADDING', (0,0), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,-1), 9),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_welcome)
    story.append(Spacer(1, 14))
    
    story.append(Paragraph("<b>CONTENIDO DE ESTE MANUAL:</b>", h2_style))
    manual_index = [
        "<b>1. Cómo Ingresar al Panel Privado:</b> URL, inicio de sesión seguro y salida.",
        "<b>2. Recorrido por el Panel de Control:</b> Métricas, buscador en vivo y filtros rápidos.",
        "<b>3. Cambiar Stock y Destacados en 1 Clic:</b> Control instantáneo de disponibilidad.",
        "<b>4. Cómo Añadir un Producto Nuevo:</b> Paso a paso para publicar artículos en el catálogo.",
        "<b>5. El Optimizador Automático de Fotos:</b> Cómo subir imágenes pesadas que se comprimen solas a WebP.",
        "<b>6. Cómo Modificar y Eliminar Productos:</b> Edición de datos existentes y borrado seguro."
    ]
    for item in manual_index:
        story.append(Paragraph(f"• {item}", body_style))
        story.append(Spacer(1, 1.5))
        
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 2: ACCESO Y SEGURIDAD DEL PANEL
    # =========================================================================
    story.append(Paragraph("1. Cómo Ingresar al Panel de Administración", h1_style))
    story.append(Paragraph(
        "El sistema de administración de PekeBook <b>no está visible para los clientes en el frontend</b>. "
        "No existe ningún botón público ni pop-up invasivo en la tienda. Para ingresar, debes utilizar tu enlace privado:",
        body_style
    ))
    
    story.append(Paragraph("A. Enlace Particular de Acceso:", h2_style))
    story.append(Paragraph(
        "Abre cualquier navegador web (Chrome, Edge, Safari, Firefox o tu teléfono móvil) y escribe en la barra de direcciones:<br/>"
        "👉 <b><code>https://pekebook.cl/admin</code></b><br/>"
        "<i>(Nota: Si alguna vez tu conexión tiene problemas de caché, también puedes ingresar mediante <code>https://pekebook.cl/#admin</code>)</i>.",
        body_style
    ))
    
    story.append(Spacer(1, 6))
    story.append(Paragraph("B. Tus Credenciales Oficiales de Administrador:", h2_style))
    
    cred_table_data = [
        [Paragraph("<b>Campo</b>", table_header), Paragraph("<b>Dato a Ingresar</b>", table_header), Paragraph("<b>Detalle &amp; Recomendación</b>", table_header)],
        [Paragraph("<b>Correo / Usuario</b>", table_cell_bold), Paragraph("<code>contacto@pekebook.cl</code>", table_cell_bold), Paragraph("Es tu correo administrativo oficial de PekeBook.", table_cell)],
        [Paragraph("<b>Contraseña</b>", table_cell_bold), Paragraph("<code>Peke#2026!Book</code>", table_cell_bold), Paragraph("Contraseña segura. Puedes hacer clic en el ícono del ojo 👁️ para verificar lo que escribes.", table_cell)]
    ]
    t_cred = Table(cred_table_data, colWidths=[120, 160, 224])
    t_cred.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_LINE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_cred)
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("C. Navegación entre el Panel y la Tienda:", h2_style))
    story.append(Paragraph(
        "• <b>Para ver la tienda pública:</b> En la esquina superior derecha del panel encontrarás el botón <b>'Ver Tienda'</b>. "
        "Al presionarlo, irás directo a la vitrina como la ve cualquier cliente.<br/>"
        "• <b>Para cerrar sesión:</b> Presiona el botón rojo <b>'Salir'</b>. Tu sesión se cerrará de forma segura y nadie más "
        "que use ese computador podrá modificar productos sin ingresar la contraseña.",
        body_style
    ))
    
    story.append(Spacer(1, 8))
    sec_box = [
        [
            Paragraph("<b>SEGURIDAD &amp; PRIVACIDAD DE DATOS:</b><br/>"
                      "La conexión con el panel viaja con <b>cifrado TLS 1.3 de grado bancario</b>. "
                      "Tus contraseñas no se almacenan en texto plano en la aplicación ni son visibles para los compradores. "
                      "Los clientes solo tienen permiso de lectura para ver el catálogo y comprar.", body_style)
        ]
    ]
    t_sec = Table(sec_box, colWidths=[USABLE_WIDTH])
    t_sec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('TOPPADDING', (0,0), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,-1), 9),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('LINELEFT', (0,0), (0,-1), 3, C_SUCCESS),
    ]))
    story.append(t_sec)
    
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 3: PANEL DE CONTROL Y GESTIÓN EN 1 CLIC
    # =========================================================================
    story.append(Paragraph("2. Recorrido por el Panel de Control &amp; Acciones en 1 Clic", h1_style))
    story.append(Paragraph(
        "Al iniciar sesión, verás una pantalla blanca, moderna y despejada. "
        "Todo está pensado para que encuentres cualquier producto en segundos y puedas actualizar su estado inmediatamente.",
        body_style
    ))
    
    story.append(Paragraph("A. Tarjetas de Resumen en la Cabecera (KPIs):", h2_style))
    story.append(Paragraph(
        "En la parte superior tienes 4 contadores que se actualizan solos:<br/>"
        "• <b>Total Catálogo:</b> Cantidad total de productos en tu base de datos (actualmente 238 productos cargados).<br/>"
        "• <b>En Stock Activo:</b> Productos listos para comprar con botón de añadir al carrito activo.<br/>"
        "• <b>Destacados:</b> Productos que aparecen en la vitrina de la página principal.<br/>"
        "• <b>En Oferta:</b> Productos con descuentos promocionales o precio rebajado.",
        body_style
    ))
    
    story.append(Spacer(1, 6))
    story.append(Paragraph("B. Buscador Inteligente en Tiempo Real:", h2_style))
    story.append(Paragraph(
        "En la barra central puedes escribir cualquier término: por ejemplo <i>'tazón'</i>, <i>'anillo'</i>, <i>'sublimación'</i> o <i>'opalina'</i>. "
        "<b>No necesitas presionar Enter</b>: la lista se filtra instantáneamente mientras escribes. "
        "También puedes filtrar por categorías desplegables (Sublimación, Encuadernación, Librería, Bazar, Kits, etc.).",
        body_style
    ))
    
    story.append(Spacer(1, 6))
    story.append(Paragraph("C. Las Acciones Rápidas en 1 Clic (¡Sin formularios!):", h2_style))
    
    actions_data = [
        [
            Paragraph("<b>Acción</b>", table_header),
            Paragraph("<b>Dónde hacer clic</b>", table_header),
            Paragraph("<b>Qué ocurre de inmediato</b>", table_header)
        ],
        [
            Paragraph("<b>Cambiar Stock<br/>(Disponible / Agotado)</b>", table_cell_bold),
            Paragraph("Haz clic en la píldora verde <b>'Disponible'</b> o gris <b>'Agotado'</b> en la columna de Stock.", table_cell),
            Paragraph("Cambia de estado al instante en la base de datos. Si lo dejas en <i>Agotado</i>, el cliente no podrá añadirlo al carrito hasta que vuelvas a habilitarlo.", table_cell)
        ],
        [
            Paragraph("<b>Destacar Producto<br/>en Vitrina</b>", table_cell_bold),
            Paragraph("Haz clic en el ícono de la <b>Estrella ⭐</b> en la columna de Destacado.", table_cell),
            Paragraph("Si la estrella está dorada, el producto saldrá entre los primeros de la página de inicio. Si está apagada, se mostrará en su categoría normal.", table_cell)
        ],
        [
            Paragraph("<b>Editar Todo el Producto</b>", table_cell_bold),
            Paragraph("Haz clic en el ícono del <b>Lápiz ✏️</b> en la columna de Acciones.", table_cell),
            Paragraph("Se abrirá la ventana limpia de edición con todos los datos cargados para cambiar precios, descripción o la foto.", table_cell)
        ],
        [
            Paragraph("<b>Eliminar Producto</b>", table_cell_bold),
            Paragraph("Haz clic en el ícono del <b>Basurero 🗑️</b>.", table_cell),
            Paragraph("Aparecerá un mensaje de confirmación para evitar borrados por error. Al confirmar, se elimina de forma permanente.", table_cell)
        ]
    ]
    t_actions = Table(actions_data, colWidths=[125, 160, 219])
    t_actions.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_LINE),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_actions)
    
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 4: CÓMO AÑADIR UN PRODUCTO NUEVO
    # =========================================================================
    story.append(Paragraph("3. Cómo Añadir un Producto Nuevo Paso a Paso", h1_style))
    story.append(Paragraph(
        "Para ingresar un nuevo artículo al catálogo de PekeBook, sigue estos sencillos pasos desde el panel:",
        body_style
    ))
    
    story.append(Paragraph("Paso 1: Abrir la Ventana de Creación", h2_style))
    story.append(Paragraph(
        "En la parte superior derecha de la tabla, presiona el botón rosa <b>'+ Añadir Producto'</b>. "
        "Se abrirá una ventana limpia con todos los campos necesarios.",
        body_style
    ))
    
    story.append(Paragraph("Paso 2: Completar los Datos Principales", h2_style))
    
    fields_data = [
        [Paragraph("<b>Campo en el Formulario</b>", table_header), Paragraph("<b>Obligatorio</b>", table_header), Paragraph("<b>Explicación &amp; Ejemplo de Uso</b>", table_header)],
        [
            Paragraph("<b>Nombre del Producto</b>", table_cell_bold),
            Paragraph("<b>SÍ</b>", table_cell_bold),
            Paragraph("Título claro que leerán los clientes. Ej: <i>'Tazón Mágico 11 oz Negro Sublimable'</i>.", table_cell)
        ],
        [
            Paragraph("<b>Categoría</b>", table_cell_bold),
            Paragraph("<b>SÍ</b>", table_cell_bold),
            Paragraph("Elige en el menú: <i>Sublimación</i>, <i>Encuadernación</i>, <i>Librería</i>, <i>Bazar</i> o <i>Kits Emprende</i>.", table_cell)
        ],
        [
            Paragraph("<b>Precio de Venta ($ CLP)</b>", table_cell_bold),
            Paragraph("<b>SÍ</b>", table_cell_bold),
            Paragraph("Valor real en pesos chilenos que pagará el cliente. Ej: <code>1500</code>.", table_cell)
        ],
        [
            Paragraph("<b>Precio Normal / Original</b>", table_cell_bold),
            Paragraph("Opcional", table_cell),
            Paragraph("Si el producto está rebajado, pon el precio anterior tachado (Ej: <code>1800</code>). Así se verá el descuento.", table_cell)
        ],
        [
            Paragraph("<b>Fotografía del Producto</b>", table_cell_bold),
            Paragraph("Recomendado", table_cell),
            Paragraph("Haz clic en el recuadro punteado o arrastra la foto desde tu computador o teléfono. <b>El sistema la optimiza solo</b>.", table_cell)
        ],
        [
            Paragraph("<b>Casillas de Estado</b>", table_cell_bold),
            Paragraph("Opcional", table_cell),
            Paragraph("Marca las casillas según corresponda: <b>En Stock</b> (activada por defecto), <b>Destacado</b>, <b>En Oferta</b> o <b>Mayorista</b>.", table_cell)
        ],
        [
            Paragraph("<b>Etiqueta (Badge)</b>", table_cell_bold),
            Paragraph("Opcional", table_cell),
            Paragraph("Texto corto flotante sobre la foto. Ej: <i>'MÁS VENDIDO'</i>, <i>'NUEVO'</i> o <i>'20% DCTO'</i>.", table_cell)
        ],
        [
            Paragraph("<b>Descripción</b>", table_cell_bold),
            Paragraph("Opcional", table_cell),
            Paragraph("Detalles sobre medidas, material, colores o recomendaciones de uso.", table_cell)
        ]
    ]
    t_fields = Table(fields_data, colWidths=[130, 75, 299])
    t_fields.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_LINE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_fields)
    
    story.append(Spacer(1, 8))
    story.append(Paragraph("Paso 3: Guardar", h2_style))
    story.append(Paragraph(
        "Presiona el botón rosa <b>'Crear Producto'</b> al final de la ventana. "
        "El sistema subirá los datos y la imagen optimizada a la base de datos y verás una notificación verde: "
        "<i>'Nuevo producto creado con éxito'</i>. El producto ya estará publicado en tu tienda de inmediato.",
        body_style
    ))
    
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 5: EL OPTIMIZADOR AUTOMÁTICO DE IMÁGENES
    # =========================================================================
    story.append(Paragraph("4. El Optimizador Automático de Fotos (WebP)", h1_style))
    story.append(Paragraph(
        "Uno de los mayores problemas en tiendas online es que las fotos tomadas con celulares modernos pesan entre <b>3 MB y 8 MB</b>, "
        "lo que hace que la página cargue lenta y consuma los datos móviles de los clientes. "
        "En PekeBook construimos un **compresor inteligente integrado** para resolver esto por completo:",
        body_style
    ))
    
    story.append(Paragraph("A. ¿Cómo funciona la compresión automática?", h2_style))
    story.append(Paragraph(
        "1. <b>Tú solo eliges la foto:</b> Puedes subir cualquier imagen JPG o PNG, incluso fotos pesadas tomadas directo con tu celular.<br/>"
        "2. <b>El sistema trabaja por ti en segundos:</b> Antes de subirla a la base de datos, el navegador de PekeBook:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;• Re-escala la imagen a la dimensión ideal de e-commerce (máx. 900×900 px).<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;• La convierte al formato moderno <b>WebP</b> (el formato recomendado por Google).<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;• Reduce el peso del archivo entre un <b>90% y un 98%</b> (dejándola en un promedio ultra-liviano de ~40 KB a 60 KB).<br/>"
        "3. <b>Resultado:</b> Tu tienda carga a la velocidad del rayo tanto en celulares como en computadores, "
        "y la imagen se ve nítida y cristalina.",
        body_style
    ))
    
    story.append(Spacer(1, 6))
    story.append(Paragraph("B. Ejemplo del Reporte Visual que Verás en Pantalla:", h2_style))
    
    comp_box = [
        [
            Paragraph("<b>✅ IMAGEN OPTIMIZADA CON ÉXITO (Ejemplo Real):</b><br/>"
                      "• <b>Tamaño original de tu foto:</b> 3.4 MB (3.480 KB)<br/>"
                      "• <b>Tamaño final optimizado:</b> <b>48 KB</b> (Ahorro del <b>98.6%</b>)<br/>"
                      "• <b>Resolución adaptada:</b> 900 × 900 px (Perfecta para zoom y vitrina)<br/>"
                      "• <b>Formato:</b> WebP progresivo de alta calidad visual", body_style)
        ]
    ]
    t_comp = Table(comp_box, colWidths=[USABLE_WIDTH])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_HIGHLIGHT),
        ('BOX', (0,0), (-1,-1), 1, C_ACCENT),
        ('TOPPADDING', (0,0), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,-1), 9),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_comp)
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("C. Consejos para Sacar Buenas Fotos de Productos:", h2_style))
    story.append(Paragraph(
        "• <b>Luz natural:</b> Fotografía los tazones, botellas o cuadernos cerca de una ventana o con luz blanca pareja.<br/>"
        "• <b>Fondo limpio:</b> Usa un fondo blanco o liso para que los colores del estampado resalten.<br/>"
        "• <b>No necesitas programas de edición:</b> No pierdas tiempo achicando fotos en Photoshop ni aplicaciones externas; "
        "el panel de PekeBook se encarga de todo el trabajo técnico.",
        body_style
    ))
    
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 6: MODIFICACIÓN, ELIMINACIÓN Y SOPORTE
    # =========================================================================
    story.append(Paragraph("5. Modificación, Eliminación &amp; Preguntas Frecuentes", h1_style))
    story.append(Paragraph(
        "Aquí aprenderás cómo editar artículos existentes cuando cambien los precios y cómo eliminar productos que ya no vendas:",
        body_style
    ))
    
    story.append(Paragraph("A. Cómo Modificar un Producto ya Existente:", h2_style))
    story.append(Paragraph(
        "1. Busca el producto en el buscador del panel (ej: <i>'Tazón Blanco 11 oz'</i>).<br/>"
        "2. Haz clic en el ícono del <b>Lápiz ✏️</b> a la derecha de la fila.<br/>"
        "3. Se abrirá la ventana con todos sus datos actuales cargados.<br/>"
        "4. Cambia el dato que necesites (ejemplo: subir o bajar el precio, corregir el nombre o cambiar la foto).<br/>"
        "5. Presiona <b>'Guardar Cambios'</b>. La actualización se guarda inmediatamente en la base de datos.",
        body_style
    ))
    
    story.append(Spacer(1, 6))
    story.append(Paragraph("B. Cómo Eliminar un Producto de Forma Segura:", h2_style))
    story.append(Paragraph(
        "1. En la fila del producto que quieras borrar, haz clic en el ícono del <b>Basurero 🗑️</b>.<br/>"
        "2. Aparecerá una ventana de confirmación preguntando: <i>¿Eliminar producto definitivamente?</i>.<br/>"
        "3. Si estás seguro, presiona el botón rojo <b>'Eliminar Definitivamente'</b>. "
        "El producto se borrará por completo de la base de datos y desaparecerá de la tienda.<br/>"
        "<i>(Tip: Si solo te quedaste sin stock temporalmente, NO lo elimines: simplemente haz clic en el botón de Stock para marcarlo como 'Agotado' y así no perderás los datos cuando vuelvas a tener stock).</i>",
        body_style
    ))
    
    story.append(Spacer(1, 8))
    story.append(Paragraph("C. Preguntas Frecuentes del Administrador (FAQ):", h2_style))
    
    faq_data = [
        [
            Paragraph("<b>Pregunta</b>", table_header),
            Paragraph("<b>Respuesta Rápida</b>", table_header)
        ],
        [
            Paragraph("<b>¿Por qué no veo un botón de admin en la tienda?</b>", table_cell_bold),
            Paragraph("Por seguridad y estética: para que los clientes vean una tienda 100% limpia. Solo tú sabes que ingresando a <code>pekebook.cl/admin</code> puedes entrar a la gestión.", table_cell)
        ],
        [
            Paragraph("<b>¿Si cierro el navegador se pierde lo que hice?</b>", table_cell_bold),
            Paragraph("No. Cada vez que presionas 'Guardar', los datos viajan directamente a la base de datos permanente en la nube. Todo queda guardado de por vida.", table_cell)
        ],
        [
            Paragraph("<b>¿Puedo entrar desde mi teléfono celular?</b>", table_cell_bold),
            Paragraph("Sí, 100%. El panel de administración es totalmente responsivo y se adapta a la pantalla de cualquier smartphone para que puedas cambiar precios o stock desde la misma tienda física.", table_cell)
        ]
    ]
    t_faq = Table(faq_data, colWidths=[170, 334])
    t_faq.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('INNERGRID', (0,0), (-1,-1), 0.5, C_LINE),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_faq)
    
    story.append(Spacer(1, 14))
    # Tarjeta de soporte
    support_box = [
        [
            Paragraph("<b>RESUMEN DE ACCESO RÁPIDO:</b><br/>"
                      "• <b>URL:</b> https://pekebook.cl/admin<br/>"
                      "• <b>Usuario:</b> contacto@pekebook.cl<br/>"
                      "• <b>Clave:</b> Peke#2026!Book", table_cell),
            Paragraph("<b>SUCURSALES PEKEBOOK:</b><br/>"
                      "• La Vara: Av. Los Fundadores 1058, 2do piso<br/>"
                      "• Alerce: Centro Comercial Alerce, Local 7<br/>"
                      "• Puerto Montt, Región de Los Lagos", table_cell)
        ]
    ]
    t_supp = Table(support_box, colWidths=[252, 252])
    t_supp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_BG_SOFT),
        ('BOX', (0,0), (-1,-1), 0.5, C_LINE),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('LINELEFT', (0,0), (0,-1), 3, C_ACCENT),
    ]))
    story.append(t_supp)
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print("EXITO: Manual del Administrador compilado.")
    return output_filename

if __name__ == '__main__':
    path = build_admin_manual()
    print(f"Ruta final del archivo: {path}")

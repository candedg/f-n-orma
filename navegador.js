// ============================================================================
//  f‑n‑orma – navegador.js
//  ---------------------------------------------------------------------------
//  ▸ Este archivo define tres clases clave para la navegación y la interactividad
//    global de la app p5.js:
//       1. Navegador –  sistema de pantallas
//       2. Pantalla  –  clase base 
//       3. Boton     –  componente UI reutilizable con interacción hover/clic
// ============================================================================

// -----------------------------------------------------------------------------
// 1.  Navegador – Gestor de pantallas
// -----------------------------------------------------------------------------
class Navegador {
    constructor() {
        // Array que contendrá instancias de Pantalla
        this.pantallas = [];

        // Índice de la pantalla actualmente activa en el array
        this.indicePantalla = null;

        // Referencia directa a la pantalla activa
        this.pantallaActual = null;
    }

    // ---------------------------------------------------------
    //  Registrar una nueva pantalla en el navegador
    //  — Si es la primera, se activa automáticamente
    // ---------------------------------------------------------
    agregarPantalla(p) {
        this.pantallas.push(p);
        if (!this.pantallaActual) {
            this.indicePantalla = 0;
            this.pantallaActual = p;
        }
    }

    // ---------------------------------------------------------
    //  Avanzar a la siguiente pantalla (ciclo circular)
    // ---------------------------------------------------------
    siguientePantalla() {
        const i = (this.indicePantalla + 1) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    // ---------------------------------------------------------
    //  Retroceder a la pantalla anterior (ciclo circular)
    // ---------------------------------------------------------
    previaPantalla() {
        const i = (this.indicePantalla - 1 + this.pantallas.length) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    // ---------------------------------------------------------
    //  Seleccionar una pantalla por índice
    //  — Se valida el rango para evitar errores.
    // ---------------------------------------------------------
    selectPantalla(num) {
        if (num >= 0 && num < this.pantallas.length) {
            this.indicePantalla = num;
            this.pantallaActual = this.pantallas[num];
        } else {
            print("Índice de pantalla no válido: " + num);
        }
    }
}

// -----------------------------------------------------------------------------
// 2.  Pantalla (clase base)
// -----------------------------------------------------------------------------
//    ▸ Funciona como interfaz: Se define vacía para heredar.
// -----------------------------------------------------------------------------
class Pantalla {
    constructor() {
    }
}

// -----------------------------------------------------------------------------
// 3.  Boton – Componente interactivo reutilizable
// -----------------------------------------------------------------------------
class Boton {
    constructor(
        texto, x, y, ancho, alto, borde,
        colorFondo, colorTexto,
        colorFondoHover, colorTextoHover,
        accion
    ) {
        // Propiedades de estilo y posición
        this.texto = texto;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.borde = borde;

        // Colores
        this.colorFondo = colorFondo;
        this.colorTexto = colorTexto;
        this.colorFondoHover = colorFondoHover;
        this.colorTextoHover = colorTextoHover;

        // Interacción
        this.accion = accion;  // Función callback
        this.hover = false;   // ¿Está el mouse encima?
        this.escalaHover = 1.03;    // Factor de scale al hacer hover
    }

    // Render del botón (se llama desde draw())
    draw() {
        // 1. Detectar si el mouse está sobre el botón
        this.hover = mouseX >= this.x && mouseX <= this.x + this.ancho &&
            mouseY >= this.y && mouseY <= this.y + this.alto;

        // 2. Ajustar tamaño/posición si hay hover (efecto "zoom")
        let anchoFinal = this.ancho;
        let altoFinal = this.alto;
        let xFinal = this.x;
        let yFinal = this.y;

        if (this.hover) {
            anchoFinal *= this.escalaHover;
            altoFinal *= this.escalaHover;
            xFinal = this.x - (anchoFinal - this.ancho) / 2;
            yFinal = this.y - (altoFinal - this.alto) / 2;

            // Dibujar sombra "blur" suave (simulado con múltiples rectángulos)
            fill(242, 126, 99, 64); // #F27E63 con 25 % de opacidad
            noStroke();
            for (let i = 0; i < 5; i++) {
                const offset = i * 2;
                rect(xFinal - offset, yFinal - offset,
                    anchoFinal + offset * 2, altoFinal + offset * 2, this.borde);
            }
        }

        // 3. Dibujar cuerpo del botón
        fill(this.hover ? this.colorFondoHover : this.colorFondo);
        stroke(this.hover ? this.colorFondoHover : this.colorFondo);
        strokeWeight(2);
        rect(xFinal, yFinal, anchoFinal, altoFinal, this.borde);

        // 4. Dibujar texto centrado
        fill(this.hover ? this.colorTextoHover : this.colorTexto);
        textAlign(CENTER, CENTER);
        textSize(35);
        text(this.texto, xFinal + anchoFinal / 2, yFinal + altoFinal / 2 - 5);
    }

    // Manejo de clic: ejecuta la acción si el mouse está encima
    mousePressed() {
        if (this.hover) {
            this.accion();
        }
    }
}
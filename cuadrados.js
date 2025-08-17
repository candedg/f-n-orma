// ----------------------------------------------------------------------------
//  CUADRADOS - Clase para los cuadradaos de las 3 escenas
//  ---------------------------------------------------------------------------
//  Encapsula el comportamiento de un grupo de cuadrados animados
//    que se mueven dentro de un contenedor rectangular. Incluye lógica para
//    colisiones entre ellos y contra las máscaras.
// ----------------------------------------------------------------------------

class Cuadrados {
  constructor(x, y) {
    // Definición del contenedor donde se moverán los cuadrados
    this.contenedor = {
      ancho: 780,
      alto: 500,
      x: 0,
      y: 0
    };

    // Array que almacenará todos los cuadrados individuales
    this.cuadrados = [];
    this.crearCuadrados();

    // Control del fondo (imagen o color liso)
    this.fondoConImagen = false;
    this.imagenFondo = null;

    // Almacena la máscara externa con la que se deben detectar colisiones
    this.mascara = null;

    // Control de reproducción de sonidos (evita "spam" de audio en choques)
    this.ultimoSonidoColision = 0;
    this.cooldownSonido = 100; // Tiempo mínimo (ms) entre sonidos de colisión
  }

  // Activa el fondo con una imagen cargada
  setFondoConImagen(imagen) {
    this.fondoConImagen = true;
    this.imagenFondo = imagen;
  }

  // Vuelve al fondo gris liso por defecto
  setFondoLiso() {
    this.fondoConImagen = false;
    this.imagenFondo = null;
  }

  // Define la máscara de colisión (posición y tamaño) en el escenario
  setMascara(x, y, ancho, alto) {
    this.mascara = {
      x: x - ancho / 2,
      y: y - alto / 2,
      ancho: ancho,
      alto: alto
    };
  }

  // Reproduce sonido de colisión con un cooldown para evitar repeticiones excesivas
  reproducirSonidoColision() {
    const ahora = millis();
    if (sonidoColision && ahora - this.ultimoSonidoColision > this.cooldownSonido) {
      sonidoColision.play();
      this.ultimoSonidoColision = ahora;
    }
  }

  // Genera los 15 cuadrados iniciales con posiciones predeterminadas
  // Se fijan posiciones para evitar superposiciones al inicio
  crearCuadrados() {
    const tamanoExterior = 60;
    const velocidadBase = 1.5;

    // Coordenadas iniciales prediseñadas
    const posicionesIniciales = [
      { x: 15, y: 195 }, { x: 15, y: 316 }, { x: 15, y: 437 },
      { x: 136, y: 195 },
      { x: 257, y: 195 }, { x: 257, y: 316 }, { x: 257, y: 437 },
      { x: 378, y: 195 },
      { x: 499, y: 195 }, { x: 499, y: 316 }, { x: 499, y: 437 },
      { x: 620, y: 195 },
      { x: 741, y: 195 }, { x: 741, y: 316 }, { x: 741, y: 437 }
    ];

    // Construcción de cada cuadrado con sus propiedades
    for (let i = 0; i < 15; i++) {
      this.cuadrados.push({
        x: posicionesIniciales[i].x,
        y: posicionesIniciales[i].y,
        tamanoExterior: tamanoExterior, // Tamaño del borde exterior
        tamanoInterior: 35,             // Tamaño del cuadrado interno relleno
        grosorBorde: 2,                 // Grosor de línea del borde
        velocidad: velocidadBase + random(-0.3, 0.3), // Pequeña variación de velocidad
        direccionX: random() > 0.5 ? 1 : -1,          // Dirección inicial en X
        direccionY: random() > 0.5 ? 1 : -1,          // Dirección inicial en Y
        tiempoUltimoCambio: 0,           // Contador de frames desde el último cambio
        intervaloCambio: int(random(60, 300)) // Frames hasta próximo cambio de dirección
      });
    }
  }

  // Método principal que se llama en cada frame para actualizar y dibujar todo
  draw() {
    push();
    // Posiciona el contenedor centrado horizontalmente, con margen inferior
    this.contenedor.x = (width - this.contenedor.ancho) / 2;
    this.contenedor.y = height - this.contenedor.alto - 10;

    // Actualiza estados y dibuja en orden lógico
    this.actualizarTodos();
    this.dibujarContenedor();
    this.dibujarTodos();
    pop();
  }

  // Recorre todos los cuadrados, actualiza sus posiciones y detecta colisiones
  actualizarTodos() {
    for (let i = 0; i < this.cuadrados.length; i++) {
      this.actualizarCuadrado(i);
    }
    this.verificarColisionesEntreCuadrados();
    this.verificarColisionesConMascara();
  }

  // Actualiza el movimiento de un cuadrado específico, con rebotes en bordes
  actualizarCuadrado(indice) {
    let c = this.cuadrados[indice];
    c.tiempoUltimoCambio++;

    // Cambio aleatorio de dirección al cumplirse el intervalo
    if (c.tiempoUltimoCambio >= c.intervaloCambio) {
      this.cambiarDireccionAleatoria(c);
      c.tiempoUltimoCambio = 0;
    }

    // Posible nueva posición
    let nuevaX = c.x + (c.direccionX * c.velocidad);
    let nuevaY = c.y + (c.direccionY * c.velocidad);

    const limites = this.obtenerLimitesContenedor();
    let r = c.tamanoExterior / 2;

    // Rebote contra paredes laterales
    if (nuevaX - r <= limites.izquierdo || nuevaX + r >= limites.derecho) {
      c.direccionX *= -1;
      nuevaX = c.x + (c.direccionX * c.velocidad);
    }

    // Rebote contra paredes superior/inferior
    if (nuevaY - r <= limites.superior || nuevaY + r >= limites.inferior) {
      c.direccionY *= -1;
      nuevaY = c.y + (c.direccionY * c.velocidad);
    }

    // Ajuste final con constrain para mantener dentro de los límites
    c.x = constrain(nuevaX, limites.izquierdo + r, limites.derecho - r);
    c.y = constrain(nuevaY, limites.superior + r, limites.inferior - r);
  }

  // Detecta y resuelve colisiones entre todos los pares de cuadrados
  verificarColisionesEntreCuadrados() {
    for (let i = 0; i < this.cuadrados.length; i++) {
      for (let j = i + 1; j < this.cuadrados.length; j++) {
        this.verificarColision(i, j);
      }
    }
  }

  // Detecta y resuelve colisiones con la máscara externa definida
  verificarColisionesConMascara() {
    if (!this.mascara) return;

    for (let c of this.cuadrados) {
      let colisiona = collideRectRect(
        c.x - c.tamanoExterior / 2, c.y - c.tamanoExterior / 2, c.tamanoExterior, c.tamanoExterior,
        this.mascara.x, this.mascara.y, this.mascara.ancho, this.mascara.alto
      );

      if (colisiona) {
        // Acción de rebote y sonido en colisión con la máscara
        this.reproducirSonidoColision();

        c.direccionX *= -1;
        c.direccionY *= -1;
        c.x += c.direccionX * c.velocidad * 2;
        c.y += c.direccionY * c.velocidad * 2;
      }
    }
  }

  // Verifica colisión entre dos cuadrados y aplica rebote
  verificarColision(i, j) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];

    let colisiona = collideRectRect(
      a.x - a.tamanoExterior / 2, a.y - a.tamanoExterior / 2, a.tamanoExterior, a.tamanoExterior,
      b.x - b.tamanoExterior / 2, b.y - b.tamanoExterior / 2, b.tamanoExterior, b.tamanoExterior
    );

    if (colisiona) {
      // Acción de colisión: sonido + rebote
      this.reproducirSonidoColision();

      let dx = b.x - a.x;
      let dy = b.y - a.y;

      // Evita división por cero cuando los cuadrados coinciden exactamente
      if (dx === 0 && dy === 0) {
        dx = random(-1, 1);
        dy = random(-1, 1);
      }

      this.separarCuadrados(i, j, dx, dy);
      this.rebotarCuadrados(i, j);
    }
  }

  // Separa físicamente dos cuadrados superpuestos para evitar solapamiento
  separarCuadrados(i, j, dx, dy) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];
    let mitad = a.tamanoExterior / 2;

    let overlapX = (mitad * 2) - abs(dx);
    let overlapY = (mitad * 2) - abs(dy);

    // Determina en qué eje separar más (X o Y)
    if (overlapX < overlapY) {
      let offset = overlapX / 2;
      if (dx > 0) {
        a.x -= offset;
        b.x += offset;
      } else {
        a.x += offset;
        b.x -= offset;
      }
    } else {
      let offset = overlapY / 2;
      if (dy > 0) {
        a.y -= offset;
        b.y += offset;
      } else {
        a.y += offset;
        b.y -= offset;
      }
    }

    // Asegura que ambos sigan dentro del contenedor
    this.mantenerEnContenedor(a);
    this.mantenerEnContenedor(b);
  }

  // Rebote simple al colisionar: invertir direcciones de ambos cuadrados
  rebotarCuadrados(i, j) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];

    a.direccionX *= -1;
    a.direccionY *= -1;
    b.direccionX *= -1;
    b.direccionY *= -1;
  }

  // Asegura que un cuadrado permanezca dentro de los límites del contenedor
  mantenerEnContenedor(c) {
    const limites = this.obtenerLimitesContenedor();
    let r = c.tamanoExterior / 2;
    c.x = constrain(c.x, limites.izquierdo + r, limites.derecho - r);
    c.y = constrain(c.y, limites.superior + r, limites.inferior - r);
  }

  // Cambia la dirección de un cuadrado hacia un ángulo aleatorio
  cambiarDireccionAleatoria(c) {
    let a = random(0, TWO_PI);
    c.direccionX = cos(a);
    c.direccionY = sin(a);
    c.intervaloCambio = int(random(60, 180));
  }

  // Dibuja el contenedor (fondo con imagen o rectángulo gris liso)
  dibujarContenedor() {
    if (this.fondoConImagen && this.imagenFondo) {
      image(this.imagenFondo, this.contenedor.x, this.contenedor.y, this.contenedor.ancho, this.contenedor.alto);
    } else {
      fill("#B0B5C1");
      noStroke();
      rect(this.contenedor.x, this.contenedor.y, this.contenedor.ancho, this.contenedor.alto);
    }
  }

  // Dibuja todos los cuadrados con borde y relleno interno
  dibujarTodos() {
    rectMode(CENTER);
    for (let c of this.cuadrados) {
      // Cuadrado exterior (solo borde)
      fill(0, 0, 0, 0);
      stroke(0);
      strokeWeight(c.grosorBorde);
      rect(c.x, c.y, c.tamanoExterior, c.tamanoExterior);

      // Cuadrado interior (relleno sólido)
      fill(0);
      noStroke();
      rect(c.x, c.y, c.tamanoInterior, c.tamanoInterior);
    }
  }

  // Devuelve los límites actuales del contenedor 
  obtenerLimitesContenedor() {
    return {
      izquierdo: this.contenedor.x,
      derecho: this.contenedor.x + this.contenedor.ancho,
      superior: this.contenedor.y,
      inferior: this.contenedor.y + this.contenedor.alto
    };
  }

  // Reinicia el array de cuadrados a su estado inicial
  reiniciar() {
    this.cuadrados = [];   // Vacía el array actual
    this.crearCuadrados(); // Vuelve a crear los 15 cuadrados iniciales
  }
}

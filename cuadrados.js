// ============================================================================
//  f‑n‑orma – cuadrados.js
//  ---------------------------------------------------------------------------
//  ▸ Clase que encapsula el comportamiento de un grupo de cuadrados animados
//    que se mueven dentro de un contenedor rectangular. Incluye lógica para
//    colisiones entre ellos y ahora también contra una "máscara" externa.
// ============================================================================

class Cuadrados {
  constructor(x, y) {
    this.contenedor = {
      ancho: 780,
      alto: 500,
      x: 0,
      y: 0
    };

    this.cuadrados = [];
    this.crearCuadrados();

    this.fondoConImagen = false;
    this.imagenFondo = null;

    // Almacena la máscara externa con la que se deben detectar colisiones
    this.mascara = null;
  }

  // Permite activar fondo con imagen
  setFondoConImagen(imagen) {
    this.fondoConImagen = true;
    this.imagenFondo = imagen;
  }

  // Permite volver al fondo gris liso
  setFondoLiso() {
    this.fondoConImagen = false;
    this.imagenFondo = null;
  }

  // Define la "máscara" externa que será usada para colisiones
  setMascara(x, y, ancho, alto) {
    this.mascara = {
      x: x - ancho / 2,
      y: y - alto / 2,
      ancho: ancho,
      alto: alto
    };
  }

  // Genera los 15 cuadrados iniciales con posiciones fijas
  crearCuadrados() {
    const tamañoExterior = 60;
    const velocidadBase = 1.5;

    const posicionesIniciales = [
      { x: 15, y: 195 }, { x: 15, y: 316}, { x: 15, y: 437},
      { x: 136, y: 195 }, 
      { x: 257, y: 195 }, { x: 257, y: 316}, { x: 257, y: 437},
      { x: 378, y: 195 }, 
      { x: 499, y: 195 }, { x: 499, y: 316}, { x: 499, y: 437},
      { x: 620, y: 195 },
      { x: 741, y: 195 }, { x: 741, y: 316 }, { x: 741, y: 437 }
    ];

    for (let i = 0; i < 15; i++) {
      this.cuadrados.push({
        x: posicionesIniciales[i].x,
        y: posicionesIniciales[i].y,
        tamañoExterior: tamañoExterior,
        tamañoInterior: 35,
        grosorBorde: 2,
        velocidad: velocidadBase + random(-0.3, 0.3),
        direccionX: random() > 0.5 ? 1 : -1,
        direccionY: random() > 0.5 ? 1 : -1,
        tiempoUltimoCambio: 0,
        intervaloCambio: int(random(60, 300))
      });
    }
  }

  // Método principal de renderizado
  draw() {
    push();
    this.contenedor.x = (width - this.contenedor.ancho) / 2;
    this.contenedor.y = height - this.contenedor.alto - 10;

    this.actualizarTodos();
    this.dibujarContenedor();
    this.dibujarTodos();
    pop();
  }

  // Actualiza todos los cuadrados y verifica colisiones
  actualizarTodos() {
    for (let i = 0; i < this.cuadrados.length; i++) {
      this.actualizarCuadrado(i);
    }
    this.verificarColisionesEntreCuadrados();
    this.verificarColisionesConMascara();
  }

  // Movimiento y rebote de cada cuadrado
  actualizarCuadrado(indice) {
    let c = this.cuadrados[indice];
    c.tiempoUltimoCambio++;

    if (c.tiempoUltimoCambio >= c.intervaloCambio) {
      this.cambiarDireccionAleatoria(c);
      c.tiempoUltimoCambio = 0;
    }

    let nuevaX = c.x + (c.direccionX * c.velocidad);
    let nuevaY = c.y + (c.direccionY * c.velocidad);

    const limites = this.obtenerLimitesContenedor();
    let r = c.tamañoExterior / 2;

    if (nuevaX - r <= limites.izquierdo || nuevaX + r >= limites.derecho) {
      c.direccionX *= -1;
      nuevaX = c.x + (c.direccionX * c.velocidad);
    }

    if (nuevaY - r <= limites.superior || nuevaY + r >= limites.inferior) {
      c.direccionY *= -1;
      nuevaY = c.y + (c.direccionY * c.velocidad);
    }

    c.x = constrain(nuevaX, limites.izquierdo + r, limites.derecho - r);
    c.y = constrain(nuevaY, limites.superior + r, limites.inferior - r);
  }

  // Colisiones entre pares de cuadrados
  verificarColisionesEntreCuadrados() {
    for (let i = 0; i < this.cuadrados.length; i++) {
      for (let j = i + 1; j < this.cuadrados.length; j++) {
        this.verificarColision(i, j);
      }
    }
  }

  // Colisión con la máscara externa
  verificarColisionesConMascara() {
    if (!this.mascara) return;

    for (let c of this.cuadrados) {
      let colisiona = collideRectRect(
        c.x - c.tamañoExterior / 2, c.y - c.tamañoExterior / 2, c.tamañoExterior, c.tamañoExterior,
        this.mascara.x, this.mascara.y, this.mascara.ancho, this.mascara.alto
      );

      if (colisiona) {
        c.direccionX *= -1;
        c.direccionY *= -1;
        c.x += c.direccionX * c.velocidad * 2;
        c.y += c.direccionY * c.velocidad * 2;
      }
    }
  }

  // Colisión entre dos cuadrados específicos
  verificarColision(i, j) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];

    let colisiona = collideRectRect(
      a.x - a.tamañoExterior / 2, a.y - a.tamañoExterior / 2, a.tamañoExterior, a.tamañoExterior,
      b.x - b.tamañoExterior / 2, b.y - b.tamañoExterior / 2, b.tamañoExterior, b.tamañoExterior
    );

    if (colisiona) {
      let dx = b.x - a.x;
      let dy = b.y - a.y;

      if (dx === 0 && dy === 0) {
        dx = random(-1, 1);
        dy = random(-1, 1);
      }

      this.separarCuadrados(i, j, dx, dy);
      this.rebotarCuadrados(i, j);
    }
  }

  // Separa dos cuadrados superpuestos
  separarCuadrados(i, j, dx, dy) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];
    let mitad = a.tamañoExterior / 2;

    let overlapX = (mitad * 2) - abs(dx);
    let overlapY = (mitad * 2) - abs(dy);

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

    this.mantenerEnContenedor(a);
    this.mantenerEnContenedor(b);
  }

  // Rebote simple: invertir direcciones de movimiento
  rebotarCuadrados(i, j) {
    let a = this.cuadrados[i];
    let b = this.cuadrados[j];

    a.direccionX *= -1;
    a.direccionY *= -1;
    b.direccionX *= -1;
    b.direccionY *= -1;
  }

  // Limita que el cuadrado no se escape del contenedor
  mantenerEnContenedor(c) {
    const limites = this.obtenerLimitesContenedor();
    let r = c.tamañoExterior / 2;
    c.x = constrain(c.x, limites.izquierdo + r, limites.derecho - r);
    c.y = constrain(c.y, limites.superior + r, limites.inferior - r);
  }

  // Cambio aleatorio de dirección
  cambiarDireccionAleatoria(c) {
    let a = random(0, TWO_PI);
    c.direccionX = cos(a);
    c.direccionY = sin(a);
    c.intervaloCambio = int(random(60, 180));
  }

  // Dibujo del fondo del contenedor
  dibujarContenedor() {
    if (this.fondoConImagen && this.imagenFondo) {
      image(this.imagenFondo, this.contenedor.x, this.contenedor.y, this.contenedor.ancho, this.contenedor.alto);
    } else {
      fill("#B0B5C1");
      noStroke();
      rect(this.contenedor.x, this.contenedor.y, this.contenedor.ancho, this.contenedor.alto);
    }
  }

  // Dibujo de todos los cuadrados
  dibujarTodos() {
    rectMode(CENTER);
    for (let c of this.cuadrados) {
      fill(0, 0, 0, 0);
      stroke(0);
      strokeWeight(c.grosorBorde);
      rect(c.x, c.y, c.tamañoExterior, c.tamañoExterior);

      fill(0);
      noStroke();
      rect(c.x, c.y, c.tamañoInterior, c.tamañoInterior);
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
}

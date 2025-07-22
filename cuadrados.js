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

    this.fondoConImagen = false;
    this.imagenFondo = null;
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


  // Método principal de renderizado
  draw() {
    push();
    this.contenedor.x = (width - this.contenedor.ancho) / 2;
    this.contenedor.y = height - this.contenedor.alto - 10;

    this.dibujarContenedor();
    pop();
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
}


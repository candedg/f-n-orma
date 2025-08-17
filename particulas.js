// -----------------------------------------------------------------------------
// SISTEMA DE PARTÍCULAS
// -----------------------------------------------------------------------------
// Maneja un conjunto de partículas generadas cuando la bola rosa golpea el 
// borde inferior de la máscara en Pantalla02.
// Cada partícula es un pequeño cuadrado que cae con efecto de gravedad.
// -----------------------------------------------------------------------------
class SistemaParticulas {
  constructor() {
    this.particulas = [];       // Array que almacena todas las partículas activas
    this.gravedad = 0.2;        // Aceleración vertical simulando gravedad
    this.colorParticula = "#1E1E28"; // Color de las partículas
    this.tamanoParticula = 3;   // Tamaño de cada partícula (ancho y alto)
  }

  // Genera 5 partículas en torno a la posición (x, y) especificada
  generarParticulas(x, y) {
    for (let i = 0; i < 5; i++) {
      this.particulas.push({
        x: x + random(-10, 10),   // Desplazamiento horizontal aleatorio
        y: y,                      // Posición vertical inicial
        velX: random(-1, 1),       // Velocidad horizontal inicial
        velY: random(-2, -0.5),    // Velocidad vertical inicial (rebote hacia arriba)
      });
    }
  }

  // Actualiza la posición de todas las partículas y controla colisiones con contenedor
  actualizar(contenedor) {
    for (let i = this.particulas.length - 1; i >= 0; i--) {
      let p = this.particulas[i];
      
      // Aplicar gravedad a la velocidad vertical
      p.velY += this.gravedad;
      
      // Actualizar posición
      p.x += p.velX;
      p.y += p.velY;
      
      // Eliminar partícula si cae fuera del contenedor (borde inferior)
      if (p.y > contenedor.y + contenedor.alto) {
        this.particulas.splice(i, 1);
      }
      
      // Limitar horizontalmente dentro del contenedor y simular rebote leve
      if (p.x < contenedor.x) {
        p.x = contenedor.x;
        p.velX *= -0.5;
      }
      if (p.x > contenedor.x + contenedor.ancho) {
        p.x = contenedor.x + contenedor.ancho;
        p.velX *= -0.5;
      }
    }
  }

  // Dibuja todas las partículas en pantalla
  dibujar() {
    push();
    fill(this.colorParticula);
    noStroke();
    
    for (let p of this.particulas) {
      rect(p.x, p.y, this.tamanoParticula, this.tamanoParticula);
    }
    
    pop();
  }

  // Elimina todas las partículas existentes
  limpiar() {
    this.particulas = [];
  }

  // Retorna la cantidad de partículas actualmente activas
  getCantidad() {
    return this.particulas.length;
  }
}

// -------------------------------------------------------------------------
//  Clase Pantalla02 – Segunda escena interactiva del proyecto
//  Versión adaptada para usar p5.collide2D en colisiones con cuadrados
// -------------------------------------------------------------------------
class Pantalla02 extends Pantalla {
  constructor() {
    super();

    // Crear el sistema de cuadrados centrado
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Dimensiones de la máscara y del círculo interior
    this.diametroMascara = 65;  // Diámetro del borde exterior (cuadrado visual)
    this.diametroInterior = 35; // Diámetro del círculo sólido interior
    this.mascaraTamano = 60;    // Tamaño del cuadrado para colisión

    // Posición inicial (se define en inicializarPosicion)
    this.mascaraX
    this.mascaraY

    // Velocidad de la máscara (por empuje del círculo)
    this.mascaraVelX = 0;
    this.mascaraVelY = 0;
    this.friccionMascara = 0.85; // Frenado gradual

    // Posición y física del círculo interior (relativa a la máscara)
    this.circuloX = 0;
    this.circuloY = 0;
    this.circuloVelX = 0;
    this.circuloVelY = 0;
    this.gravedad = 0.3;  // fuerza que tira hacia abajo
    this.rebote = 0.3;    // factor de rebote (0 = nada, 1 = rebote total)
    this.friccion = 0.98; // fricción para el círculo

    // Control de saltos y dirección con flechas
    this.fuerzaSalto = 5;
    this.puedeUsarFlechas = true;

    // Estado de teclas
    this.teclas = {
      arriba: false,
      abajo: false,
      izquierda: false,
      derecha: false
    };
  }

  // -------------------------------------------------------------------------
  // DRAW – Renderizado de la escena
  // -------------------------------------------------------------------------
  draw() {
    background("#1E1E28");

    // Texto en pantalla
    textFont(jura);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("#B0B5C1");
    noStroke();
    text("Por fuera te ves igual al resto", width / 2, 30);

    textSize(20);
    text("Ahora si puedes moverte", width / 2, 100);
    text("Parece que algo sigue siendo diferente...", width / 2, 160);

    // Iconos de flechas y mouse
    image(flechasImg, 100, 60, 70, 70);
    image(mouseImg, 635, 60, 60, 65);

    // Inicializar posición la primera vez
    this.inicializarPosicion();


    // Pasar posición de la máscara al sistema de cuadrados
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.diametroMascara, this.diametroMascara);


    // Dibujar los cuadrados
    this.cuadrados.setFondoConImagen(fondoImg);
    this.cuadrados.draw();

    // Dibujar máscara y círculo interior
    this.dibujarMascara();

    // Actualizar física de todo el sistema
    this.actualizarFisica();
  }

  // -------------------------------------------------------------------------
  // Inicializa la posición de la máscara 
  // -------------------------------------------------------------------------
  inicializarPosicion() {
    // Solo se ejecuta una vez para dar una posición inicial a la máscara circular
    if (this.mascaraX === undefined || this.mascaraY === undefined) {
      // Calcular explícitamente las dimensiones del contenedor
      // usando la misma lógica que en cuadrados.js
      const contenedorX = (width - 780) / 2;  // 780 es this.contenedor.ancho
      const contenedorY = height - 500 - 10;  // 500 es this.contenedor.alto

      // Ponemos la máscara centrada horizontalmente y cerca del borde inferior del contenedor.
      this.mascaraX = contenedorX + 780 / 2;
      this.mascaraY = contenedorY + 500 - 50;
    }
  }

  // -------------------------------------------------------------------------
  // Actualiza física del círculo y la máscara
  // -------------------------------------------------------------------------
  actualizarFisica() {
    // 1. Gravedad en el círculo interior
    this.circuloVelY += this.gravedad;

    // 2. Controles para mover el círculo dentro de la máscara
    this.aplicarControles();

    // 3. Actualizar posición del círculo
    this.circuloX += this.circuloVelX;
    this.circuloY += this.circuloVelY;

    // 4. Aplicar fricción al círculo
    this.circuloVelX *= this.friccion;

    // 5. Colisiones del círculo con bordes de la máscara
    this.verificarColisionesCirculoMascara();

    // 6. Intentar mover la máscara usando su velocidad
    this.moverMascaraConColisiones();

    // 7. Limitar máscara dentro del contenedor
    this.limitarMascaraEnContenedor();
  }

  // -------------------------------------------------------------------------
  // Aplica controles de flechas para mover el círculo
  // -------------------------------------------------------------------------
  aplicarControles() {
    if (this.puedeUsarFlechas) {
      if (this.teclas.arriba) {
        this.circuloVelY = -this.fuerzaSalto;
        this.cooldownSalto();
      }
      if (this.teclas.abajo) {
        this.circuloVelY = this.fuerzaSalto;
        this.cooldownSalto();
      }
      if (this.teclas.izquierda) {
        this.circuloVelX = -this.fuerzaSalto;
        this.cooldownSalto();
      }
      if (this.teclas.derecha) {
        this.circuloVelX = this.fuerzaSalto;
        this.cooldownSalto();
      }
    }
  }

  // -------------------------------------------------------------------------
  // Pequeña pausa para evitar que se repitan saltos de inmediato
  // -------------------------------------------------------------------------
  cooldownSalto() {
    this.puedeUsarFlechas = false;
    setTimeout(() => { this.puedeUsarFlechas = true; }, 200);
  }

  // -------------------------------------------------------------------------
  // Colisiones del círculo con bordes internos de la máscara
  // -------------------------------------------------------------------------
  verificarColisionesCirculoMascara() {
    const radioCirculo = this.diametroInterior / 2;
    const limiteMascara = this.mascaraTamano / 2 - radioCirculo;

    if (this.circuloX > limiteMascara) {
      this.circuloX = limiteMascara;
      this.circuloVelX *= -this.rebote;
      this.mascaraVelX += abs(this.circuloVelX) * 0.5;
    }
    if (this.circuloX < -limiteMascara) {
      this.circuloX = -limiteMascara;
      this.circuloVelX *= -this.rebote;
      this.mascaraVelX -= abs(this.circuloVelX) * 0.5;
    }
    if (this.circuloY > limiteMascara) {
      this.circuloY = limiteMascara;
      this.circuloVelY *= -this.rebote;
      this.mascaraVelY += abs(this.circuloVelY) * 0.5;
    }
    if (this.circuloY < -limiteMascara) {
      this.circuloY = -limiteMascara;
      this.circuloVelY *= -this.rebote;
      this.mascaraVelY -= abs(this.circuloVelY) * 0.5;
    }
  }

  // -------------------------------------------------------------------------
  // Mueve la máscara y verifica colisiones con otros cuadrados usando p5.collide2D
  // -------------------------------------------------------------------------
  moverMascaraConColisiones() {
    const contenedor = this.cuadrados.contenedor;
    const radio = this.mascaraTamano / 2;

    // Calcular posición tentativa
    let nuevaX = this.mascaraX + this.mascaraVelX;
    let nuevaY = this.mascaraY + this.mascaraVelY;

    // Limitar dentro de contenedor
    nuevaX = constrain(nuevaX, contenedor.x + radio, contenedor.x + contenedor.ancho - radio);
    nuevaY = constrain(nuevaY, contenedor.y + radio, contenedor.y + contenedor.alto - radio);

    // Verificar colisiones con cuadrados
    let colisiona = false;
    for (let cuadrado of this.cuadrados.cuadrados) {
      if (collideRectCircle(
        cuadrado.x - cuadrado.tamañoExterior / 2,
        cuadrado.y - cuadrado.tamañoExterior / 2,
        cuadrado.tamañoExterior,
        cuadrado.tamañoExterior,
        nuevaX, nuevaY,
        this.mascaraTamano
      )) {
        colisiona = true;
        break;
      }
    }

    // Si colisiona, invertir velocidad (rebote)
    if (colisiona) {
      this.mascaraVelX *= -0.5; // rebote más suave que el círculo
      this.mascaraVelY *= -0.5;
      nuevaX = this.mascaraX + this.mascaraVelX;
      nuevaY = this.mascaraY + this.mascaraVelY;
    }

    // Actualizar posición
    this.mascaraX = nuevaX;
    this.mascaraY = nuevaY;

    // Aplicar fricción para que se detenga gradualmente
    this.mascaraVelX *= this.friccionMascara;
    this.mascaraVelY *= this.friccionMascara;
  }

  // -------------------------------------------------------------------------
  // Limita la máscara para que no se salga del contenedor
  // -------------------------------------------------------------------------
  limitarMascaraEnContenedor() {
    const cont = this.cuadrados.contenedor;
    const radio = this.mascaraTamano / 2;

    if (this.mascaraX - radio < cont.x) this.mascaraX = cont.x + radio;
    if (this.mascaraX + radio > cont.x + cont.ancho) this.mascaraX = cont.x + cont.ancho - radio;
    if (this.mascaraY - radio < cont.y) this.mascaraY = cont.y + radio;
    if (this.mascaraY + radio > cont.y + cont.alto) this.mascaraY = cont.y + cont.alto - radio;
  }

  // -------------------------------------------------------------------------
  // Dibuja la máscara cuadrada y el círculo interior
  // -------------------------------------------------------------------------
  dibujarMascara() {
    push();
    rectMode(CENTER);

    // Cuadrado exterior (máscara)
    noFill();
    stroke(30, 30, 40);
    strokeWeight(2);
    rect(this.mascaraX, this.mascaraY, this.mascaraTamano, this.mascaraTamano);

    // Círculo interior
    noStroke();
    fill("#F27E63");
    ellipse(
      this.mascaraX + this.circuloX,
      this.mascaraY + this.circuloY,
      this.diametroInterior,
      this.diametroInterior
    );
    pop();
  }

  // -------------------------------------------------------------------------
  // Avanza a la siguiente pantalla con click
  // -------------------------------------------------------------------------
  mousePressed() {
    // Posición inicial reseteada
    this.mascaraX = undefined;
    this.mascaraY = undefined;
    nav.siguientePantalla();
  }

  // -------------------------------------------------------------------------
  // Controles de teclado
  // -------------------------------------------------------------------------
  keyPressed() {
    if (keyCode === UP_ARROW) this.teclas.arriba = true;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = true;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = true;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = true;
  }
  keyReleased() {
    if (keyCode === UP_ARROW) this.teclas.arriba = false;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = false;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = false;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = false;
  }
}

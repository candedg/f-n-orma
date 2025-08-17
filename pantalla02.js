// -------------------------------------------------------------------------
//  PANTALLA01 – Segunda escena interactiva del proyecto
//  - p5.collide2D en colisiones con cuadrados
//  - Salto con barra espaciadora, opacidad de máscara y sistema de partículas
// -------------------------------------------------------------------------
class Pantalla02 extends Pantalla {
  constructor() {
    super();

    // Crear el sistema de cuadrados centrado
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Crear el sistema de partículas
    this.sistemaParticulas = new SistemaParticulas();

    // Dimensiones de la máscara y del círculo interior
    this.diametroMascara = 65;  // Diámetro del borde exterior (cuadrado visual)
    this.diametroInterior = 35; // Diámetro del círculo sólido interior
    this.mascaraTamano = 60;    // Tamaño del cuadrado para colisión

    // Posición inicial (se define en inicializarPosicion)
    this.mascaraX;
    this.mascaraY;

    // Opacidad de la máscara
    this.opacidadMascara = 255;
    this.decrementoOpacidad = 25.5; // 10% de 255

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

    // Control para salto con barra espaciadora
    this.puedeUsarEspacio = true;
    this.saltoConEspacio = false; // Flag para detectar cuando fue un salto con espacio

    // Estado de teclas
    this.teclas = {
      arriba: false,
      abajo: false,
      izquierda: false,
      derecha: false,
      espacio: false
    };
  }

  // DRAW – Renderizado de la escena
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

    // Iconos de flechas y barra espaciadora
    image(flechasImg, 100, 60, 70, 70);
    image(spaceImg, 600, 60, 140, 60);

    // Inicializar posición la primera vez
    this.inicializarPosicion();

    // Pasar posición de la máscara al sistema de cuadrados
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.diametroMascara, this.diametroMascara);

    // Dibujar los cuadrados
    this.cuadrados.setFondoConImagen(fondoImg);
    this.cuadrados.draw();

    // Actualizar y dibujar partículas
    this.sistemaParticulas.actualizar(this.cuadrados.contenedor);
    this.sistemaParticulas.dibujar();

    // Dibujar máscara y círculo interior (con opacidad)
    this.dibujarMascara();

    // Actualizar física de todo el sistema
    this.actualizarFisica();
  }

  // Inicializa la posición de la máscara 
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

  // Actualiza física del círculo y la máscara
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

    // 8. Verificar si la opacidad llegó a 0 para avanzar de pantalla
    if (this.opacidadMascara <= 0) {
      this.pasarASiguientePantalla();
    }
  }

  // Aplica controles de flechas para mover el círculo
  aplicarControles() {
    if (this.puedeUsarFlechas) {
      if (this.teclas.arriba) {
        this.circuloVelY = -this.fuerzaSalto;
        this.saltoConEspacio = false; // No fue un salto con espacio
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

    // Control de salto con barra espaciadora
    if (this.puedeUsarEspacio && this.teclas.espacio) {
      this.circuloVelY = -this.fuerzaSalto;
      this.saltoConEspacio = true; // Marcar que fue un salto con espacio
      this.cooldownEspacio();
    }
  }

  // Pequeña pausa para evitar que se repitan saltos de inmediato
  cooldownSalto() {
    this.puedeUsarFlechas = false;
    setTimeout(() => { this.puedeUsarFlechas = true; }, 200);
  }

  // Cooldown específico para la barra espaciadora
  cooldownEspacio() {
    this.puedeUsarEspacio = false;
    this.teclas.espacio = false; // Resetear inmediatamente
    setTimeout(() => { this.puedeUsarEspacio = true; }, 300);
  }

  // Colisiones del círculo con bordes internos de la máscara
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

      // Si golpea el borde inferior Y fue un salto con espacio
      if (this.saltoConEspacio && this.opacidadMascara > 0) {
        this.reducirOpacidadYGenerarParticulas();
        this.saltoConEspacio = false; // Resetear el flag
      }
    }
    if (this.circuloY < -limiteMascara) {
      this.circuloY = -limiteMascara;
      this.circuloVelY *= -this.rebote;
      this.mascaraVelY -= abs(this.circuloVelY) * 0.5;
    }
  }

  //Reduce opacidad y genera partículas
  reducirOpacidadYGenerarParticulas() {
    // Reducir opacidad en 10%
    this.opacidadMascara -= this.decrementoOpacidad;
    this.opacidadMascara = Math.max(0, this.opacidadMascara); // No puede ser negativa

    // Generar partículas desde el centro del borde inferior de la máscara
    const puntoX = this.mascaraX;
    const puntoY = this.mascaraY + (this.mascaraTamano / 2);
    this.sistemaParticulas.generarParticulas(puntoX, puntoY);
  }

  // Mueve la máscara y verifica colisiones con otros cuadrados usando p5.collide2D
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
        cuadrado.x - cuadrado.tamanoExterior / 2,
        cuadrado.y - cuadrado.tamanoExterior / 2,
        cuadrado.tamanoExterior,
        cuadrado.tamanoExterior,
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

  // Limita la máscara para que no se salga del contenedor
  limitarMascaraEnContenedor() {
    const cont = this.cuadrados.contenedor;
    const radio = this.mascaraTamano / 2;

    if (this.mascaraX - radio < cont.x) this.mascaraX = cont.x + radio;
    if (this.mascaraX + radio > cont.x + cont.ancho) this.mascaraX = cont.x + cont.ancho - radio;
    if (this.mascaraY - radio < cont.y) this.mascaraY = cont.y + radio;
    if (this.mascaraY + radio > cont.y + cont.alto) this.mascaraY = cont.y + cont.alto - radio;
  }

  // Dibuja la máscara cuadrada y el círculo interior
  dibujarMascara() {
    push();
    rectMode(CENTER);

    // Cuadrado exterior (máscara) 
    noFill();
    stroke(30, 30, 40, this.opacidadMascara); // Aplicar opacidad
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

  // Pasa a la siguiente pantalla y limpia recursos
  pasarASiguientePantalla() {
    // Limpiar partículas
    this.sistemaParticulas.limpiar();
    
    // Posición inicial reseteada
    this.mascaraX = undefined;
    this.mascaraY = undefined;
    this.cuadrados.reiniciar();

    this.opacidadMascara = 255
    
    // Avanzar a pantalla03
    nav.siguientePantalla();
  }

  mousePressed() {
  }

  // Controles de teclado
  keyPressed() {
    if (keyCode === UP_ARROW) this.teclas.arriba = true;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = true;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = true;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = true;
    
    // Control de barra espaciadora
    if (keyCode === 32) { // 32 es el código de la barra espaciadora
      this.teclas.espacio = true;
    }
  }

  keyReleased() {
    if (keyCode === UP_ARROW) this.teclas.arriba = false;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = false;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = false;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = false;
    
    // La barra espaciadora se resetea automáticamente en cooldownEspacio()
    // para evitar saltos continuos
  }
}
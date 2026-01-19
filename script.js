/* ---------- NAVEGACIÓN ---------- */

function irA(id) {
  document.querySelectorAll(".pantalla").forEach(p =>
    p.classList.add("oculto")
  );
  document.getElementById(id).classList.remove("oculto");
}

/* ---------- INICIO ---------- */

function continuarInicio() {
  if (localStorage.getItem("entrenador")) {
    irA("menu");
  } else {
    irA("registro");
  }
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const poke = params.get("pokemon");
  const textoEcuacion = document.getElementById("textoEcuacion");
  const respuesta = document.getElementById("respuesta");


  if (poke) {
    abrirEcuacion(Number(poke));
    return; // 
  }

  // Comportamiento normal
  if (localStorage.getItem("entrenador")) {
    irA("menu");
  } else {
    irA("presentacion");
  }
};


/* ---------- ENTRENADOR ---------- */

function guardarEntrenador() {
  const entrenador = {
    nombre: nombre.value,
    curso: curso.value,
    frase: frase.value
  };

  localStorage.setItem("entrenador", JSON.stringify(entrenador));
  inicializarPokemons();
  irA("menu");
}

function abrirTarjeta() {
  const e = JSON.parse(localStorage.getItem("entrenador"));
  datosEntrenador.innerHTML = `
    <p><strong>Nombre:</strong> ${e.nombre}</p>
    <p><strong>Curso:</strong> ${e.curso}</p>
    <p><strong>Frase:</strong> "${e.frase}"</p>
  `;
  irA("tarjeta");
}

/* ---------- DATOS DE LOS POKÉMON ---------- */

const datosPokemon = [
  {
    id: 1,
    nombre: "Algebrón",
    imagen: "img/poke1.png",
    silueta: "img/poke1_silueta.png",
    descripcion: "Domina las ecuaciones lineales simples."
  },
  {
    id: 2,
    nombre: "Proporciónix",
    imagen: "img/poke2.png",
    silueta: "img/poke2_silueta.png",
    descripcion: "Controla razones y proporciones."
  },
  {
    id: 3,
    nombre: "Radicalón",
    imagen: "img/poke3.png",
    silueta: "img/poke3_silueta.png",
    descripcion: "Especialista en operaciones básicas."
  },
  {
    id: 4,
    nombre: "Factorum",
    imagen: "img/poke4.png",
    silueta: "img/poke4_silueta.png",
    descripcion: "Descompone expresiones complejas."
  },
  {
    id: 5,
    nombre: "Ecuatrix",
    imagen: "img/poke5.png",
    silueta: "img/poke5_silueta.png",
    descripcion: "Equilibra ambos lados de la ecuación."
  },
  {
    id: 6,
    nombre: "Divisón",
    imagen: "img/poke6.png",
    silueta: "img/poke6_silueta.png",
    descripcion: "No teme a las fracciones."
  },
  {
    id: 7,
    nombre: "Multiplox",
    imagen: "img/poke7.png",
    silueta: "img/poke7_silueta.png",
    descripcion: "Multiplica su poder sin esfuerzo."
  },
  {
    id: 8,
    nombre: "Paréntesis",
    imagen: "img/poke8.png",
    silueta: "img/poke8_silueta.png",
    descripcion: "Controla el orden de las operaciones."
  },
  {
    id: 9,
    nombre: "Doblón",
    imagen: "img/poke9.png",
    silueta: "img/poke9_silueta.png",
    descripcion: "Suma fuerzas iguales."
  },
  {
    id: 10,
    nombre: "Fractalus",
    imagen: "img/poke10.png",
    silueta: "img/poke10_silueta.png",
    descripcion: "Maestro de las fracciones algebraicas."
  }
];


/* ---------- POKEDEX ---------- */

function inicializarPokemons() {
  if (!localStorage.getItem("pokemons")) {
    const lista = [];
    for (let i = 1; i <= 10; i++) {
      lista.push({
        id: i,
        nombre: "Pokemon " + i,
        desbloqueado: false
      });
    }
    localStorage.setItem("pokemons", JSON.stringify(lista));
  }
}

function abrirPokedex() {
  const lista = JSON.parse(localStorage.getItem("pokemons"));
  listaPokemon.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "pokemon";
    div.onclick = () => verPokemon(p.id);

    const imagen = p.desbloqueado
      ? `img/poke${p.id}.png`
      : `img/poke${p.id}_silueta.png`;

    const nombre = p.desbloqueado ? p.nombre : "????";

    div.innerHTML = `
      <img src="${imagen}" alt="${nombre}">
      <p>${nombre}</p>
    `;

    listaPokemon.appendChild(div);
  });

  irA("pokedex");
}

function verPokemon(id) {
  const lista = JSON.parse(localStorage.getItem("pokemons"));
  const estado = lista.find(p => p.id === id);
  const datos = datosPokemon.find(p => p.id === id);

  const nombre = document.getElementById("detalleNombre");
  const imagen = document.getElementById("detalleImagen");
  const info = document.getElementById("detalleInfo");

  if (estado.desbloqueado) {
    nombre.textContent = datos.nombre;
    imagen.src = datos.imagen;
    info.textContent = datos.descripcion;
  } else {
    nombre.textContent = "???";
    imagen.src = datos.silueta;
    info.textContent = "Esta anomalía aún no ha sido registrada.";
  }

  irA("detallePokemon");
}


/* ---------- ZONA SECRETA ---------- */

function comprobarCodigo() {
  const codigoCorrecto = 4321;

  if (codigoInput.value == codigoCorrecto) {
    irA("pregunta");
  } else {
    alert("❌ Código incorrecto");
  }
}

/* ---------- RESET ---------- */

function resetear() {
  if (confirm("¿Seguro que quieres borrar todo el progreso?")) {
    localStorage.clear();
    location.reload();
  }
}

/* ---------- DESBLOQUEO (PARA QR) ---------- */
/* Llamar a esta función cuando resuelvan una ecuación */

function desbloquearPokemon(numero) {
  const lista = JSON.parse(localStorage.getItem("pokemons"));
  lista[numero - 1].desbloqueado = true;
  localStorage.setItem("pokemons", JSON.stringify(lista));
  alert("🎉 ¡Pokemon desbloqueado!");
}

/* ---------- ECUACIONES ---------- */

const ecuaciones = [
  { id: 1, texto: "\\frac{3}{2}+3x=\\frac{5x}{9}-\\frac{2x+1}{6}", solucion: [-3/5] },
  { id: 2, texto: "-3x-6 = 7x+4", solucion: [-1] },
  { id: 3, texto: "x(x^{2}+x)-(x+1)(x^{2}-2)=-4 ", solucion: [-3,-3] },
  { id: 4, texto: "2x^{2}-3x-2=0", solucion: [2,-1/2] },
  { id: 5, texto: "-5(2-x)+3(2x+4)=5(4x-2)", solucion: [4/3] },
  { id: 6, texto: "-x+3x+1=2x-3", solucion: ["NS"] },
  { id: 7, texto: "(x-1)(x-2)=0", solucion: [1,2] },
  { id: 8, texto: "x^{2}-4x+21=0", solucion: ["NS"] },
  { id: 9, texto: "(3x-2)^{2}=(2x+1)(2x-1)-2", solucion: [1,7/5] },
  { id: 10, texto: "\\frac{x-4}{6} + \\frac{2x-4}{8}= - \\frac{5x}{10}-\\frac{5x-6}{12}", solucion: [5] }
];

let ecuacionActual = null;

function abrirEcuacion(numeroPokemon) {
  ecuacionActual = ecuaciones.find(e => e.id === numeroPokemon);

  textoEcuacion.innerHTML = '\\(' + ecuacionActual.texto + '\\)';
  MathJax.typesetPromise();

  respuesta1.value = "";
  respuesta2.value = "";

  // Si hay dos soluciones, mostramos el segundo campo
  if (ecuacionActual.solucion.length === 2) {
    respuesta2.style.display = "block";
  } else {
    respuesta2.style.display = "none";
  }

  irA("ecuacion");
}



function comprobarEcuacion() {

  // 🛑 SEGURIDAD: si por lo que sea no hay ecuación cargada, avisamos y salimos
  if (!ecuacionActual) {
    alert("Error al cargar la ecuación. Vuelve a escanear el QR.");
    irA("menu");
    return;
  }

  const sol = ecuacionActual.solucion;

  if (sol.length === 1) {
    if (Number(respuesta1.value) === sol[0]) {
      desbloquearPokemon(ecuacionActual.id);
      alert("✅ ¡Correcto!");
      irA("menu");
      return;
    }
  }

  if (sol.length === 2) {
    const r1 = Number(respuesta1.value);
    const r2 = Number(respuesta2.value);

    const ok =
      (r1 === sol[0] && r2 === sol[1]) ||
      (r1 === sol[1] && r2 === sol[0]);

    if (ok) {
      desbloquearPokemon(ecuacionActual.id);
      alert("✅ ¡Correcto!");
      irA("menu");
      return;
    }
  }

  alert("❌ Incorrecto. Inténtalo otra vez.");
}



let scannerQR;

function abrirScanner() {
  irA("analizar");

  document.getElementById("mensajeQR").textContent =
    "Apunta la cámara al código QR";

  scannerQR = new Html5Qrcode("lector-qr");

  scannerQR.start(
    { facingMode: "environment" }, // cámara trasera
    { fps: 10, qrbox: 250 },
    qrLeido,
    error => {}
  );
}

function qrLeido(textoQR) {
  const numero = Number(textoQR);

  if (isNaN(numero) || numero < 1 || numero > 10) {
    document.getElementById("mensajeQR").textContent = "QR no válido";
    return;
  }

  // 👉 Paramos el lector DE VERDAD antes de cambiar de pantalla
  if (scannerQR) {
    scannerQR.stop().then(() => {
      scannerQR.clear();
      scannerQR = null;

      // Solo cuando ya está apagado abrimos la ecuación
      abrirEcuacion(numero);
    });
  } else {
    abrirEcuacion(numero);
  }
}

function cerrarScanner() {
  if (scannerQR) {
    scannerQR.stop().then(() => {
      scannerQR.clear();
      scannerQR = null;
      irA("menu");
    });
  } else {
    irA("menu");
  }
}







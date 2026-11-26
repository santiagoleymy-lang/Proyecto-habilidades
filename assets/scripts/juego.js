const app = document.getElementById("juego-app");

const habilidades = {
  tiempo: "Organización y tiempo",
  estres: "Manejo del estrés",
  relaciones: "Establecer relaciones",
  conflictos: "Manejo de conflictos",
  delegar: "Delegar y empoderar",
  decisiones: "Toma de decisiones"
};

const equipo = {
  Santiago: { rol: "Director", piel: "#e9b99a", cabello: "#342b34", camisa: "#8176f5" },
  Lucía: { rol: "Desarrolladora", piel: "#f0c6a8", cabello: "#422f25", camisa: "#f18391" },
  Marco: { rol: "Desarrollador", piel: "#c98d6c", cabello: "#292b34", camisa: "#50b99b" },
  Daniela: { rol: "Diseñadora", piel: "#e5b298", cabello: "#5a3429", camisa: "#e7ac4e" },
  Alex: { rol: "Control de calidad", piel: "#ab765b", cabello: "#29252c", camisa: "#5298ce" },
  Valeria: { rol: "Nueva integrante", piel: "#e9c2a4", cabello: "#684238", camisa: "#bb78ce" }
};

const misiones = [
  {
    titulo: "Un error antes de la entrega",
    contexto: "El cliente reporta un error importante el mismo día que debes preparar una presentación para el equipo.",
    voz: "Alex",
    dialogo: "El error afecta a varios usuarios. Necesitamos decidir qué atender primero.",
    personas: ["Santiago", "Alex", "Lucía"],
    habilidad: "tiempo",
    opciones: [
      { tipo: "mejor", texto: "Priorizo el error del cliente, reservo tiempo para la presentación y aviso al equipo qué atenderé después.", efecto: { tiempo: 10, estres: 4 }, respuesta: "Ordenar las tareas por impacto y comunicar los tiempos protege el trabajo importante sin dejar al equipo sin información." },
      { tipo: "aceptable", texto: "Pido a alguien que prepare la presentación mientras reviso el error.", efecto: { tiempo: 4, delegar: 3 }, respuesta: "Delegar ayuda, pero conviene acordar qué debe incluir la presentación y cuándo revisar el avance." },
      { tipo: "mejorable", texto: "Empiezo por la presentación porque ya la tenía planeada.", efecto: { tiempo: -7, decisiones: -2 }, respuesta: "El plan importa, pero la nueva urgencia afecta a un cliente y requiere revisar prioridades." },
      { tipo: "mejorable", texto: "Intento resolver todo al mismo tiempo sin cambiar mi agenda.", efecto: { tiempo: -8, estres: -6 }, respuesta: "Multitarea sin priorizar dispersa la atención y aumenta la presión." }
    ]
  },
  {
    titulo: "Preparar una demo en equipo",
    contexto: "Tu equipo debe mostrar un producto a un cliente. Tú podrías preparar todas las partes, pero eso dejaría al resto fuera del trabajo.",
    voz: "Lucía",
    dialogo: "Puedo encargarme de la experiencia de usuario. Es una parte que conozco bien.",
    personas: ["Santiago", "Lucía", "Marco"],
    habilidad: "delegar",
    opciones: [
      { tipo: "mejor", texto: "Pregunto en qué destaca cada persona, reparto las partes y acordamos entregables y revisiones.", efecto: { delegar: 10, relaciones: 4 }, respuesta: "Delegar con claridad y según fortalezas da autonomía y permite corregir a tiempo." },
      { tipo: "aceptable", texto: "Reparto las partes, pero pido que me consulten cada decisión.", efecto: { delegar: 2, estres: -3 }, respuesta: "Repartiste tareas, aunque consultar cada decisión limita la autonomía." },
      { tipo: "mejorable", texto: "Preparo todo yo para asegurarme de que quede bien.", efecto: { delegar: -8, estres: -4 }, respuesta: "Resolverlo solo puede parecer rápido, pero el equipo no desarrolla sus habilidades y tú te sobrecargas." },
      { tipo: "mejorable", texto: "Reparto el trabajo sin definir qué resultado espero.", efecto: { delegar: -5, tiempo: -3 }, respuesta: "Sin expectativas y fechas claras, cada persona puede entender algo distinto." }
    ]
  },
  {
    titulo: "Dos ideas, una decisión",
    contexto: "Marco y Daniela discrepan sobre cómo construir una función clave. La conversación empieza a subir de tono.",
    voz: "Daniela",
    dialogo: "Las dos propuestas tienen ventajas, pero no estamos logrando escucharnos.",
    personas: ["Santiago", "Marco", "Daniela"],
    habilidad: "conflictos",
    opciones: [
      { tipo: "mejor", texto: "Escucho las dos propuestas y comparo sus ventajas según costo, tiempo y necesidades del cliente.", efecto: { conflictos: 10, decisiones: 4 }, respuesta: "Escuchar y usar criterios compartidos ayuda a resolver el desacuerdo sin convertirlo en un enfrentamiento personal." },
      { tipo: "aceptable", texto: "Les pido que preparen una prueba pequeña para comparar ambas ideas.", efecto: { conflictos: 4, decisiones: 4 }, respuesta: "Probar las propuestas puede aportar datos. También conviene acordar cómo evaluarán los resultados." },
      { tipo: "mejorable", texto: "Elijo una propuesta de inmediato para terminar la discusión.", efecto: { conflictos: -7, relaciones: -3 }, respuesta: "Cerrar el tema puede calmar el momento, pero las personas pueden sentir que no fueron escuchadas." },
      { tipo: "mejorable", texto: "Dejo que lo resuelvan solos aunque el equipo ya esté tenso.", efecto: { conflictos: -8, estres: -3 }, respuesta: "Dar autonomía sirve, pero una tensión que afecta al equipo necesita atención." }
    ]
  },
  {
    titulo: "Una nueva integrante",
    contexto: "Valeria se unió al equipo. En las reuniones casi no habla y todavía no sabes cómo prefiere colaborar.",
    voz: "Valeria",
    dialogo: "Quiero aportar, pero aún estoy entendiendo cómo se organiza el equipo.",
    personas: ["Santiago", "Valeria", "Lucía"],
    habilidad: "relaciones",
    opciones: [
      { tipo: "mejor", texto: "Hablo con ella en privado, le pregunto cómo prefiere trabajar y le explico con quién colaborará.", efecto: { relaciones: 10, delegar: 3 }, respuesta: "Un espacio personal sin presión construye confianza y ayuda a integrar a la nueva integrante." },
      { tipo: "aceptable", texto: "Le envío una guía del proyecto y le ofrezco ayuda cuando la necesite.", efecto: { relaciones: 3, tiempo: 2 }, respuesta: "La guía ayuda, y una conversación directa puede facilitar que pregunte y participe." },
      { tipo: "mejorable", texto: "Le pido que presente su opinión frente a todo el grupo para que se integre.", efecto: { relaciones: -7, estres: -2 }, respuesta: "Pedirle que hable frente a todos puede presionarla antes de que conozca al equipo." },
      { tipo: "mejorable", texto: "Espero a que se adapte sola antes de acercarme.", efecto: { relaciones: -6 }, respuesta: "Sin una invitación clara, la integración puede tomar más tiempo." }
    ]
  },
  {
    titulo: "Una caída del sistema",
    contexto: "Un cliente informa que el sistema dejó de funcionar. El equipo está preocupado y varias personas hablan a la vez.",
    voz: "Alex",
    dialogo: "Ya estoy revisando los registros. ¿Quién coordina el aviso al cliente?",
    personas: ["Santiago", "Alex", "Marco"],
    habilidad: "estres",
    opciones: [
      { tipo: "mejor", texto: "Hago una pausa, reparto funciones y acordamos cada cuánto compartir avances.", efecto: { estres: 10, delegar: 4 }, respuesta: "Mantener la calma y dar estructura ayuda al equipo a actuar sin duplicar esfuerzos." },
      { tipo: "aceptable", texto: "Pido que todos se concentren en encontrar la causa antes de hacer otras tareas.", efecto: { estres: 3, decisiones: 2 }, respuesta: "Enfocarse puede ayudar, aunque repartir responsabilidades mejora la coordinación." },
      { tipo: "mejorable", texto: "Levanto la voz para que todos entiendan la gravedad.", efecto: { estres: -8, relaciones: -4 }, respuesta: "La presión ya es alta; elevar el tono puede reducir la confianza y dificultar la colaboración." },
      { tipo: "mejorable", texto: "Me encargo de todo yo para resolverlo más rápido.", efecto: { estres: -6, delegar: -6 }, respuesta: "Tomar todo el trabajo aumenta tu carga y desaprovecha las capacidades del equipo." }
    ]
  },
  {
    titulo: "Un cambio de último momento",
    contexto: "El cliente pide agregar una función dos días antes de entregar el proyecto. Aceptarla puede afectar el plazo y la calidad.",
    voz: "Marco",
    dialogo: "Podemos intentarlo, pero tendríamos que mover otras tareas.",
    personas: ["Santiago", "Marco", "Lucía"],
    habilidad: "decisiones",
    opciones: [
      { tipo: "mejor", texto: "Valoro impacto, costo y riesgo; propongo opciones al cliente y explico qué cambia en el plazo.", efecto: { decisiones: 10, tiempo: 3 }, respuesta: "Criterios claros y comunicación directa permiten decidir sin prometer algo imposible." },
      { tipo: "aceptable", texto: "Pido unas horas para revisar con el equipo el esfuerzo necesario.", efecto: { decisiones: 3, relaciones: 2 }, respuesta: "Consultar al equipo es útil si defines cuándo darás una respuesta." },
      { tipo: "mejorable", texto: "Acepto el cambio sin revisar el trabajo que ya está comprometido.", efecto: { decisiones: -7, tiempo: -6 }, respuesta: "Aceptar por evitar una conversación difícil puede poner en riesgo las entregas acordadas." },
      { tipo: "mejorable", texto: "Rechazo la petición sin preguntar qué necesidad del cliente intenta resolver.", efecto: { decisiones: -4, relaciones: -3 }, respuesta: "Antes de responder, entender la necesidad puede revelar una alternativa más simple." }
    ]
  },
  {
    titulo: "Una tarea atrasada",
    contexto: "Una parte del proyecto no se entregó a tiempo. El retraso afecta al resto del equipo y hay molestia.",
    voz: "Lucía",
    dialogo: "No sé qué pasó con esa entrega; ya está afectando la integración del producto.",
    personas: ["Santiago", "Lucía", "Valeria"],
    habilidad: "conflictos",
    opciones: [
      { tipo: "mejor", texto: "Hablo en privado con la persona, describo el impacto y acordamos un nuevo plan y fecha.", efecto: { conflictos: 10, relaciones: 4 }, respuesta: "Hablar con respeto, usar hechos y acordar próximos pasos atiende el problema sin exhibir a nadie." },
      { tipo: "aceptable", texto: "Pregunto al equipo qué apoyo hace falta para terminar la tarea.", efecto: { conflictos: 3, relaciones: 3 }, respuesta: "Buscar apoyo ayuda; también conviene hablar directamente con quien lleva la tarea." },
      { tipo: "mejorable", texto: "Reclamo en el chat grupal para que todos sepan quién causó el retraso.", efecto: { conflictos: -8, relaciones: -6 }, respuesta: "Exponer a alguien en público puede provocar una reacción defensiva y dañar la confianza." },
      { tipo: "mejorable", texto: "Hago la tarea yo mismo y no digo nada para evitar una discusión.", efecto: { conflictos: -5, tiempo: -5 }, respuesta: "Evitar la conversación te sobrecarga y no ayuda a prevenir otro retraso." }
    ]
  },
  {
    titulo: "Una semana llena de reuniones",
    contexto: "Tu calendario tiene siete juntas y varios pendientes que requieren concentración. Sientes que no avanzas.",
    voz: "Daniela",
    dialogo: "¿Podemos enviar una agenda antes de la próxima reunión para llegar preparados?",
    personas: ["Santiago", "Daniela", "Marco"],
    habilidad: "tiempo",
    opciones: [
      { tipo: "mejor", texto: "Aparto bloques de concentración, pido agenda para las juntas y reviso mis prioridades cada día.", efecto: { tiempo: 10, estres: 3 }, respuesta: "Proteger tiempo para trabajar y dar estructura a las reuniones ayuda a recuperar el enfoque." },
      { tipo: "aceptable", texto: "Muevo algunas tareas no urgentes para otro día y confirmo qué reuniones requieren mi presencia.", efecto: { tiempo: 4, decisiones: 2 }, respuesta: "Revisar prioridades es útil; reserva también momentos concretos para avanzar en tus pendientes." },
      { tipo: "mejorable", texto: "Acepto todas las reuniones para no perderme ninguna decisión.", efecto: { tiempo: -7, estres: -3 }, respuesta: "Asistir a todo reduce el tiempo disponible para completar trabajo importante." },
      { tipo: "mejorable", texto: "Dejo que cada día se organice según lo que aparezca.", efecto: { tiempo: -8 }, respuesta: "Sin una revisión diaria, lo urgente puede desplazar lo que ya habías planeado." }
    ]
  },

    {
    titulo: "Un integrante pide más autonomía",
    contexto: "Lucía terminó sus tareas antes de tiempo y pregunta si puede tomar decisiones sobre una nueva función.",
    voz: "Lucía",
    dialogo: "Ya terminé mi parte. Me gustaría encargarme de la nueva función y proponer cómo resolverla.",
    personas: ["Santiago", "Lucía", "Marco"],
    habilidad: "delegar",
    opciones: [
      {
        tipo: "mejor",
        texto: "Le explico el objetivo y los límites, le doy autonomía para proponer una solución y acordamos revisar un avance clave.",
        efecto: { delegar: 10, relaciones: 3 },
        respuesta: "Dar autonomía con objetivos y límites claros fortalece la confianza y el empoderamiento."
      },
      {
        tipo: "aceptable",
        texto: "Le asigno la función y acordamos revisar juntos cada avance.",
        efecto: { delegar: 3, estres: -2 },
        respuesta: "Acordar revisiones ayuda, aunque puede darle más espacio para decidir cómo hacer el trabajo."
      },
      {
        tipo: "mejorable",
        texto: "Le indico exactamente qué hacer y le pido que no cambie nada.",
        efecto: { delegar: -7, relaciones: -3 },
        respuesta: "Las instrucciones detalladas pueden limitar su iniciativa y aprendizaje."
      },
      {
        tipo: "mejorable",
        texto: "Acepto que haga cualquier cambio sin acordar límites ni revisar el impacto.",
        efecto: { delegar: -5, decisiones: -4 },
        respuesta: "La autonomía funciona mejor con objetivos y límites acordados."
      }
    ]
  }

];

const acciones = {
  tiempo: "Acción 05: planear mi semana y proteger mis bloques de tiempo.",
  estres: "Acción 08: reservar tiempo para aprender y descansar.",
  relaciones: "Acción 02: cuidar mis relaciones profesionales.",
  conflictos: "Acción 01: liderar reuniones y pedir retroalimentación.",
  delegar: "Acción 06: delegar según las fortalezas del equipo.",
  decisiones: "Acción 07: decidir con método bajo presión."
};

let juego;
let reloj = null;

function actualizarBotonVoz(estado) {
  const boton = document.getElementById("btn-voz-mision");
  if (!boton) return;

  boton.dataset.estado = estado;

  if (estado === "hablando") {
    boton.textContent = "⏸ Pausar lectura";
    boton.setAttribute("aria-label", "Pausar lectura");
    boton.setAttribute("aria-pressed", "true");
  } else if (estado === "pausado") {
    boton.textContent = "▶ Continuar lectura";
    boton.setAttribute("aria-label", "Continuar lectura");
    boton.setAttribute("aria-pressed", "true");
  } else {
    boton.textContent = "▶ Escuchar misión";
    boton.setAttribute("aria-label", "Escuchar la misión");
    boton.setAttribute("aria-pressed", "false");
  }
}

function hablar(texto) {
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no permite reproducir voz.");
    return;
  }

  window.speechSynthesis.cancel();

  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-MX";
  voz.rate = 0.95;
  voz.pitch = 1;

  voz.onstart = () => actualizarBotonVoz("hablando");
  voz.onend = () => actualizarBotonVoz("listo");
  voz.onerror = () => actualizarBotonVoz("listo");

  window.speechSynthesis.speak(voz);
}

function escucharMision() {
  const sintesis = window.speechSynthesis;

  if (sintesis.speaking && !sintesis.paused) {
    sintesis.pause();
    actualizarBotonVoz("pausado");
    return;
  }

  if (sintesis.paused) {
    sintesis.resume();
    actualizarBotonVoz("hablando");
    return;
  }

  if (!juego.iniciado) {
    hablar(
      `Tu misión. Dirige a tu equipo de software. Resuelve ${misiones.length} situaciones de liderazgo. Tus elecciones cambian tus puntos y los medidores de habilidades. Después de cada respuesta verás una explicación.`
    );
    return;
  }

  const m = misiones[juego.mision];
  hablar(`Misión ${juego.mision + 1}. ${m.titulo}. ${m.contexto} ${m.voz} dice: ${m.dialogo}`);
}

function mezclar(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function nuevoJuego(presion = false) {
  juego = {
    iniciado: false,
    terminado: false,
    mision: 0,
    presion,
    tiempo: 25,
    puntos: 0,
    racha: 0,
    mejorRacha: 0,
    elegida: null,
    habilidades: Object.fromEntries(Object.keys(habilidades).map((k) => [k, 50])),
    opciones: mezclar(misiones[0].opciones)
  };
}

function personaje(nombre) {
  const p = equipo[nombre];

  return `
    <div class="tarjeta-personaje">
      <div class="avatar-persona" style="--piel:${p.piel};--cabello:${p.cabello};--camisa:${p.camisa}">
        <i class="pelo"></i>
        <i class="cara"></i>
        <i class="ojos"></i>
        <i class="sonrisa"></i>
        <i class="cuerpo"></i>
        <i class="brazo izquierdo"></i>
        <i class="brazo derecho"></i>
        <i class="piernas"></i>
      </div>
      <b>${nombre}</b>
      <small>${p.rol}</small>
    </div>`;
}

function barrasHabilidades() {
  return `
    <div class="habilidades-juego">
      ${Object.entries(habilidades).map(([clave, nombre]) => `
        <div class="medidor-habilidad">
          <label><span>${nombre}</span><b>${juego.habilidades[clave]}</b></label>
          <div><i style="width:${juego.habilidades[clave]}%"></i></div>
        </div>`).join("")}
    </div>`;
}

function pantallaInicio() {
  return `
    <div class="inicio-juego">
      <p class="mini-etiqueta">Tu misión</p>
      <h2>Dirige a tu equipo de software</h2>
      <p>Resuelve nueve situaciones de liderazgo. Tus elecciones cambian tus puntos y los medidores de habilidades. Después de cada respuesta verás una explicación.</p>
      <label class="modo-presion">
        <input id="modo-presion" type="checkbox">
        Activar modo presión: 25 segundos para decidir
      </label>
      <button class="boton-juego" data-accion="empezar">Empezar simulación</button>
    </div>`;
}

function pantallaMision() {
  const m = misiones[juego.mision];
  const mejor = m.opciones.find((o) => o.tipo === "mejor");
  const relojHTML = juego.presion && juego.elegida === null
    ? `<div class="reloj"><div style="width:${juego.tiempo * 4}%"></div></div><p class="tiempo-restante">Tiempo para decidir: ${juego.tiempo} s</p>`
    : "";

  return `
    <div class="mision-cabecera">
      <span class="etiqueta-mision">MISIÓN ${juego.mision + 1} / ${misiones.length}</span>
      <div class="estadisticas-juego">
        <span>PUNTOS <b>${juego.puntos}</b></span>
        <span>RACHA <b>${juego.racha} 🔥</b></span>
      </div>
    </div>

    <div class="mision-progreso">
      ${misiones.map((_, i) => `<span class="${i < juego.mision ? "completada" : i === juego.mision ? "actual" : ""}"></span>`).join("")}
    </div>

    ${barrasHabilidades()}

    <section class="escena">
      <div class="escena-texto">
        <p class="mini-etiqueta">Situación del equipo</p>
        <h2>${m.titulo}</h2>
        <p>${m.contexto}</p>
        <button class="boton-voz-situacion" type="button" data-voz-situacion>
        🔊 Escuchar situación
        </button>
      </div>
      <div class="personajes">${m.personas.map(personaje).join("")}</div>
      <div class="dialogo"><b>${m.voz} dice:</b> “${m.dialogo}”</div>
    </section>

    ${relojHTML}

    <div class="opciones-juego">
      ${juego.opciones.map((o, i) => {
        let clases = "opcion-juego";
        if (juego.elegida) {
          if (o === juego.elegida) clases += " seleccionada";
          if (o.tipo === "mejor") clases += " respuesta-mejor";
          if (o.tipo === "mejorable") clases += " respuesta-mejorable";
          if (o.tipo === "aceptable") clases += " respuesta-aceptable";
        }
        return `<button class="${clases}" data-opcion="${i}" ${juego.elegida ? "disabled" : ""}><span>${String.fromCharCode(65 + i)}</span>${o.texto}</button>`;
      }).join("")}
    </div>

    ${juego.elegida ? `
      <div class="retro-juego">
        <b>${juego.elegida.tipo === "mejor" ? "¡Buena decisión!" : "Una oportunidad para mejorar"}</b>
        <p>${juego.elegida.respuesta}</p>
        ${juego.elegida.tipo !== "mejor" ? `<p><strong>Una opción más efectiva:</strong> ${mejor.texto}</p>` : ""}
      </div>
      <button class="boton-juego" data-accion="siguiente">${juego.mision === misiones.length - 1 ? "Ver resultados" : "Siguiente situación →"}</button>
    ` : ""}
  `;
}

function pantallaResultados() {
  const orden = Object.entries(juego.habilidades).sort((a, b) => b[1] - a[1]);
  const promedio = Math.round(orden.reduce((suma, [, valor]) => suma + valor, 0) / orden.length);
  const nivel = promedio >= 75 ? "Liderazgo sólido" : promedio >= 58 ? "Liderazgo en desarrollo" : "Liderazgo por fortalecer";

  return `
    <div class="resultado-juego">
      <p class="mini-etiqueta">Fin de la simulación</p>
      <h2>${nivel}</h2>
      <p>Terminaste con <b>${juego.puntos} puntos</b> y tu mejor racha fue de <b>${juego.mejorRacha}</b> buenas decisiones.</p>
      <h3>Así quedaron tus habilidades</h3>
      <div class="resultados-habilidades">
        ${orden.map(([clave, valor]) => `
          <div class="resultado-fila">
            <span>${habilidades[clave]}</span>
            <div><i style="width:${valor}%"></i></div>
            <b>${valor}</b>
          </div>`).join("")}
      </div>
      <div class="recomendacion-juego">
        <b>Un siguiente paso para ti</b>
        <p>${acciones[orden[orden.length - 1][0]]}</p>
      </div>
      <button class="boton-juego" data-accion="reiniciar">Jugar otra vez</button>
      <button class="boton-secundario-juego" data-accion="reiniciar-presion">Intentar en modo presión</button>
    </div>`;
}

function detenerReloj() {
  if (reloj) {
    clearInterval(reloj);
    reloj = null;
  }
}

function seleccionar(opcion) {
  if (juego.elegida) return;

  detenerReloj();
  juego.elegida = opcion;

  const puntos = opcion.tipo === "mejor" ? 100 : opcion.tipo === "aceptable" ? 60 : 25;
  juego.puntos += puntos;

  if (opcion.tipo === "mejor") {
    juego.racha++;
    juego.mejorRacha = Math.max(juego.mejorRacha, juego.racha);
  } else {
    juego.racha = 0;
  }

  Object.entries(opcion.efecto).forEach(([clave, cambio]) => {
    juego.habilidades[clave] = Math.max(0, Math.min(100, juego.habilidades[clave] + cambio));
  });

  dibujar();
}

function iniciarReloj() {
  detenerReloj();
  if (!juego.presion || juego.elegida) return;

  reloj = setInterval(() => {
    juego.tiempo--;
    const relojTexto = app.querySelector(".tiempo-restante");
    const relojBarra = app.querySelector(".reloj div");

    if (relojTexto) relojTexto.textContent = `Tiempo para decidir: ${juego.tiempo} s`;
    if (relojBarra) relojBarra.style.width = `${juego.tiempo * 4}%`;

    if (juego.tiempo <= 0) {
      detenerReloj();
      seleccionar({
        tipo: "mejorable",
        texto: "Se terminó el tiempo.",
        respuesta: "Cuando el tiempo se agota, una pausa breve y criterios claros pueden ayudarte a elegir.",
        efecto: { decisiones: -6, estres: -6 }
      });
      juego.puntos -= 25;
      juego.racha = 0;
      dibujar();
    }
  }, 1000);
}

function dibujar() {
  if (!juego.iniciado) {
    app.innerHTML = pantallaInicio();
  } else if (juego.terminado) {
    app.innerHTML = pantallaResultados();
  } else {
    app.innerHTML = pantallaMision();
  }

  if (juego.presion && juego.iniciado && !juego.terminado && !juego.elegida) {
    iniciarReloj();
  }
}

app.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
   if (!boton) return;

    if (boton.dataset.vozSituacion !== undefined) {
    const m = misiones[juego.mision];
    hablar(`Situación: ${m.contexto} ${m.voz} dice: ${m.dialogo}`);
    return;
   }

  if (boton.dataset.accion === "empezar") {
    juego.presion = document.getElementById("modo-presion").checked;
    juego.iniciado = true;
    dibujar();
  }

  if (boton.dataset.opcion !== undefined) {
    seleccionar(juego.opciones[Number(boton.dataset.opcion)]);
  }

  if (boton.dataset.accion === "siguiente") {
    if (juego.mision === misiones.length - 1) {
      juego.terminado = true;
    } else {
      juego.mision++;
      juego.elegida = null;
      juego.tiempo = 25;
      juego.opciones = mezclar(misiones[juego.mision].opciones);
    }
    dibujar();
  }

  if (boton.dataset.accion === "reiniciar" || boton.dataset.accion === "reiniciar-presion") {
    detenerReloj();
    nuevoJuego(boton.dataset.accion === "reiniciar-presion");
    juego.iniciado = true;
    dibujar();
  }
});

nuevoJuego();
dibujar();

document.getElementById("btn-voz-mision").addEventListener("click", escucharMision);
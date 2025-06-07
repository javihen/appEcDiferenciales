function resolverrk4() {
  const rk4 = rk4Method();
  llenarTabla("tablaRK4", rk4, "rk4");
}

function resolverHeun() {
  const heun = heunMethod();
  llenarTabla("tablaRK4", heun, "heun");
}

function rk4Method() {
  const res = [[t0, N0]];
  for (let i = 1; i <= n; i++) {
    const t = t0 + (i - 1) * h;
    const y = res[i - 1][1];
    const k1 = h * f(t, y);
    const k2 = h * f(t + h / 2, y + k1 / 2);
    const k3 = h * f(t + h / 2, y + k2 / 2);
    const k4 = h * f(t + h, y + k3);
    const yNext = y + (1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    res.push([t + h, yNext]);
  }
  return res;
}

function heunMethod() {
  const res = [[t0, N0]];
  for (let i = 1; i <= n; i++) {
    const t = t0 + (i - 1) * h;
    const y = res[i - 1][1];
    const pred = y + h * f(t, y);
    const corr = y + (h / 2) * (f(t, y) + f(t + h, pred));
    res.push([t + h, corr]);
  }
  return res;
}

function llenarTabla(id, datos, met) {
  const tbody = document.getElementById(id);
  const metodoT = document.getElementById("metodoT");
  const contenedorI = document.getElementById("contenedorI");
  const nuevaImagen = document.createElement("img");
  nuevaImagen.className = "w-1/2 mx-auto hover:scale-125 transition-transform";
  if (met == "rk4") {
    metodoT.innerText = "Tabla de datos - Runge Kutta";
    nuevaImagen.src = "img/metodoRK4.png";
  } else {
    metodoT.innerText = "Tabla de datos - Heun";
    nuevaImagen.src = "img/metodoHeun.png";
  }
  contenedorI.innerHTML = "";
  contenedorI.appendChild(nuevaImagen);
  tbody.innerHTML = "";
  for (const [t, N] of datos) {
    const fila = `<tr><td class='border px-2 text-center'>${t.toFixed(
      2
    )}</td><td class='border px-2 text-center'>${N.toFixed(2)}</td></tr>`;
    tbody.innerHTML += fila;
  }
}

/**Function para generar los datos de los metodos  */
function generarGrafica() {
  const heun = heunMethod();
  const rk4 = rk4Method();
  graficar(heun, rk4);
  document.getElementById("miModal").classList.remove("hidden");
}

/* Disenio de la grafica de los dos metodos como comparacion*/
function graficar(datosHeun, datosRK4) {
  const ctx = document.getElementById("grafico").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: datosHeun.map(([t]) => t),
      datasets: [
        {
          label: "Heun",
          data: datosHeun.map(([, N]) => N),
          borderColor: "rgb(59, 130, 246)",
          fill: false,
        },
        {
          label: "RK4",
          data: datosRK4.map(([, N]) => N),
          borderColor: "rgb(16, 185, 129)",
          fill: false,
        },
      ],
    },
  });
}

function obtenerCapturados() {
  try {
    return JSON.parse(localStorage.getItem("capturados")) || [];
  } catch {
    return [];
  }
}

let capturados = obtenerCapturados();

/**
 * 🔹 Marca una persona como capturada desde el detalle
 */
function marcarCapturado(uid, nombre, imagen) {
  capturados = obtenerCapturados();

  if (!uid || !nombre) return;

  const yaExiste = capturados.some(p => p.uid === uid);
  if (yaExiste) return;

  const fecha = new Date().toLocaleString();
  capturados.push({
    uid,
    nombre,
    imagen: imagen || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    fecha
  });

  localStorage.setItem("capturados", JSON.stringify(capturados));
}

/**
 * 🔹 Renderiza el reporte de capturados
 */
function Capturados() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <section class="c-capturados">
      <h2>Reporte de Prisioneros Capturados</h2>
      <p>Casos marcados como capturados por el usuario.</p>
    </section>
  `;

  capturados = obtenerCapturados();

  if (capturados.length === 0) {
    root.innerHTML += `
      <div class="c-vacio">
        <p>No se han reportado capturas aún.</p>
      </div>
    `;
    return;
  }

  let html = `<section class="c-lista">`;
  capturados.forEach(p => {
    html += `
      <div class="c-card-capturado" onclick="Detalle('${p.uid}')">
        <img src="${p.imagen || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}"
             alt="${p.nombre || "Desconocido"}"
             width="100" height="100" loading="lazy">
        <div>
          <p><strong>${p.nombre || "Sin nombre"}</strong></p>
        </div>
      </div>
    `;
  });
  html += `</section>`;

  root.innerHTML += html;
}
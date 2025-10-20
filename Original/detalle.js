async function Detalle(uid) {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando detalle...</p>";

  try {
    const res = await fetch("https://api.fbi.gov/wanted/v1/list");
    const data = await res.json();
    const persona = data.items.find(p => p.uid === uid);

    if (!persona) {
      root.innerHTML = "<p>No se encontró información para este caso.</p>";
      return;
    }

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const esFavorito = favoritos.some(p => p.uid === uid);
    const imagen = persona.images?.[0]?.original ||
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

    root.innerHTML = `
      <section class="c-detalle">
        <img src="${imagen}" alt="${persona.title}" width="220">
        <h2>${persona.title}</h2>
        <p><strong>Delitos:</strong> ${persona.subjects?.join(", ") || "No especificados"}</p>
        <p><strong>Descripción:</strong> ${persona.description || "Sin descripción disponible"}</p>
        <p><strong>Sexo:</strong> ${persona.sex || "N/A"}</p>
        <p><strong>Raza:</strong> ${persona.race || "N/A"}</p>
        <p><strong>Recompensa:</strong> ${persona.reward_text || "No especificada"}</p>

        <button onclick="toggleFavorito('${persona.uid}', '${persona.title}', '${imagen}')">
          <span id="estrella-${persona.uid}">${esFavorito ? "⭐" : "☆"}</span> Favorito
        </button>

        <button onclick="marcarCapturado('${persona.uid}', '${persona.title}', '${imagen}')">
          👮 Marcar Capturado
        </button>
      </section>
    `;
  } catch (error) {
    console.error("Error al obtener detalle:", error);
    root.innerHTML = "<p>Error al cargar el detalle.</p>";
  }
}

/**
 * 🔹 Agregar o quitar un favorito
 */
function toggleFavorito(uid, nombre, imagen) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(p => p.uid === uid);
  let esFavorito = false;

  if (existe) {
    favoritos = favoritos.filter(p => p.uid !== uid);
  } else {
    favoritos.push({ uid, nombre, imagen });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  const boton = document.querySelector(`#estrella-${uid}`);
  if (boton) boton.textContent = esFavorito ? "⭐" : "☆";
}
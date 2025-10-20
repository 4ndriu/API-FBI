const CATEGORIES = [
  { label: "Todos", key: "" },
  { label: "Jovenes mas buscados", key: "fugitive" },
  { label: "Terroristas mas buscados", key: "terror" },
  { label: "Crimenes contra niños", key: "child" },
  { label: "Crimenes violentos", key: "murder" },
  { label: "Personas perdidas", key: "kidnap" },
  { label: "Delitos de cuello blanco", key: "fraud" },
];

function GenerarLista(arrayPersonas) {
  if (!arrayPersonas || arrayPersonas.length === 0) {
    return `<p>No hay información disponible.</p>`;
  }

  return arrayPersonas
    .map(p => {
      const id = p.uid || "";
      const nombre = p.title || "Sin nombre";
      const crimen = (p.subjects || []).join(", ") || "Sin categoría";
      const imagen = p.images?.[0]?.thumb ||
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

      return `
        <div class="c-card" onclick="Detalle('${id}')">
          <img src="${imagen}" alt="${nombre}" width="120" height="120" loading="lazy">
          <p><strong>${nombre}</strong></p>
          <p><small>${crimen}</small></p>
        </div>
      `;
    })
    .join("");
}

function Home(array = personas) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // --- Filtros por categoría ---
  const filtros = document.createElement("div");
  filtros.classList.add("c-filtros");

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.label;

    // Estilo activo en “Todos”
    if (cat.key === "") btn.classList.add("activo");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".c-filtros button").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");

      if (cat.key === "") {
        document.getElementById("la-lista").innerHTML = GenerarLista(personas);
      } else {
        const filtradas = personas.filter(p =>
          (p.title || "").toLowerCase().includes(cat.key) ||
          (p.description || "").toLowerCase().includes(cat.key) ||
          (p.subjects || []).join(" ").toLowerCase().includes(cat.key)
        );
        document.getElementById("la-lista").innerHTML = GenerarLista(filtradas);
      }
    });

    filtros.appendChild(btn);
  });

  // --- Buscador ---
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.placeholder = "Buscar por nombre o palabra clave...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  // --- Lista de resultados (por defecto: todos) ---
  const lista = document.createElement("div");
  lista.classList.add("c-lista");
  lista.id = "la-lista";
  lista.innerHTML = GenerarLista(array);

  root.appendChild(filtros);
  root.appendChild(buscador);
  root.appendChild(lista);
}

/**
 * 🔹 Buscador local por texto
 */
function buscadorfuncion(texto) {
  if (texto.trim().length < 3) {
    document.getElementById("la-lista").innerHTML = GenerarLista(personas);
    return;
  }

  const filtradas = personas.filter(p =>
    (p.title || "").toLowerCase().includes(texto.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(texto.toLowerCase()) ||
    (p.subjects || []).join(" ").toLowerCase().includes(texto.toLowerCase())
  );

  document.getElementById("la-lista").innerHTML = GenerarLista(filtradas);
}
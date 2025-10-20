function Favoritos() {
  const root = document.getElementById("root");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  root.innerHTML = "<h2>⭐ Casos Interesantes</h2>";

  if (favoritos.length === 0) {
    root.innerHTML += "<p>No tienes casos marcados como favoritos.</p>";
    return;
  }

  let html = "<section class='c-favoritos'>";
  favoritos.forEach(p => {
    html += `
      <div class="c-favorito" onclick="Detalle('${p.uid}')">
        <img src="${p.imagen}" alt="${p.nombre}" width="100" height="100">
        <p>${p.nombre}</p>
      </div>
    `;
  });
  html += "</section>";

  root.innerHTML += html;
}
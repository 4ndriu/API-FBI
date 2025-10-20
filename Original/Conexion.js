let personas = [];

async function conexion() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando datos del FBI...</p>";

  try {
    const res = await fetch("https://api.fbi.gov/wanted/v1/list?pageSize=40");
    const data = await res.json();

    personas = data.items || [];

    if (personas.length === 0) {
      root.innerHTML = "<p>No se encontraron casos.</p>";
      return;
    }

    // Llama al Home para mostrar los datos
    Home(personas);
  } catch (error) {
    console.error("Error de conexión:", error);
    root.innerHTML = "<p>Error al cargar datos. Revisa tu conexión.</p>";
  }
}

// =============================
// MOSTRAR INFORMACIÓN AL INICIO
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const introVisto = localStorage.getItem("introVisto");

  if (!introVisto) {
    // Mostrar pantalla informativa
    Informativa(true);
  } else {
    // Cargar contenido normal
    conexion();
  }
});
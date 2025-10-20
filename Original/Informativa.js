function Informativa(inicial = false) {
  const root = document.getElementById("root");

  root.innerHTML = `
    <section class="c-informativa">
      <h2>🔍 Bienvenido al Portal del FBI</h2>

      <p>Esta aplicación usa información pública del 
      <strong>Federal Bureau of Investigation (FBI)</strong>.</p>

      <p>Aquí podrás conocer los casos más buscados, 
      ver detalles, marcar favoritos y jugar para descubrir al culpable.</p>

      <h3>⚠️ Aviso</h3>
      <p>Los datos provienen de la 
      <a href="https://api.fbi.gov/" target="_blank">API oficial del FBI</a> 
      y son solo para fines educativos.</p>

      <h3>👨‍💻 Proyecto educativo</h3>
      <p>Desarrollado para practicar manejo de APIs, almacenamiento local y 
      diseño de interfaces adaptables a móviles.</p>

      <div style="text-align:center; margin-top:20px;">
        <button id="btnContinuar">Siguiente ➜</button>
      </div>
    </section>
  `;

  const btn = document.getElementById("btnContinuar");
  btn.onclick = () => {
    localStorage.setItem("introVisto", "true");
    conexion(); // continuar con la carga normal
  };
}
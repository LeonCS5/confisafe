// ===== CONFISAFE - DASHBOARD JS =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Painel ConfiSafe carregado.");

  const menuLinks = document.querySelectorAll(".sidebar-menu a");
  const logoutBtn = document.getElementById("logoutBtn");

  // === Detecta página atual e marca o menu ativo ===
  const currentPage = window.location.pathname.split("/").pop(); // Ex: inicial.html
  menuLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // === Clique nos links para atualizar o ativo ===
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // === Botão de sair ===
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Você saiu do sistema."); // Trocar depois por lógica real de logout
      window.location.href = "../pages/login.html";
    });
  }
});

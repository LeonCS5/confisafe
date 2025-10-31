/* ============================================================
   CONFISAFE - DASHBOARD COMPLETA
   Autor: Michael Coutinho
   Organização e refinamento: GPT-5
   ============================================================ */

/* ============================================================
   DADOS DOS RELATÓRIOS
   ============================================================ */
const reportData = {
  epi: {
    title: "Conformidade com EPI",
    description: "Relatório detalhado sobre o uso de Equipamentos de Proteção Individual",
    metrics: {
      "Conformidade Geral": "92%",
      "Funcionários Regulares": "46",
      "Funcionários Irregulares": "4",
      "EPI Mais Utilizado": "Capacete de Segurança",
      "EPI Menos Utilizado": "Protetor Auditivo",
    },
    placeholder:
      "Digite observações sobre conformidade de EPIs, equipamentos com problemas, sugestões de melhorias...",
  },

  excecoes: {
    title: "Relatório de Exceções",
    description: "Casos de não conformidade e equipamentos com problemas",
    metrics: {
      "Total de Exceções": "5",
      "Exceções Críticas": "2",
      "Exceções Resolvidas": "3",
      "Equipamentos com Falhas": "Capacete, Luvas",
      "Tempo Médio de Resolução": "2 dias",
    },
    placeholder:
      "Registre detalhes das exceções, ações tomadas, equipamentos problemáticos e medidas corretivas...",
  },

  atividade: {
    title: "Atividade do Usuário",
    description: "Monitoramento de acesso e atividades dos funcionários",
    metrics: {
      "Usuários Ativos Hoje": "18",
      "Acessos no Mês": "245",
      "Horário de Pico": "14:00 - 16:00",
      "Usuários com Acesso Expirado": "2",
      "Tentativas de Acesso Bloqueadas": "1",
    },
    placeholder:
      "Anote observações sobre padrões de acesso, usuários com problemas, horários críticos...",
  },

  incidentes: {
    title: "Relatório de Incidentes",
    description: "Registro e acompanhamento de incidentes de segurança",
    metrics: {
      "Incidentes Registrados": "3",
      "Incidentes Graves": "1",
      "Incidentes Resolvidos": "2",
      "Tempo Médio de Resposta": "45 min",
      "Área com Mais Incidentes": "Setor de Produção",
    },
    placeholder:
      "Descreva detalhes dos incidentes, causas identificadas, ações emergenciais e prevenções futuras...",
  },
};

/* ============================================================
   ESTADO DAS ANOTAÇÕES
   ============================================================ */
let savedNotes = {
  epi: "",
  excecoes: "",
  atividade: "",
  incidentes: "",
};

/* ============================================================
   INICIALIZAÇÃO GERAL
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Painel ConfiSafe carregado.");

  initializeModalSystem();
  initializeChart();
  loadSavedNotes();
  initializeDashboardUI();
});

/* ============================================================
   SISTEMA DE MODAL
   ============================================================ */
function initializeModalSystem() {
  const modal = document.getElementById("popupModal");
  const closeBtn = document.getElementById("closeModal");
  const saveBtn = document.getElementById("saveNote");

  document.querySelectorAll(".report-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.type));

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.type);
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") closeModal();
  });

  saveBtn.addEventListener("click", saveNote);
}

/* ============================================================
   FUNÇÕES DE MODAL
   ============================================================ */
function openModal(reportType) {
  const modal = document.getElementById("popupModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalMetrics = document.getElementById("modalMetrics");
  const modalTextarea = document.getElementById("modalTextarea");

  const data = reportData[reportType];
  if (!data) return;

  document.querySelectorAll(".sidebar-menu a").forEach((item) => item.blur());

  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalMetrics.innerHTML = "";

  for (const [key, value] of Object.entries(data.metrics)) {
    const metricItem = document.createElement("div");
    metricItem.className = "metric-item";
    metricItem.innerHTML = `
      <span class="metric-label">${key}</span>
      <span class="metric-value">${value}</span>
    `;
    modalMetrics.appendChild(metricItem);
  }

  modalTextarea.placeholder = data.placeholder;
  modalTextarea.value = savedNotes[reportType] || "";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  modal.setAttribute("data-current-report", reportType);

  setTimeout(() => modalTextarea.focus(), 100);
}

function closeModal() {
  const modal = document.getElementById("popupModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  modal.removeAttribute("data-current-report");
}

/* ============================================================
   ANOTAÇÕES - SALVAR E CARREGAR
   ============================================================ */
function saveNote() {
  const modal = document.getElementById("popupModal");
  const reportType = modal.getAttribute("data-current-report");
  const textarea = document.getElementById("modalTextarea");

  if (!reportType || !textarea) return;

  savedNotes[reportType] = textarea.value.trim();
  localStorage.setItem("confisafe_notes", JSON.stringify(savedNotes));

  showNotification("Anotação salva com sucesso!", "success");
  setTimeout(closeModal, 800);
}

function loadSavedNotes() {
  const saved = localStorage.getItem("confisafe_notes");
  if (!saved) return;

  try {
    savedNotes = JSON.parse(saved);
  } catch (e) {
    console.error("Erro ao carregar anotações:", e);
  }
}

/* ============================================================
   SISTEMA DE NOTIFICAÇÃO
   ============================================================ */
function showNotification(message, type = "success") {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type === "error" ? "notification-error" : ""}`;
  notification.textContent = message;
  notification.setAttribute("role", "alert");
  notification.setAttribute("aria-live", "polite");

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* ============================================================
   GRÁFICO DE RELATÓRIOS
   ============================================================ */
function initializeChart() {
  const ctx = document.getElementById("relatorioGrafico");
  if (!ctx) return;

  try {
    new Chart(ctx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
          {
            label: "Acessos ao Sistema",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#166cc7",
            backgroundColor: "rgba(22, 108, 199, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.1)" } },
          x: { grid: { display: false } },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao inicializar gráfico:", error);
  }
}

/* ============================================================
   INTERFACE DO DASHBOARD
   ============================================================ */
function initializeDashboardUI() {
  const menuLinks = document.querySelectorAll(".sidebar-menu a");
  const logoutBtn = document.getElementById("logoutBtn");

  // === Gerenciar menu ativo ===
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
      alert("Você saiu do sistema."); // Substituir por lógica real
      window.location.href = "../pages/login.html";
    });
  }
}

/* ============================================================
   EXPORTAÇÃO GLOBAL
   ============================================================ */
window.openModal = openModal;
window.closeModal = closeModal;
window.saveNote = saveNote;

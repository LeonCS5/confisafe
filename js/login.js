  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // impede pagina de recarregar

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Verificação
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Por enquanto, simula um login bem-sucedido
    alert("Login realizado com sucesso!");

    // Redireciona para a página inicial
    window.location.href = "/index.html";
  });
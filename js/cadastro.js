  document.querySelector(".login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // impede pagina de recarregar

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    // Validação
    if (!nome || !email || !senha || !confirmar) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    // Mensagem de sucesso
    alert("Cadastro concluído com sucesso!");

    // Limpa o formulário
    e.target.reset();

    // Redirecionar
    window.location.href = "/index.html";
  });
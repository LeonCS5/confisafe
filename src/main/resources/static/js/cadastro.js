// Máscaras de Formatação
function aplicarMascaraCNPJ(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
  valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
  valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
  return valor;
}

function aplicarMascaraCPF(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return valor;
}

function aplicarMascaraTelefone(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  return valor;
}

// Aplicar máscaras nos campos
document.getElementById('cnpj').addEventListener('input', function(e) {
  e.target.value = aplicarMascaraCNPJ(e.target.value);
});

document.getElementById('cpf').addEventListener('input', function(e) {
  e.target.value = aplicarMascaraCPF(e.target.value);
});

document.getElementById('telefone').addEventListener('input', function(e) {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

// Validação do Formulário
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Validar CNPJ
  const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
  if (cnpj.length !== 14) {
    alert('⚠️ CNPJ inválido! Digite os 14 dígitos.');
    return;
  }

  // Validar CPF
  const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
  if (cpf.length !== 11) {
    alert('⚠️ CPF inválido! Digite os 11 dígitos.');
    return;
  }

  // Validar senhas
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha.length < 8) {
    alert('⚠️ A senha deve ter no mínimo 8 caracteres!');
    return;
  }

  if (senha !== confirmarSenha) {
    alert('⚠️ As senhas não coincidem!');
    return;
  }

  // Validar força da senha
  const temLetra = /[a-zA-Z]/.test(senha);
  const temNumero = /\d/.test(senha);

  if (!temLetra || !temNumero) {
    alert('⚠️ A senha deve conter letras e números!');
    return;
  }

  // Verificar termos
  if (!document.getElementById('termos').checked) {
    alert('⚠️ Você precisa aceitar os Termos de Uso e Política de Privacidade.');
    return;
  }

  // Sucesso!
  alert('✅ Cadastro realizado com sucesso!\n\n30 dias de teste gratuito ativados!\nVerifique seu e-mail.');
  
  // Redirecionar para login
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
});
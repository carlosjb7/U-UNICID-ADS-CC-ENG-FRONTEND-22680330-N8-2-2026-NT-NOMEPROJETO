"use strict";

// O formulário é uma simulação local: nenhum dado é enviado ou armazenado.
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-contato");

  if (!formulario) {
    return;
  }

  const nome = document.getElementById("nome");
  const telefone = document.getElementById("telefone");
  const dataViagem = document.getElementById("data");
  const mensagem = document.getElementById("mensagem");
  const status = document.getElementById("status-formulario");

  function dataLocalAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return ano + "-" + mes + "-" + dia;
  }

  function validarCampos() {
    dataViagem.min = dataLocalAtual();
    nome.setCustomValidity(
      nome.value.trim().length >= 2 ? "" : "Informe um nome com pelo menos 2 caracteres."
    );

    const digitos = telefone.value.replace(/\D/g, "");
    telefone.setCustomValidity(
      digitos.length >= 10 && digitos.length <= 15
        ? ""
        : "Informe um telefone com 10 a 15 dígitos, incluindo o DDD."
    );

    dataViagem.setCustomValidity(
      dataViagem.value && dataViagem.value < dataViagem.min
        ? "Escolha a data de hoje ou uma data futura."
        : ""
    );

    mensagem.setCustomValidity(
      mensagem.value.trim().length >= 10
        ? ""
        : "Escreva uma mensagem com pelo menos 10 caracteres."
    );
  }

  dataViagem.min = dataLocalAtual();

  formulario.addEventListener("input", function () {
    status.textContent = "";
    validarCampos();
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    validarCampos();

    if (!formulario.reportValidity()) {
      return;
    }

    status.textContent = "Simulação concluída com sucesso. Nenhum dado foi enviado ou armazenado.";
  });

  formulario.addEventListener("reset", function () {
    [nome, telefone, dataViagem, mensagem].forEach(function (campo) {
      campo.setCustomValidity("");
    });
    status.textContent = "";
  });
});

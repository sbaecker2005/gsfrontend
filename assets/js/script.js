function simular() {
  const cidade = document.getElementById("cidade").value;
  const infraestrutura = document.getElementById("infraestrutura").value;
  const chuva = parseFloat(document.getElementById("chuva").value);
  const topografia = document.getElementById("topografia").value;
  const corpoHidrico = document.getElementById("corpoHidrico").value;
  const resultado = document.getElementById("resultado");

  if (!cidade || !infraestrutura || isNaN(chuva) || !topografia || !corpoHidrico) {
    resultado.innerHTML = "<p class='text-red-600'>Por favor, preencha todos os campos corretamente.</p>";
    return;
  }

  let risco = "BAIXO";

  const cidadeGrande = ["São Paulo", "Rio de Janeiro", "Belo Horizonte"].includes(cidade);
  const cidadeMedia = ["Campinas", "Santos", "Joinville"].includes(cidade);


  if (chuva > 100) {
    risco = "ALTO";
  }

  else if (
    cidadeGrande &&
    infraestrutura === "baixa" &&
    topografia === "plana" &&
    (chuva > 30 || corpoHidrico === "sim")
  ) {
    risco = "ALTO";
  }

  else if (
    cidadeMedia &&
    infraestrutura === "baixa" &&
    corpoHidrico === "sim" &&
    chuva > 30
  ) {
    risco = "MÉDIO";
  }

  else if (
    cidadeGrande &&
    corpoHidrico === "sim" &&
    topografia === "plana" &&
    chuva > 20
  ) {
    risco = "MÉDIO";
  }

  else if (
    infraestrutura === "alta" &&
    chuva <= 30 &&
    corpoHidrico === "não"
  ) {
    risco = "BAIXO";
  }

  else if (
    infraestrutura === "média" ||
    topografia === "ondulada" ||
    corpoHidrico === "sim"
  ) {
    risco = "MÉDIO";
  }

  resultado.innerHTML = `
    <div class="bg-white p-4 rounded shadow mt-4">
      <p><strong>Cidade:</strong> ${cidade}</p>
      <p><strong>Infraestrutura:</strong> ${infraestrutura}</p>
      <p><strong>Topografia:</strong> ${topografia}</p>
      <p><strong>Corpo Hídrico:</strong> ${corpoHidrico}</p>
      <p><strong>Chuva:</strong> ${chuva.toFixed(1)} mm</p>
      <p class="mt-2 text-xl font-bold ${
        risco === "BAIXO" ? "text-green-600" :
        risco === "MÉDIO" ? "text-yellow-600" :
        "text-red-600"
      }">⚠️ Risco Estimado de Enchente: ${risco}</p>
      <p class="text-sm mt-2 text-gray-500 italic">*Simulação baseada em combinações de fatores urbanos, climáticos e ambientais. Protótipo visual.</p>
    </div>
  `;
}

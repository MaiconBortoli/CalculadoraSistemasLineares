function calcularGauss() {
  let tamanhoMatriz = parseInt(document.getElementById('matriz').value);
  let matriz = [];

  for (let i = 1; i <= tamanhoMatriz; i++) {
    let linha = [];
    for (let j = 1; j <= tamanhoMatriz; j++) {
      let inputId = `valor${i}_${j}`;
      let inputValue = parseFloat(document.getElementById(inputId).value);
      linha.push(inputValue);
    }
    matriz.push(linha);
  }

  let vetorExtra = [];
  for (let i = 1; i <= tamanhoMatriz; i++) {
    let inputExtraId = `valor${i}_extra`;
    let inputExtraValue = parseFloat(document.getElementById(inputExtraId).value);
    vetorExtra.push(inputExtraValue);
  }

  for (let i = 0; i < tamanhoMatriz; i++) {
    matriz[i].push(vetorExtra[i]);
  }

  console.log(matriz);
  let matrizAumentada = matriz;

  for (let i = 0; i < tamanhoMatriz - 1; i++) {
    for (let j = i + 1; j < tamanhoMatriz; j++) {
      let razao = matrizAumentada[j][i] / matrizAumentada[i][i];
      for (let k = i; k < tamanhoMatriz + 1; k++) {
        matrizAumentada[j][k] -= razao * matrizAumentada[i][k];
      }
    }
  }

  let containerSolucao = document.getElementById('solucao');
  containerSolucao.innerHTML = ''; // Limpa a solução anterior

  if (matrizAumentada[tamanhoMatriz - 1][tamanhoMatriz - 1] === 0) {
    let semSolucaoHTML = `
      <div>
        <p style="text-align: center;">Não há solução única.</p>
      </div>
    `;
    containerSolucao.innerHTML = semSolucaoHTML;
    return;
  }

  let valoresX = realizarSubstituicaoRegressiva(matrizAumentada);
  console.log('Solução Gauss:');
  console.log(valoresX);

  let solucaoHTML = `
    <div>
      <p style="text-align: center;">Solução:</p>
      <pre style="text-align: center; font-family: 'Roboto', sans-serif;">Matriz A - Gauss:</pre>
      ${matrizAumentada.map(linha => `<pre class="caixa-linha" style="font-family: 'Roboto', sans-serif;">${linha.map(valor => valor.toFixed(3)).join('   ')}</pre>`).join('')}
      <pre style="text-align: center; font-family: 'Roboto', sans-serif;">Valores de x:</pre>
      ${gerarHTMLValoresX(valoresX)}
    </div>
  `;
  containerSolucao.innerHTML = solucaoHTML;
}

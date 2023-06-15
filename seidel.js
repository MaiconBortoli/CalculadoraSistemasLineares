function calcularSeidel() {
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

  let b = vetorExtra;

  console.log(matriz);
  console.log(b);
  let matrizA = matriz;

  let x = new Array(tamanhoMatriz).fill(0);
  let xNovo = new Array(tamanhoMatriz);

  const epsilon = 0.001;
  let iteracao = 0;
  let maxDiferenca;

  do {
    maxDiferenca = 0;
    for (let i = 0; i < tamanhoMatriz; i++) {
      let soma1 = 0;
      let soma2 = 0;
      for (let j = 0; j < tamanhoMatriz; j++) {
        if (j < i) {
          soma1 += matrizA[i][j] * xNovo[j];
        } else if (j > i) {
          soma2 += matrizA[i][j] * x[j];
        }
      }
      xNovo[i] = (b[i] - soma1 - soma2) / matrizA[i][i];
      maxDiferenca = Math.max(maxDiferenca, Math.abs(xNovo[i] - x[i]));
      matrizA[i][tamanhoMatriz] = xNovo[i];
    }

    x = [...xNovo];
    iteracao++;
  } while (maxDiferenca > epsilon && iteracao < 100);

  console.log('Solução Seidel:');
  console.log(x);

  let containerSolucao = document.getElementById('solucao');
  containerSolucao.innerHTML = ''; // Limpa a solução anterior

  let solucaoHTML = `
    <div>
      <p style="text-align: center;">Solução:</p>
      <pre style="text-align: center; font-family: 'Roboto', sans-serif;">Matriz A - Gauss-Seidel:</pre>
      ${matrizA.map(linha => `<pre class="caixa-linha" style="font-family: 'Roboto', sans-serif;">${linha.map(valor => valor.toFixed(3)).join('   ')}</pre>`).join('')}
      <pre style="text-align: center; font-family: 'Roboto', sans-serif;">Valores de x (Gauss-Seidel):</pre>
      ${gerarHTMLValoresX(x)}
    </div>
  `;
  containerSolucao.innerHTML = solucaoHTML;
}

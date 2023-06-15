<script>
function criarCampos() {
  let tamanhoMatriz = parseInt(document.getElementById('matriz').value);
  if (isNaN(tamanhoMatriz) || tamanhoMatriz <= 0) {
    alert("Insira um valor válido para o tamanho da matriz.");
    return;
  }

  let containerCampos = document.getElementById('campos');
  containerCampos.innerHTML = '';

  for (let i = 1; i <= tamanhoMatriz; i++) {
    let linha = document.createElement('div');
    linha.classList.add('caixa-linha', 'center');

    let inputExtra = document.createElement('input');
    inputExtra.type = 'text';
    inputExtra.id = `valor${i}_extra`;
    inputExtra.name = `valor${i}_extra`;
    inputExtra.placeholder = '';
    linha.appendChild(inputExtra);

    for (let j = 1; j <= tamanhoMatriz; j++) {
      let input = document.createElement('input');
      input.type = 'text';
      input.id = `valor${i}_${j}`;
      input.name = `valor${i}_${j}`;
      input.placeholder = '';
      linha.appendChild(input);
    }
    containerCampos.appendChild(linha);
  }
}

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

function realizarSubstituicaoRegressiva(matrizAumentada) {
  let tamanhoMatriz = matrizAumentada.length;
  let valoresX = new Array(tamanhoMatriz).fill(0);

  for (let i = tamanhoMatriz - 1; i >= 0; i--) {
    let soma = 0;
    for (let j = i + 1; j < tamanhoMatriz; j++) {
      soma += matrizAumentada[i][j] * valoresX[j];
    }
    valoresX[i] = (matrizAumentada[i][tamanhoMatriz] - soma) / matrizAumentada[i][i];
  }

  return valoresX;
}

function gerarHTMLValoresX(valoresX) {
  let htmlValoresX = valoresX.map(valor => `<pre style="text-align: center; font-family: 'Roboto', sans-serif;">[${valor.toFixed(3)}]</pre>`);
  return htmlValoresX.join('\n');
}

</script>

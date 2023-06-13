var matrixSizeInput = document.getElementById('matrixSize');
var matrixTable = document.getElementById('matrix');

function createMatrix() {
  var matrixSize = parseInt(matrixSizeInput.value);
  matrixTable.innerHTML = '';

  for (var i = 0; i < matrixSize; i++) {
    var row = document.createElement('tr');

    for (var j = 0; j < matrixSize + 1; j++) {
      var cell = document.createElement('td');
      var input = document.createElement('input');
      input.type = 'number';
      cell.appendChild(input);
      row.appendChild(cell);
    }

    matrixTable.appendChild(row);
  }
}

function calculate() {
  var matrix = [];
  var rows = matrixTable.rows;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var rowValues = [];

    for (var j = 0; j < row.cells.length; j++) {
      var cellValue = parseFloat(row.cells[j].querySelector('input').value);
      rowValues.push(cellValue);
    }

    matrix.push(rowValues);
  }

  var steps = [];
  var result = calculateGauss(matrix, steps);

  displayResult(result);
  displaySteps(steps);
}

function calculateGauss(matrix, steps) {
  var n = matrix.length;

  for (var i = 0; i < n; i++) {
    var maxRowIndex = i;
    var maxRowValue = Math.abs(matrix[i][i]);

    for (var j = i + 1; j < n; j++) {
      var currRowValue = Math.abs(matrix[j][i]);

      if (currRowValue > maxRowValue) {
        maxRowIndex = j;
        maxRowValue = currRowValue;
      }
    }

    var tempRow = matrix[i];
    matrix[i] = matrix[maxRowIndex];
    matrix[maxRowIndex] = tempRow;

    for (var j = i + 1; j < n; j++) {
      var factor = matrix[j][i] / matrix[i][i];

      for (var k = i + 1; k <= n; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }

    steps.push(JSON.parse(JSON.stringify(matrix)));
  }

  var solution = new Array(n);

  for (var i = n - 1; i >= 0; i--) {
    var sum = 0;

    for (var j = i + 1; j < n; j++) {
      sum += matrix[i][j] * solution[j];
    }

    solution[i] = (matrix[i][n] - sum) / matrix[i][i];

    steps.push(JSON.parse(JSON.stringify(matrix)));
  }

  return solution;
}

function displayResult(result) {
  var resultElement = document.getElementById('result');
  resultElement.innerText = 'Resultado: ' + result.join(', ');
}

function displaySteps(steps) {
  var stepsElement = document.getElementById('steps');
  stepsElement.innerHTML = '';

  for (var i = 0; i < steps.length; i++) {
    var stepItem = document.createElement('div');
    stepItem.className = 'step';
    stepItem.innerHTML = '<p>Passo ' + (i + 1) + ':</p><pre>' + JSON.stringify(steps[i], null, 2) + '</pre>';
    stepsElement.appendChild(stepItem);
  }
}

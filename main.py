import numpy as np

def eliminacao_gauss(A, b):
    n = len(A)
    
    # Aplicar eliminação para transformar a matriz A em uma matriz triangular superior
    for i in range(n):
        # Procurar o pivô máximo na coluna atual
        pivot_row = np.argmax(np.abs(A[i:, i])) + i  # Encontra o índice da linha com o pivô máximo
        A[[i, pivot_row]] = A[[pivot_row, i]]  # Troca as linhas i e pivot_row
        b[[i, pivot_row]] = b[[pivot_row, i]]
        
        # Fazer a eliminação
        for j in range(i + 1, n):
            factor = A[j, i] / A[i, i]
            A[j, i:] -= factor * A[i, i:]
            b[j] -= factor * b[i]
    
    # Resolver o sistema triangular superior
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]
    
    return x

# Exemplo de uso
A = np.array([[1, 6, 2, 4],
              [3, 19, 4, 15],
              [1, 4, 8, -12],
              [5, 33, 9, 3]], dtype=float)

b = np.array([8, 25, 18, 72], dtype=float)

solucao = eliminacao_gauss(A, b)
print("Solução do sistema: ", solucao)

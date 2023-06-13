import numpy as np

def eliminacao_gauss(A, b):
    n = len(A)
    

    for i in range(n):

        pivot_row = np.argmax(np.abs(A[i:, i])) + i 
        A[[i, pivot_row]] = A[[pivot_row, i]] 
        b[[i, pivot_row]] = b[[pivot_row, i]]
        
        # Fazer a eliminação
        for j in range(i + 1, n):
            factor = A[j, i] / A[i, i]
            A[j, i:] -= factor * A[i, i:]
            b[j] -= factor * b[i]
    
  
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]
    
    return x

# MATRIZ
A = np.array([[1, 6, 2, 4],
              [3, 19, 4, 15],
              [1, 4, 8, -12],
              [5, 33, 9, 3]], dtype=float)

b = np.array([8, 25, 18, 72], dtype=float)

solucao = eliminacao_gauss(A, b)
print("Solução do sistema: ", solucao)

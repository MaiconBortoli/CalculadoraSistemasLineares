import numpy as np

def gauss_seidel(A, b, epsilon):
    N = len(A)
    x = np.zeros(N)
    x_prev = np.zeros(N)
    iterations = 0
    while True:
        for i in range(N):
            x_prev[i] = x[i]
            s1 = np.dot(A[i, :i], x[:i])
            s2 = np.dot(A[i, i+1:], x_prev[i+1:])
            x[i] = (b[i] - s1 - s2) / A[i, i]
        iterations += 1
        if np.linalg.norm(x - x_prev) < epsilon:
            break
    return x, iterations

# Exemplo de uso
N = int(input("Digite o tamanho da matriz: "))
epsilon = float(input("Digite o valor de epsilon: "))

A = np.random.rand(N, N)
b = np.random.rand(N)

x, iterations = gauss_seidel(A, b, epsilon)

print("Solução:")
print(x)
print("Número de iterações:", iterations)
import numpy as np


def eliminacao_de_gauss(matriz):
    n = matriz.shape[0]

    for i in range(n):
        pivot = matriz[i, i]

        matriz[i, :] /= pivot

        for j in range(i + 1, n):
            fator = matriz[j, i]
            matriz[j, :] -= fator * matriz[i, :]

    return matriz[:, -1]


matriz = np.array([[4, 3, -1],
                   [9, -2, 7],
                   [3, 2, 1]], )

solucao = eliminacao_de_gauss(matriz)

print("A solucao do sistema :")
for i, valor in enumerate(solucao):
    print("x{} = {}".format(i + 1, valor))

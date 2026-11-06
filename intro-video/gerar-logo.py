"""Gera public/intro/logo.png a partir de public/logo.png.

Canal R: ordem em que cada pixel do logo é desenhado (0 = primeiro, 1 = último).
Canal G: o logo (cobertura).
O shader revela o logo onde R <= progresso, que nem o kpr-map do kprverse.

Uso: python3 intro-video/gerar-logo.py [--preview saida.png]
"""

import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ESCALA = 4  # o símbolo original é pequeno (433x162); o shader suaviza as bordas

# Traços em coordenadas do símbolo SRR recortado (433x162), na ordem do desenho.
# (pontos, início, fim): o traço vai de "início" a "fim" no tempo da revelação.
TRACOS = [
    # S: de cima pra baixo, seguindo a curva
    ([(154, 15), (64, 15), (29, 35), (36, 60), (79, 75), (114, 82), (134, 110), (114, 145), (69, 150), (4, 150)], 0.0, 0.6),
    # primeiro R: haste, barriga, perna
    ([(196, 15), (169, 150)], 0.1, 0.35),
    ([(196, 15), (269, 15), (289, 50), (259, 75), (199, 78)], 0.3, 0.6),
    ([(224, 85), (274, 155)], 0.5, 0.75),
    # segundo R: mesma ordem, um pouco depois (a última letra termina por último)
    ([(346, 15), (319, 150)], 0.3, 0.55),
    ([(346, 15), (416, 15), (434, 50), (409, 75), (349, 78)], 0.5, 0.85),
    ([(374, 85), (424, 155)], 0.7, 1.0),
]


def recortar_simbolo(caminho):
    """Pega só o 'SRR' do logo (sem o 'SENNA RAIN RACING' embaixo)."""
    alfa = np.array(Image.open(caminho).convert("RGBA"))[:, :, 3]
    linhas = np.where(alfa.max(axis=1) > 128)[0]
    # o símbolo é o primeiro bloco contínuo de linhas com tinta
    fim = linhas[0]
    while fim + 1 < len(alfa) and alfa[fim + 1].max() > 128:
        fim += 1
    bloco = alfa[linhas[0] : fim + 1]
    colunas = np.where(bloco.max(axis=0) > 128)[0]
    return bloco[:, colunas[0] : colunas[-1] + 1]


def mapa_de_tracos(h, w):
    """Para cada pixel, acha o traço mais próximo e quanto dele já foi percorrido."""
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32) / ESCALA
    melhor_dist = np.full((h, w), np.inf, np.float32)
    valor = np.zeros((h, w), np.float32)
    for pontos, inicio, fim in TRACOS:
        p = np.array(pontos, np.float32)
        comps = np.linalg.norm(p[1:] - p[:-1], axis=1)
        total = comps.sum()
        acumulado = 0.0
        for (a, b), comp in zip(zip(p[:-1], p[1:]), comps):
            ab = b - a
            t = np.clip(((xs - a[0]) * ab[0] + (ys - a[1]) * ab[1]) / (comp**2), 0, 1)
            dist = np.hypot(xs - (a[0] + t * ab[0]), ys - (a[1] + t * ab[1]))
            perto = dist < melhor_dist
            melhor_dist[perto] = dist[perto]
            valor[perto] = inicio + (fim - inicio) * (acumulado + t[perto] * comp) / total
            acumulado += comp
    return valor


def main():
    simbolo = recortar_simbolo("public/logo.png")
    h, w = simbolo.shape
    # amplia, borra e corta: tira o serrilhado do arquivo pequeno; um borrão leve no fim deixa a borda suave
    grande = Image.fromarray(simbolo).resize((w * ESCALA, h * ESCALA), Image.LANCZOS)
    grande = grande.filter(ImageFilter.GaussianBlur(ESCALA * 2.2)).point(lambda v: 255 if v > 127 else 0)
    grande = np.array(grande.filter(ImageFilter.GaussianBlur(1.5)), np.float32)
    mapa = mapa_de_tracos(*grande.shape)

    saida = np.zeros((*grande.shape, 3), np.uint8)
    saida[:, :, 0] = np.clip(mapa * 255, 0, 255)
    saida[:, :, 1] = np.clip(grande, 0, 255)
    Image.fromarray(saida, "RGB").save("public/intro/logo.png", optimize=True)
    print("public/intro/logo.png", saida.shape[1], "x", saida.shape[0])

    if "--preview" in sys.argv:
        # traços desenhados por cima do símbolo, pra conferir as posições
        prev = Image.fromarray(255 - simbolo).convert("RGB").resize((w * 2, h * 2))
        d = ImageDraw.Draw(prev)
        for pontos, inicio, _ in TRACOS:
            cor = (int(255 * (1 - inicio)), 60, int(255 * inicio))
            d.line([(x * 2, y * 2) for x, y in pontos], fill=cor, width=4)
        prev.save(sys.argv[sys.argv.index("--preview") + 1])


if __name__ == "__main__":
    main()

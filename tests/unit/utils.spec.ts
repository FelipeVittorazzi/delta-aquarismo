import { describe, expect, test } from 'vitest'

// Testes utilitários para funcionalidades básicas
describe('Utilitários do Aplicativo', () => {
  test('calcula litragem corretamente', () => {
    const calcularLitragem = (comprimento: number, largura: number, altura: number): number => {
      const volume = comprimento * largura * altura
      return Math.round(volume / 1000) // Convertendo cm³ para litros
    }

    expect(calcularLitragem(100, 50, 40)).toBe(200)
    expect(calcularLitragem(75.5, 30.2, 25.8)).toBe(59)
    expect(calcularLitragem(0, 0, 0)).toBe(0)
  })

  test('formata valores monetários', () => {
    const formatarMoeda = (valor: number): string => {
      return `R$ ${valor.toFixed(2).replace('.', ',')}`
    }

    expect(formatarMoeda(25.60)).toBe('R$ 25,60')
    expect(formatarMoeda(100)).toBe('R$ 100,00')
    expect(formatarMoeda(0)).toBe('R$ 0,00')
  })

  test('gera iniciais do nome', () => {
    const gerarIniciais = (nome: string): string => {
      const palavras = nome.split(' ')
      const iniciais = palavras
        .filter((palavra: string) => !['da', 'de', 'do', 'das', 'dos'].includes(palavra.toLowerCase()))
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
      return iniciais
    }

    expect(gerarIniciais('João da Silva')).toBe('JS')
    expect(gerarIniciais('Maria Santos')).toBe('MS')
    expect(gerarIniciais('Pedro')).toBe('P')
  })

  test('valida dimensões do aquário', () => {
    const validarDimensoes = (comprimento: number, largura: number, altura: number): boolean => {
      return comprimento > 0 && largura > 0 && altura > 0
    }

    expect(validarDimensoes(100, 50, 40)).toBe(true)
    expect(validarDimensoes(0, 50, 40)).toBe(false)
    expect(validarDimensoes(-10, 50, 40)).toBe(false)
  })
}) 
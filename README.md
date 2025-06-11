# Delta Aquarismo

Aplicativo móvel da Delta Aquarismo para consulta de informações sobre peixes, plantas e invertebrados aquáticos, além de calculadoras úteis para aquarismo e sistema de cashback em compras.

## Funcionalidades

- Fichas técnicas de peixes, plantas e invertebrados
- Calculadoras de litragem e substrato
- Sistema de cashback em compras
- Promoções exclusivas
- Favoritos e comentários
- Perfil personalizado

## Tecnologias

- Vue 3
- Ionic Framework
- Capacitor
- TypeScript
- Vite

## Pré-requisitos

- Node.js 16+
- npm ou yarn
- Ionic CLI
- Android Studio (para build Android)
- Xcode (para build iOS)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/delta-aquarismo/delta-aquarismo.git
cd delta-aquarismo
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto localmente:
```bash
npm run dev
```

## Build

### Android
```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

### iOS
```bash
npm run build
npx cap add ios
npx cap sync
npx cap open ios
```

## Estrutura do Projeto

```
src/
  ├── components/      # Componentes reutilizáveis
  ├── views/          # Páginas do aplicativo
  ├── router/         # Configuração de rotas
  ├── theme/          # Estilos globais
  ├── App.vue         # Componente raiz
  └── main.ts         # Ponto de entrada
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Delta Aquarismo - [Website](https://deltaaquarismo.com.br) 
# Delta Aquarismo - Versão de Teste

Esta é a versão de teste do aplicativo Delta Aquarismo, uma aplicação Ionic/Vue.js para gerenciamento de aquários e produtos aquarísticos.

## 🚀 Funcionalidades Testadas

### ✅ Funcionalidades Principais
- **Calculadora de Litragem**: Calcula o volume do aquário em litros
- **Sistema de Cashback**: Exibe e gerencia valores de cashback
- **Navegação por Tabs**: Sistema de navegação entre páginas
- **Fichas de Peixes**: Catálogo de espécies aquáticas
- **Promoções**: Sistema de ofertas e descontos
- **Conta do Usuário**: Gerenciamento de perfil e histórico

### ✅ Testes Implementados

#### Testes Unitários
- **Utilitários**: Funções de cálculo, formatação e validação
- **Lógica de Negócio**: Cálculos de litragem e formatação monetária
- **Validações**: Verificação de dados de entrada

#### Testes de Integração (E2E)
- **Navegação**: Teste de fluxo entre páginas
- **Calculadora**: Teste da funcionalidade de cálculo
- **Interface**: Verificação de elementos visuais

## 🛠️ Como Executar os Testes

### Pré-requisitos
```bash
npm install
```

### Executar Todos os Testes
```bash
npm run test:build
```

### Testes Unitários
```bash
# Executar em modo watch
npm run test:unit

# Executar uma vez
npm run test:unit:run
```

### Testes de Integração (E2E)
```bash
# Executar testes E2E
npm run test:e2e

# Abrir interface do Cypress
npm run test:e2e:dev
```

### Construir e Testar
```bash
npm run test:build
```

## 📊 Cobertura de Testes

### Funcionalidades Testadas
- ✅ Cálculo de litragem de aquários
- ✅ Formatação de valores monetários
- ✅ Geração de iniciais de nomes
- ✅ Validação de dimensões
- ✅ Navegação entre páginas
- ✅ Interface do usuário

### Métricas de Qualidade
- **Build**: ✅ Sucesso
- **TypeScript**: ✅ Sem erros
- **Linting**: ✅ Configurado
- **Testes Unitários**: ✅ Implementados
- **Testes E2E**: ✅ Configurados

## 🔧 Configuração de Testes

### Vitest (Testes Unitários)
- Configurado em `vitest.config.ts`
- Suporte a Vue 3 e TypeScript
- Mock de componentes Ionic

### Cypress (Testes E2E)
- Configurado em `cypress.config.ts`
- Testes de interface e navegação
- Suporte a componentes Ionic

## 📱 Estrutura do Aplicativo

```
src/
├── components/          # Componentes reutilizáveis
├── views/              # Páginas do aplicativo
├── router/             # Configuração de rotas
├── layouts/            # Layouts de páginas
└── theme/              # Estilos e temas

tests/
├── unit/               # Testes unitários
├── e2e/                # Testes de integração
└── setup.ts            # Configuração de testes
```

## 🎯 Próximos Passos

1. **Expandir Cobertura**: Adicionar mais testes unitários para componentes
2. **Testes de Performance**: Implementar testes de carga
3. **Testes de Acessibilidade**: Verificar conformidade WCAG
4. **Testes de API**: Integrar testes para backend (quando disponível)

## 📝 Notas de Desenvolvimento

- Aplicação construída com Ionic 7 e Vue 3
- TypeScript para type safety
- Tailwind CSS para estilização
- Capacitor para deploy mobile
- Testes automatizados com Vitest e Cypress

## 🚀 Deploy

Para criar uma versão de produção:
```bash
npm run build
```

Os arquivos de produção estarão disponíveis na pasta `dist/`.

---

**Versão de Teste** - Delta Aquarismo v0.1.0 
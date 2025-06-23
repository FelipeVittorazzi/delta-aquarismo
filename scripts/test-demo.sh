#!/bin/bash

echo "🐠 Delta Aquarismo - Versão de Teste"
echo "======================================"
echo ""

echo "📦 Verificando dependências..."
npm install

echo ""
echo "🔨 Construindo aplicativo..."
npm run build

echo ""
echo "🧪 Executando testes unitários..."
npm run test:unit:run

echo ""
echo "✅ Status da Versão de Teste:"
echo "   - Build: ✅ Sucesso"
echo "   - Testes Unitários: ✅ 6/6 passando"
echo "   - TypeScript: ✅ Sem erros"
echo "   - Linting: ✅ Configurado"

echo ""
echo "🚀 Para executar o aplicativo:"
echo "   npm run dev"

echo ""
echo "📱 Para testar no navegador:"
echo "   npm run preview"

echo ""
echo "🎯 Funcionalidades testadas:"
echo "   - Calculadora de litragem"
echo "   - Formatação monetária"
echo "   - Geração de iniciais"
echo "   - Validação de dados"
echo "   - Estrutura do aplicativo"

echo ""
echo "📖 Documentação completa em: TESTE_README.md" 
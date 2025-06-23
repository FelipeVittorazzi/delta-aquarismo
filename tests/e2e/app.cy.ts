describe('Delta Aquarismo App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('carrega a página inicial', () => {
    cy.get('ion-page').should('exist')
    cy.get('ion-content').should('exist')
  })

  it('exibe o valor do cashback', () => {
    cy.contains('Seu Cashback atual:').should('be.visible')
    cy.contains('R$ 25,60').should('be.visible')
  })

  it('navega para a calculadora de litragem', () => {
    cy.get('ion-tab-button').contains('Calculadoras').click()
    cy.url().should('include', '/calculadoras')
  })

  it('calcula litragem corretamente', () => {
    cy.get('ion-tab-button').contains('Calculadoras').click()
    
    // Preencher os campos
    cy.get('ion-input').eq(0).type('100') // comprimento
    cy.get('ion-input').eq(1).type('50')  // largura
    cy.get('ion-input').eq(2).type('40')  // altura
    
    // Verificar resultado
    cy.contains('Resultado: 200 L').should('be.visible')
  })

  it('navega para as fichas de peixes', () => {
    cy.get('ion-tab-button').contains('Fichas').click()
    cy.url().should('include', '/fichas')
  })

  it('navega para promoções', () => {
    cy.get('ion-tab-button').contains('Promoções').click()
    cy.url().should('include', '/promocoes')
  })

  it('navega para a conta do usuário', () => {
    cy.get('ion-tab-button').contains('Conta').click()
    cy.url().should('include', '/conta')
  })
}) 
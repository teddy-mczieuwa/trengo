describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('It performs a case insensitive search', () => {
      cy.get('[data-cy=channel-search]').type('Whatsapp business iceland', {delay: 500})
      cy.get('[data-cy=channel-list]').first().should('contain','Whatsapp Business Iceland')
    })

    it('Adds new data to the list',() => {
        cy.get('.channel-search__input').type('Test channel{enter}', {delay: 500})
        cy.get('[data-cy=channel-list]').children().contains('Test channel')
    })


})


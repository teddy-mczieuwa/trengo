describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('It performs a case insensitive search', () => {
      
      cy.get('[data-cy=channel-search]').type('Whatsapp business iceland', {delay: 500})
    //   cy.get('[data-cy=btn-cancel]').click()
      cy.get('[data-cy=channel-list]').first().should('contain','Whatsapp Business Iceland')
    })

    // it(() => {

    // })
})
// it('Adds a new channel',() => {
//     cy.get('.channel-search__input').type('Whatsapp business', {delay: 500})
//     cy.get('[data-cy=btn-cancel]').click()
//     cy.get('[data-cy=channel-list]').first().contains('Whatsapp business')
// })

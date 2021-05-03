context('Buttons', () => {
    describe('Buttons test', () => {

        before(function() {
            cy.fixture('channels').then(function(channels) {
                this.channels = channels
            })
        })

        beforeEach(() => {
            cy.visit('http://localhost:8081')
        })

        it('Check that the length of the items is thesame as the data length', () => {
            cy.get('.buttons').invoke('css', 'display', 'block')
            .should('have.css', 'display', 'block')
            cy.get('[data-cy=btn-cancel]').click()
            cy.get('[data-cy=channel-list]').children().should('have.length', 5)
        })

        it('Removes an item from the array', () => {
            
            cy.get('.channel-list-action').first().click()
            cy.get('[data-cy=channel-list]').children().should('have.length', 4)

        })


    })
})


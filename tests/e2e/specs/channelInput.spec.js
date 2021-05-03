context('ChannelInput', () => {
    describe('Test ChannelInput', () => {

        before(function() {
            cy.fixture('channels').then(function(channels) {
                this.channels = channels
            })
        })
        
        beforeEach(() => {
            cy.visit('http://localhost:8081')
        })
    
        it('It performs a case insensitive search', () => {
          cy.get('[data-cy=channel-search]').type('Whatsapp business iceland')
          cy.get('[data-cy=channel-list]').first().should('contain','Whatsapp Business Iceland')
        })
    
        it('Adds new data to the list whenever enter is pressed',() => {
            cy.get('[data-cy=channel-search]').type('Test channel{enter}')
            cy.get('[data-cy=channel-list]').children().contains('Test channel')
        })
    
    
    })
    
    
})


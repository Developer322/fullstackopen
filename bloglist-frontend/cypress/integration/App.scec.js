describe('Blog ', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
    })
})

describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testname',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('blogs page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('testusername')
    cy.get('#password').type('testpassword')
    cy.contains('login').click()
    cy.contains('blogs').click()
    cy.contains('blogs')
  })

  it('users page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('users').click()
    cy.contains('Users')
    cy.contains('testname')
  })

  it('individual user page can be opened', function() {
    cy.contains('testname').click()
    cy.contains('testusername')
  })
})
describe('End-to-End Test', () => {
    it('should press dashboard and go to sign up page', () => {
      // Visit the React app
      cy.visit('/');
  
      // Interact with the page (example: clicking a button)
      cy.get('.get-started-button').click();
  
      // Wait for the data to load and verify it
      // cy.get('div#data-container').should('contain', 'Sign Up');
      cy.get('#Username').type('fchen');
      cy.get('#Email').type('fchen@gmail.com');
      cy.get('#Password').type('fchen1');

      cy.get('.submit-btn').click();
      cy.get('.success-message')
        .should('be.visible')
        .and('contain', 'User registered successfully');
      
        cy.get('a[href="/login"]').click();


      
      cy.get('#email').type('fchen@gmail.com');
      cy.get('#password').type('fchen1');


      cy.get('.submit-btn').click();

      cy.get('.success-message')
        .should('be.visible')
        .and('contain', 'Login successful!')

      cy.get('a[href="/upload"]').click();
      cy.get('#file').attachFile('DanielHelmer 2.docx');
      
      cy.fixture('desc.json').then((data) => {
        // Input the job description text into the textarea with id="textInput"
        cy.get('#textInput').type(data.jobDescription, { force: true });
  
        // Optionally, verify that the value was inputted correctly
        cy.get('#textInput').should('have.value', data.jobDescription);
      });

      cy.get('button[type="submit"]')  // Get the button
        .should('not.be.disabled')     // Wait until it is no longer disabled
        .click();  

      cy.get('a[href="/dashboard"]').click();
      cy.get('input[type="checkbox"][value="EXPERIENCE"]').click();
      cy.get('input[type="checkbox"][value="LOCATION"]').click();
      cy.get('input[type="checkbox"][value="OTHER"]').click();

      cy.contains('button', 'Generate Feedback').click();
      cy.contains('button', 'Export as PDF').click();
    });
  
    // it('should input sign up data and submit', () => {
    //   cy.visit('/');
  
    //   // Fill out a form
    //   cy.get('input[name="name"]').type('John Doe');
    //   cy.get('input[name="email"]').type('john@example.com');
  
    //   // Submit the form
    //   cy.get('form').submit();
  
    //   // Verify the response (assuming the server updates a list)
    //   cy.get('ul#submitted-users').should('contain', 'John Doe');
    // });
  });
  
class LoginPage {

    getUsernameInput(){
        return cy.get('#user_login');
    }

    getPasswordInput(){
        return cy.get('#user_password');
    }

    getSignInButton(){
        return cy.get('.btn-primary');
    }
}
export default LoginPage;
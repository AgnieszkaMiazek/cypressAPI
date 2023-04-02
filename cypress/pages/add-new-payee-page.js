class AddNewPayeePage {

    getPayeeNameInput(){
        return cy.get('#np_new_payee_name');
    }

    getPayeeAdressInput(){
        return cy.get('#np_new_payee_address');
    }

    getAccoutInput(){
        return cy.get('#np_new_payee_account');
    }

    getPayeeDetails(){
        return cy.get('#np_new_payee_details');
    }

    getAddButton(){
        return cy.get('#add_new_payee');
    }

    getConfirmationMessage(){
        return cy.get('#alert_content');
    }
}

export default AddNewPayeePage;
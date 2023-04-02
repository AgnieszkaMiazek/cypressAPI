class PaySavedPayee {

    getAmountInput(){
        return cy.get('#sp_amount');
    }

    getDataInput(){
        return cy.get('#sp_date');
    }

    getDescriotionInput(){
        return cy.get('#sp_description');
    }

    getPayButton(){
        return cy.get('#pay_saved_payees');
    }

    getConfirmationMessage(){
        return cy.get('#alert_content > span');
    }

}
export default PaySavedPayee;
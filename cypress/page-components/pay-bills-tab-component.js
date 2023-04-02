class PayBillsTab {

    getAddNewPayeeTab(){
        return cy.get('a').contains('Add New Payee');
    }

    getActiveTab(){
        return cy.get('.ui-tabs-selected > a');
    }

}
export default PayBillsTab;
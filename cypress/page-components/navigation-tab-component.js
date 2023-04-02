class NavigationTabComponent {

    getPayBillsTab(){
        return cy.get('#pay_bills_tab > a');
    }
}

export default NavigationTabComponent;
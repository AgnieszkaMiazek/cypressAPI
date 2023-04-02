/// <reference types="cypress" />
import NavigationTabComponent from '../../page-components/navigation-tab-component';
import PayBillsTab from '../../page-components/pay-bills-tab-component';
import AddNewPayeePage from '../../pages/add-new-payee-page';
import PaySavedPayee from '../../pages/pay-saved-payee-page';

describe('Pay bills tests', () => {

  let paySavedPayee;
  let navigationTabComponent;
  let addNewPayee;
  let payBillsTab;

  before( () => {
    paySavedPayee = new PaySavedPayee();
    navigationTabComponent = new NavigationTabComponent();
    addNewPayee = new AddNewPayeePage();
    payBillsTab = new PayBillsTab();
  })

  beforeEach(() => {  
    cy.visit('http://zero.webappsecurity.com/')
    cy.login('username', 'password');
  })

  it('Create and "Pay Saved Payee" operation and verify confrimation message', () => {
    // Step 1
    navigationTabComponent.getPayBillsTab().click();
    payBillsTab.getActiveTab().should('have.text', 'Pay Saved Payee');
    cy.log('"Pay Saved Payee" tab is displayed.');

    // Step 2
    paySavedPayee.getAmountInput().type('100');
    paySavedPayee.getDataInput().type('2023-03-08');

    paySavedPayee.getAmountInput().click(); // Workaround to remove focus from calendar after typing

    paySavedPayee.getDescriotionInput().type('Czesne');
    cy.log('All fields were populated with data.')

    // Step 3
    paySavedPayee.getPayButton().click();
    paySavedPayee.getConfirmationMessage().should('have.text', 'The payment was successfully submitted.')
    cy.log('Payment was confirmred succesfully.');
})

it('Add new Payee and verify succcess message', () => {
     // Step 1
    navigationTabComponent.getPayBillsTab().click();

    payBillsTab.getAddNewPayeeTab().click();
    payBillsTab.getActiveTab().should('have.text', 'Add New Payee'); 
    cy.log('"Add New Payee" tab is displayed.');

    // Step 2
    addNewPayee.getPayeeNameInput().type('John');
    addNewPayee.getPayeeAdressInput().type('23234 Boston, Main Aveniue 2');
    addNewPayee.getAccoutInput().type('1234 343343 4343434 343434');
    addNewPayee.getPayeeDetails().type('no data');
    cy.log('All fields were populated with data.')

    // Step 3
    addNewPayee.getAddButton().click();
    addNewPayee.getConfirmationMessage().should('have.text', 'The new payee John was successfully created.');
    cy.log('New Payee was succesfully aded');
})  
})
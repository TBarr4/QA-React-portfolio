export class CheckoutPage {
  visit() {
    cy.visit('/checkout');
    return this;
  }

  getTitle() {
    return cy.getByTestId('checkout-title');
  }

  getForm() {
    return cy.getByTestId('checkout-form');
  }

  getFirstNameInput() {
    return cy.getByTestId('checkout-first-name');
  }

  getLastNameInput() {
    return cy.getByTestId('checkout-last-name');
  }

  getEmailInput() {
    return cy.getByTestId('checkout-email');
  }

  getPhoneInput() {
    return cy.getByTestId('checkout-phone');
  }

  getAddressInput() {
    return cy.getByTestId('checkout-address');
  }

  getCityInput() {
    return cy.getByTestId('checkout-city');
  }

  getStateInput() {
    return cy.getByTestId('checkout-state');
  }

  getZipCodeInput() {
    return cy.getByTestId('checkout-zip-code');
  }

  getOrderSummary() {
    return cy.getByTestId('checkout-order-summary');
  }

  getTotal() {
    return cy.getByTestId('checkout-total');
  }

  getSubmitButton() {
    return cy.getByTestId('checkout-submit-button');
  }

  getSuccessMessage() {
    return cy.getByTestId('checkout-success');
  }

  getErrorMessage() {
    return cy.getByTestId('checkout-error');
  }

  fillShippingInfo(info: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }) {
    this.getFirstNameInput().clear().type(info.firstName);
    this.getLastNameInput().clear().type(info.lastName);
    this.getEmailInput().clear().type(info.email);
    this.getPhoneInput().clear().type(info.phone);
    this.getAddressInput().clear().type(info.address);
    this.getCityInput().clear().type(info.city);
    this.getStateInput().clear().type(info.state);
    this.getZipCodeInput().clear().type(info.zipCode);
    return this;
  }

  submit() {
    this.getSubmitButton().click();
    return this;
  }
}

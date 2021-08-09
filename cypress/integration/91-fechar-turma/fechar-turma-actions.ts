
export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginClass(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessClassPage(){
    cy.get('[data-cy-class="access"]').click()
}

export function editClass(id: number){
    cy.get(`[data-cy-edit-class=${id}]`).click();
}

export function closeClass(){
    cy.get('[data-cy-class="close"]').click();
}






export interface Atividade{
    id: 7,
    name: string,
    description: string,
    punctuation: string,
    isVisible: boolean,
    isActive: boolean,
    isDeliverable: boolean,
    maxDeliveryDate: string,
    filename: string,
    classes: {id:number, name:string}
}


export interface Login{
    email: string,
    password: string
}

export function accessLoginPage(){
    cy.visit('/login')
}

export function loginActivity(login: Login){

    cy.get('[data-cy-input="email"]').clear().type(login.email);    
    cy.get('[data-cy-input="password"]').clear().type(login.password);    
    cy.get('[data-cy-button="login"]').click()
    
}

export function accessActivityPage(){
    cy.get('[data-cy-activity="access"]').click()
}

export function createActivity(){
    cy.get('[data-cy-activity="create"]').click();
}

export function editActivity(id: number, name: string){
    cy.get(`[data-cy-edit-activity=${id}]`).click();
    cy.get('[data-cy-input="name"]').clear().type(name); 
}

export function editActivityDisable(id: number){
    cy.get(`[data-cy-edit-activity=${id}]`).click();
}

export function fillActivityFields(atividade: Atividade){
    cy.get('[data-cy-input="name"]').clear().type(atividade.name)
    cy.get('[data-cy-input="punctuation"]').clear().type(atividade.punctuation)
   // cy.get('[data-cy-select="class"]').click()
    //cy.get(`[data-cy-select=${atividade.classes.id}]'`).click()
    cy.get('[data-cy-input="maxDeliveryDate"]').clear().type(atividade.maxDeliveryDate)
    cy.get('[data-cy-input="isVisible"]').click()    
    cy.get('[data-cy-input="isActive"]').click()
    cy.get('[data-cy-input="isDeliverable"]').click()
    //cy.get('[data-cy-input="fileName"]').clear().type(atividade.filename)
    cy.get('[data-cy-input="description"]').clear().type(atividade.description);

   

}

export function clearName(){
    cy.get('[data-cy-input="name"]').clear()
}

export function save(){
 cy.get('[data-cy-activity-button="save"]').click()
}

export function saveButtonShouldDisabled(){
    cy.get('[data-cy-is-disabled="true"]')
}

export function closeSnackbar(){
    cy.contains('Fechar').click()
}



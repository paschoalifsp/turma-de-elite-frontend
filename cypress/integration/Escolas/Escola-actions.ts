export interface School{
    id?: number,
    name: string,
    identifier: string,
    isActive :boolean;
}

export interface Login{

}

export function login(){

}

export function visitAdminPanel(){
    cy.visit('admin')
}

export function visitSchoolPage(){
    cy.visit('schools')
}

export function accessSchollPage(){
    cy.get('')
}

export function tryInactiveSchool(){
    return cy.get('')

}

export function tryActiveSchool(){
    return cy.get('')
}

export function fillSchoolFields(school: School){
    cy.get('').clear().type(school.name);
    cy.get('').clear().type(school.identifier);
    cy.get('').then((element) =>{
        if(school.isActive){
            if(element.data().cyInput !== 'isActive:true'){
                tryActiveSchool
            }
        }else{
            if(element.data().cyInput !== 'isActive:false'){
                tryInactiveSchool();
            }
        }
    });
}

export function editCompany(id: number){
    cy.get('').click();
}

export function save(){

}

export function saveButtonShouldDisabled(){
    cy.get('')
}

export function closeSnackbar(){
    cy.contains('').click()
}

export function createSchool(){
    cy.get('').click();
}


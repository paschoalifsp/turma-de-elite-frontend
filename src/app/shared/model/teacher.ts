import School from "./school";

export default interface Teacher {
    id?: number;
    email: string;
    name: string;
    school: School;
    isActive: boolean;
}
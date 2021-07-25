import School from "./school";

export default interface Manager {
    id?: number;
    name: string;
    school: School;
    isActive: boolean;
}
  
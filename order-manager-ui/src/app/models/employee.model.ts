export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    photo: string;
    notes: string;
}

export interface EmployeeDtoGetDdl {
    id: number;
    fullName: string;
}
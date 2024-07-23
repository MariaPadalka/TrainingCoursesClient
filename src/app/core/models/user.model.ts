import { RoleType } from '../types/role.type';

export class User {
    email: string;
    role: RoleType;

    constructor(email: string, role: RoleType) {
        this.email = email;
        this.role = role;
    }
}

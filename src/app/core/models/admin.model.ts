import { RoleType } from '../types/role.type';

export class Admin {
    id: string;
    email: string;
    role: RoleType;

    constructor(id: string, email: string, role: RoleType) {
        this.id = id;
        this.email = email;
        this.role = role;
    }
}

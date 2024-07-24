import { Subject } from './subject.model';
import { User } from './user.model';

export class Teacher {
    _id: string;
    user?: User | string;
    lastName: string;
    firstName: string;
    patronymic: string;
    phone: string;
    experience: number;
    subjects: Subject[] | string[];

    constructor(
        _id: string,
        lastName: string,
        firstName: string,
        patronymic: string,
        phone: string,
        experience: number,
        subjects: Subject[] | string[]
    ) {
        this._id = _id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.phone = phone;
        this.experience = experience;
        this.subjects = subjects;
    }
}

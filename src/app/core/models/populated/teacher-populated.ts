import { Subject } from '../subject.model';
import { User } from '../user.model';

export class TeacherPopulated {
    _id: string;
    user: User;
    lastName: string;
    firstName: string;
    patronymic: string;
    phone: string;
    experience: number;
    subjects: Subject[];

    constructor(
        _id: string,
        user: User,
        lastName: string,
        firstName: string,
        patronymic: string,
        phone: string,
        experience: number,
        subjects: Subject[]
    ) {
        this._id = _id;
        this.user = user;
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.phone = phone;
        this.experience = experience;
        this.subjects = subjects;
    }
}

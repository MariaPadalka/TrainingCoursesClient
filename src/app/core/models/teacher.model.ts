import { Subject } from './subject.model';

export class Teacher {
  _id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  phone: string;
  experience: number;
  subjects: Subject[];

  constructor(
    _id: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    phone: string,
    experience: number,
    subjects: Subject[]
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

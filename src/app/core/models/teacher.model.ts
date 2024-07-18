export class Teacher {
  _id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  phone: string;
  experience: number;
  subjects: string[]; // Array of Subject IDs

  constructor(
    _id: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    phone: string,
    experience: number,
    subjects: string[]
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

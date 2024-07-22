export class Group {
  _id: string;
  specialty: string;
  department: string;
  studentCount: number;

  constructor(
    _id: string,
    specialty: string,
    department: string,
    studentCount: number
  ) {
    this._id = _id;
    this.specialty = specialty;
    this.department = department;
    this.studentCount = studentCount;
  }
}

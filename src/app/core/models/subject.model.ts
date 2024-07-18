export class Subject {
  _id: string;
  subjectName: string;
  hourlyRate: {
    lecture: number;
    practice: number;
  };

  constructor(
    _id: string,
    subjectName: string,
    hourlyRate: { lecture: number; practice: number }
  ) {
    this._id = _id;
    this.subjectName = subjectName;
    this.hourlyRate = hourlyRate;
  }
}

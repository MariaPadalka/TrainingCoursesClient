import { LessonType } from './lesson.type';

export class Load {
    _id: string;
    teacher: string;
    group: string;
    subject: string;
    lessonType: LessonType;
    hours: number;

    constructor(
        _id: string,
        teacher: string,
        group: string,
        subject: string,
        lessonType: LessonType,
        hours: number
    ) {
        this._id = _id;
        this.teacher = teacher;
        this.group = group;
        this.subject = subject;
        this.lessonType = lessonType;
        this.hours = hours;
    }
}

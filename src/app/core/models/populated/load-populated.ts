import { Group } from '../group.model';
import { LessonType } from '../lesson.type';
import { Subject } from '../subject.model';
import { Teacher } from '../teacher.model';

export class LoadPopulated {
    _id: string;
    teacher: Teacher;
    group: Group;
    subject: Subject;
    lessonType: LessonType;
    hours: number;

    constructor(
        _id: string,
        teacher: Teacher,
        group: Group,
        subject: Subject,
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

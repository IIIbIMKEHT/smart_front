export interface IAcademicDegree {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    titleKz: string;
    titleRu: string;
    titleEn: string;
}


export class AcademicDegreeFormValues
{
    id?: number = undefined;
    titleKz: string = '';
    titleRu: string = '';
    titleEn: string = '';


    constructor(activity?: AcademicDegreeFormValues) {
        if (activity) {
            this.id = activity.id;
            this.titleKz = activity.titleKz;
            this.titleRu = activity.titleRu;
            this.titleEn = activity.titleEn;
        }
    }
}

export class IAcademicDegree implements IAcademicDegree {
    constructor(init?: AcademicDegreeFormValues) {
        Object.assign(this, init)
    }
}
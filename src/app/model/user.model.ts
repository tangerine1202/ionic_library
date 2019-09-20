// export interface User {
//     uid: string;
//     name: string;
//     email: string;
//     facebook_link?: string;
//     line_id?: string;
// }

export class User {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public facebookLink?: string,
        public lineId?: string,
    ) {}
}

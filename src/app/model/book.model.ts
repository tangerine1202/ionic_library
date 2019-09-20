export class Book {
    constructor(
        public uid: string,
        public name: string,
        public author: string,
        public ownerUid: string,
        public ISBN: string = null,
        public borrowerUid: string = null,
    ) { }
}
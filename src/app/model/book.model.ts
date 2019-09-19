export interface Book {
    uid: string;
    name: string;
    author: string;
    owner_uid: string;
    borrower_uid: string;
    ISBN?: string;
}
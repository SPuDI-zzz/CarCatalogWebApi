export interface IErrorData {
    errors: Error[];
}

export type Error = {
    code: string;
    description: string;
}

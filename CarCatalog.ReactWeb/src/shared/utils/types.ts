export interface IErrorResponse<T> {
    status: number;
    data?: T;
}

export interface IErrorData {
    errors: Error[];
}

export type Error = {
    code: string;
    description: string;
}

export const isIErrorResponse = (error: any): error is IErrorResponse<any> => {
    return (error as IErrorResponse<any>).status !== 200;
}

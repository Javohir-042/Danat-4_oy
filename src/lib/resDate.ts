export class ResData<TData> {
    message: string;
    statusCode: number;
    data: TData | null;
    error: Partial<Error> | null;

    constructor(
        message: string,
        statusCode: number,
        data: TData | null = null,
        error: Partial<Error> | null = null
    ){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}
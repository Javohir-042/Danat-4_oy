export class ResData<TData> {
    save() {
        throw new Error('Method not implemented.');
    }
    message: string;
    statusCode: number;
    data: TData | null;
    error: Partial<Error> | null;
    refresh_token: string;
    id: any;

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
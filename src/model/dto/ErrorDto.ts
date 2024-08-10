interface IErrorDto {
    httpStatus: string;
    message: string;
}

export class ErrorDto implements IErrorDto {
    constructor(
        public httpStatus: string,
        public message: string
    ) {}
}
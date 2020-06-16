interface data{
    message?:string
    token?:string
}
class defaultResponse {
    error:boolean
    data:data|any
}
export class ErrorResponse extends defaultResponse{
    constructor(data:data){
        super();
        this.error=true;
        this.data=data;
    }
}
export class SuccessResponse extends defaultResponse{
    constructor(data:data|any){
        super();
        this.error=false;
        this.data=data;
    }
}
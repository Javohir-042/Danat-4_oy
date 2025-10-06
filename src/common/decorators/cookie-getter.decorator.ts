import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CookieGetter = createParamDecorator(
    async (key: string, contxt: ExecutionContext) : Promise<string> => {
        const request = contxt.switchToHttp().getRequest();

        const refreshToken = request.cookies[key];
        console.log(refreshToken)

        if(!refreshToken){
            throw new BadRequestException("Token is not found")
        }
        return refreshToken;
    }
)
import { IsNotEmpty, IsString } from 'class-validator';


export class CreatUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    idType: string;
}




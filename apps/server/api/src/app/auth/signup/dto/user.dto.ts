import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class Country {
  @IsNotEmpty()
  objectId: string;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  emoji: string;
}

export class Corporation {
  @IsNotEmpty()
  corporationType: string;
  @IsNotEmpty()
  corporationTypeId: number;
}

export class UserDto {
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Country)
  country: Country;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Corporation)
  corporation: Corporation;

  sendMeUsefulInformation: boolean;

  @IsNotEmpty()
  termsPrivacyServicePolicy: boolean;
}

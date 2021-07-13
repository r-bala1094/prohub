import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { generateHashedPassword } from '@prohub/database-core';
import {
  Consultant,
  ConsultantDocument,
  Customer,
  CustomerDocument,
} from '@prohub/database-schema';
import { UserType } from '@prohub/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
/** will extends repository class as abstract class */
export class SignupService {
  constructor(
    @InjectModel(Consultant.name)
    protected consultantModel: Model<ConsultantDocument>,
    @InjectModel(Customer.name)
    protected customerModel: Model<CustomerDocument>,
    public configService: ConfigService
  ) {}
  async createAccount(
    userDto: UserDto
  ): Promise<
    | { statusCode: number; message: string }
    | {
        status?: true;
        statusCode: number;
        message: string;
        data: { [key: string]: string | number };
      }
  > {
    /** check first email exists ot not */

    try {
      const { status } = await this.checkExists({
        accountType: userDto.accountType,
        email: userDto.email,
        matchedQuery: {},
      });
      if (status) {
        throw {
          status: false,
          message: 'Email already exists.',
          data: null,
          statusCode: 400,
        };
      } else {
        return (await this.createAccountToDB(userDto)) as any;
      }
    } catch (err) {
      return err;
    }
  }

  /*****
   * check from db this email exists or not
   * this will in lib-server
   */

  protected async checkExists(userObject: {
    accountType: string;
    email: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    matchedQuery: {};
  }) {
    try {
      const { accountType, email, matchedQuery } = userObject;
      const consultant = await this.consultantModel
        .find(
          {
            $and: [{ email: email }, { accountType: accountType }],
          },
          matchedQuery
        )
        .exec();

      const customer = await this.customerModel
        .find(
          {
            $and: [{ email: email }, { accountType: accountType }],
          },
          matchedQuery
        )
        .exec();

      if (accountType === UserType.CONSULTANT) {
        return {
          status: !consultant.length ? false : true,
          data: consultant,
        };
      } else {
        return {
          status: !customer.length ? false : true,
          data: customer,
        };
      }
    } catch (err) {
      return err;
    }
  }

  /** create account. */
  private async createAccountToDB(
    userDto: UserDto
  ): Promise<{
    status?: boolean;
    statusCode: number;
    message: string;
    data: { [key: string]: string | number };
  }> {
    let account;
    try {
      const { hashedPassword } = await generateHashedPassword(
        userDto.password,
        null
      );
      if (!hashedPassword) {
        throw new Error('Error in creating Account.');
      }
      userDto.password = hashedPassword;
      if (userDto.accountType === UserType.CONSULTANT) {
        account = await new this.consultantModel(userDto);
      } else {
        account = await new this.customerModel(userDto);
      }
      await account.save();

      const { _id } = account;

      return {
        status: true,
        statusCode: 201,
        message: 'Account Created Successfully.',
        data: _id,
      };
    } catch (err) {
      return {
        status: false,
        message: 'Error in creating Account.',
        data: null,
        statusCode: 400,
      };
    }
  }
}

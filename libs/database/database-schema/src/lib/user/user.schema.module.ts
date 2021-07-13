import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultant, ConsultantSchema } from './consultant.schema';
import { Customer, CustomerSchema } from './customer.schema';
import { User, UserSchema } from './user-discriminator.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
      discriminators: [
        { name: Customer.name, schema: CustomerSchema },
        { name: Consultant.name, schema: ConsultantSchema },
      ],
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class UserSchemaModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Country, Corporation } from './interfaces/user.interface';
export type UsersDocument = User & Document;

@Schema({ discriminatorKey: '__type' })
export class User {
  @Prop({ required: true, type: String })
  firstName?: string;

  @Prop({ required: true, type: String })
  lastName?: string;

  @Prop({ required: true, type: String })
  email?: string;

  @Prop({ required: true, type: String })
  password?: string;

  @Prop({ required: true, type: String })
  accountType?: string;

  @Prop({
    required: true,
    type: { objectId: String, code: String, name: String, emoji: String },
  })
  country?: Country;

  @Prop({
    required: true,
    type: { corporationType: String, corporationTypeId: Number },
  })
  corporation?: Corporation;

  /** further common will added here */
}

export const UserSchema = SchemaFactory.createForClass(User);

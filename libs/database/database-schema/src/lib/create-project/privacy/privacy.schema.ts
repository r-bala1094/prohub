import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PrivacyProjectDocument = PrivacyProject & Document;

@Schema()
export class PrivacyProject {
  @Prop({ type: Boolean, required: false })
  publicToWeb?: boolean; // 1 to 7

  @Prop({ type: Boolean, required: false })
  platformToMembers?: boolean;
}

export const PrivacyProjectSchema = SchemaFactory.createForClass(
  PrivacyProject
);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommunicationDocument = Communication & Document;

@Schema()
export class Communication {
  @Prop({ type: Boolean, required: false })
  messaging?: boolean; // 1 to 7

  @Prop({ type: Boolean, required: false })
  audio?: boolean;

  @Prop({ type: Boolean, required: false })
  video?: boolean;
}

export const CommunicationSchema = SchemaFactory.createForClass(Communication);

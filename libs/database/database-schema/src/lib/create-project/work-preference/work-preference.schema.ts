import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkPreferenceDocument = WorkPreference & Document;

@Schema()
export class WorkPreference {
  @Prop({ type: [Number], required: false })
  workWillUnderTaken?: Array<number>; // 1 to 4

  @Prop({ type: Number, required: false })
  empProffessional?: number; // 1 to 5
}

export const WorkPreferenceSchema = SchemaFactory.createForClass(
  WorkPreference
);

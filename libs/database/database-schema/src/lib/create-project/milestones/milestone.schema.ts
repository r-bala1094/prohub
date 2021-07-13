import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type MilestoneDocument = Milestone & Document;

@Schema()
export class Milestone {
  @Prop({
    type: {
      objectId: String,
      name: String,
      currency: String,
      phone: String,
    },
    required: false,
  })
  currencyType?: {
    objectId: string;
    name: string;
    currency: string;
    phone: string;
  }; // 1 to 7

  @Prop({ type: Number })
  amount?: number;
  @Prop({
    type: { startDate: { type: Date }, endDate: { type: Date } },
    required: false,
  })
  platformToMembers?: { startDate: Date; endDate: Date };

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: Boolean, required: false })
  isDeleted?: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  projectId?: string;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);

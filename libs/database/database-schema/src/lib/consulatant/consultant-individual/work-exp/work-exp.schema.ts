import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type WorkExperienceDocument = WorkExperience & Document;

@Schema()
export class WorkExperience {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  profileId?: string;

  @Prop({ type: String })
  title?: string;

  @Prop({
    type: {
      employementTypeId: Number,
      employementType: String,
    },
  })
  employementType?: { employementTypeId: number; employementType: string };

  @Prop({ type: String })
  companyName?: string;

  @Prop({
    type: {
      lat: Number,
      long: Number,
      locationName: String,
    },
  })
  location?: { lat: number; long: number; locationName: string };

  @Prop({
    type: {
      startDate: Date,
      endDate: Date,
      curentlyWorkedHere: Boolean,
    },
  })
  workedDur?: { startDate: Date; endDate: Date; curentlyWorkedHere: boolean };

  @Prop({ type: String })
  description?: string;
}

export const WorkExperienceSchema = SchemaFactory.createForClass(
  WorkExperience
);

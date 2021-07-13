import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type EducationCertificationDocument = EducationCertification & Document;

@Schema()
export class EducationCertification {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  profileId?: string;

  @Prop({ type: String })
  courseCertificateTitle?: string;

  @Prop({ type: String })
  schoolOrUniversity?: string;

  @Prop({
    type: {
      startDate: Date,
      endDate: Date,
      notPassedYet: Boolean,
    },
  })
  workedDur?: { startDate: Date; endDate: Date; curentlyWorkedHere: boolean };

  @Prop({ type: String })
  descriptionOrFaculty?: string;
}

export const EducationCertificationSchema = SchemaFactory.createForClass(
  EducationCertification
);

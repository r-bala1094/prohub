import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ProjectAndServiceDocument = ProjectAndService & Document;

@Schema()
export class ProjectAndService {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  profileId?: string;

  @Prop({ type: String })
  projectAndServiceTitle?: string;

  @Prop({
    type: {
      category: String,
      categoryId: String,
    },
  })
  categories?: { category: string; categoryId: string };

  @Prop({ type: [] })
  subCategories?: Array<{ [key: string]: string }>;

  @Prop({
    type: {
      startDate: Date,
      endDate: Date,
      currentlyWorkingHere: Boolean,
    },
  })
  projectDuration?: {
    startDate: Date;
    endDate: Date;
    currentlyWorkingHere: boolean;
  };

  @Prop({ type: Array })
  uploadedFiles?: Array<{ [key: string]: string }>;
}

export const ProjectAndServiceSchema = SchemaFactory.createForClass(
  ProjectAndService
);

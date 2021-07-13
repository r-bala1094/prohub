import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProjectPreferenceDocument = ProjectPreference & Document;

@Schema()
export class ProjectPreference {
  @Prop({ type: Number, required: false })
  levelOfExpertise?: number; // 1 to 7

  @Prop({ type: { id: String, locationName: String } })
  location?: { id: string; locationName: string };

  @Prop({ type: { min: Number, max: Number } })
  projectSuccessScore?: { min: number; max: number };

  @Prop({ type: Number })
  earnedAmount?: number; // 1 to 4

  @Prop({ type: Number })
  englishLevel?: number; // 1 to 4

  @Prop({
    type: [
      {
        objectId: { type: String },
        name: { type: String },
        code: { type: String },
        native: { type: String },
        levelId: Number,
        level: String,
      },
    ],
  })
  otherLanguage?: Array<{
    objectId: string;
    name: string;
    code: string;
    native: string;
    levelId: number;
    level: string;
  }>;
}

export const ProjectPreferenceSchema = SchemaFactory.createForClass(
  ProjectPreference
);

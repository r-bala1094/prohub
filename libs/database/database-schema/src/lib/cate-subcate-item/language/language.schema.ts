import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LanguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop({ type: String })
  alpha2?: string;

  @Prop({ type: String })
  language?: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsultantDocument = Consultant & Document;

@Schema()
export class Consultant {}

export const ConsultantSchema = SchemaFactory.createForClass(Consultant);

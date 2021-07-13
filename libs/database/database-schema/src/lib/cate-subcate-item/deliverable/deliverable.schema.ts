import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { tranformQuery } from '../../query-util/dataset-transform';
export type DeliverableDocument = Deliverable & Document;

@Schema()
export class Deliverable {
  // @Prop({ type: MongooseSchema.Types.ObjectId })
  // DeliverableId?: string;

  @Prop({ type: String })
  deliverable?: string;
}

export const DeliverableSchema = SchemaFactory.createForClass(Deliverable);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Milestone } from '../milestones/milestone.schema';

export type BudgetDocument = Budget & Document;

@Schema()
export class Budget {
  @Prop({ type: Boolean, required: false })
  payByTheHour?: boolean; // 1 to 7

  @Prop({ type: Boolean, required: false })
  payByFixedPrice?: boolean;

  @Prop({ type: Boolean, required: false })
  notSure?: boolean;

  @Prop({
    type: {
      typicalHour: { type: Boolean, required: false },
      ownHourlyRange: {
        type: {
          selectedCurrency: {
            type: {
              objectId: { type: String },
              name: { type: String },
              currency: { type: String },
              phone: { type: String },

              // currenyId: { type: Number },
              // currenyName: { type: String },
            },
          },

          ammount: { type: { min: { type: Number }, max: { type: Number } } },
        },
        required: false,
      },
      maximumWorkingHour: { type: Number, required: false },
    },
  })
  payByHourEstimatedBudget?: {
    typicalHour: boolean;
    ownHourlyRange: {
      selectedCurrency: {
        objectId: string;
        name: string;
        currency: string;
        phone: string;
      };
      amount: { min: number; max: number };
    };
    maximumWorkingHour: number;
  };

  @Prop({
    type: {
      selectedCurrency: {
        objectId: { type: String },
        name: { type: String },
        currency: { type: String },
        phone: { type: String },
      },
      totalFixedAmount: { type: Number },
    },
    required: false,
  })
  payByFixedPriceSpecificBudget?: {
    selectedCurrency: {
      objectId: string;
      name: string;
      currency: string;
      phone: string;
    };
    totalFixedAmount: number;
  };

  // @Prop({
  //   type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Milestone' }],
  // })
  // milestone?: Milestone;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);

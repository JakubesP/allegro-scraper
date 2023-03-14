import { Model, Document, Schema, model } from 'mongoose';

export interface OfferDocument extends Document {
  title: string;
  url: string;
  price: string;
  extractionTimestamp: number;
}

interface OfferModel extends Model<OfferDocument> {}

const offerSchema = new Schema<OfferDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    extractionTimestamp: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Offer = model<OfferDocument, OfferModel>('Offer', offerSchema);

import mongoose, { Document, Schema, model, models } from 'mongoose';

const componentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  maxQuantity: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  expectedArrival: {
    type: Date,
  },
  quantityHistory: [
    {
      prevQuantity: Number,
      prevDate: Date,
    },
  ],
  branchLocation: {
    type: String,
    required: true,
  },
});

const Component = models.Component || model('Component', componentSchema);

export default Component;

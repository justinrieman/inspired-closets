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
    required: true,
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
});

const Component = models.Component || model('Component', componentSchema);

export default Component;

import mongoose, { Document, Schema, model, models } from 'mongoose';

// export interface IComponent extends Document {
//   type: string;
//   name: string;
//   color: string;
//   quantity: number;
//   maxQuantity: number;
//   lastUpdated: Date;
//   expectedArrival: Date;
// }

// const componentSchema: Schema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   color: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   maxQuantity: {
//     type: Number,
//     required: true,
//   },
//   lastUpdated: {
//     type: Date,
//     required: true,
//   },
//   expectedArrival: {
//     type: Date,
//   },
// });

// const Component =
//   mongoose.models.Component ||
//   mongoose.model<IComponent>('Component', componentSchema);

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

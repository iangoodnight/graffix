import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a customer name'],
    maxLength: [32, 'Name cannot be more than 32 characters'],
  },
  email: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpressions: { email: { $type: 'string' } },
    },
  },
  phone: {
    type: String,
  },
  in_house: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});
console.log(mongoose.models);
export default mongoose.models?.Customer ||
  mongoose.model('Customer', CustomerSchema);

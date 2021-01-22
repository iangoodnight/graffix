import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: [true, 'Please provide an order number.'],
      maxlength: [16, 'Order number cannot be more than 16 characters'],
    },
    customer: {
      /* This will need to refer to the customer collection */
      type: String,
      required: [true, 'Please provide a customer name.'],
      maxlength: [64, 'Name cannot be more than 64 characters.'],
    },
    product: {
      type: String,
    },
    label_quantity: {
      type: Number,
    },
    label_dimensions: {
      height: Number,
      width: Number,
      unit: String,
    },
    laminate: {
      type: String,
      enum: ['', 'high-gloss', 'matte'],
    },
    priority: {
      type: String,
      enum: ['', 'rush', 'reprint'],
    },
    status: {
      type: String,
      enum: [
        'new',
        'initial contact',
        'rendering',
        'pending approval',
        'approved',
        'printed',
        'in progress',
        'on hold',
        'completed',
        'cancelled',
      ],
    },
    in_house: {
      type: Boolean,
      default: false,
    },
    outsourced: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: true,
    },
    po: String,
    order_date: Date,
    production_date: Date,
    completion_date: Date,
    hold_date: Date,
    outsourced_date: Date,
    notes: {
      type: String,
      /* Add some max length */
    },
    history: [
      {
        entry: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
import { getSession } from 'next-auth/client';

import Order from '../../../models/Order';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const {
    query: { id },
    method,
  } = req;

  if (session) {
    await dbConnect();

    switch (method) {
      case 'GET' /* Get an order by its ID */:
        try {
          const order = await Order.findById(id);
          if (!order) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: order });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT' /* Edit an order by its ID */:
        try {
          const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!order) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: order });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'DELETE' /* Delete an order by its ID */:
        try {
          const deletedOrder = await Order.deleteOne({ _id: id });
          if (!deletedOrder) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'You must be signed in to make changes',
    });
  }
}

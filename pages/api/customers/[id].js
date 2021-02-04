import { getSession } from 'next-auth/client';

import Customer from '../../../models/Customer';
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
      case 'GET':
        try {
          console.log(`id: ${id}`);
          const customer = await Customer.findById(id);
          if (!customer) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: customer });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          const customer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!customer) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: customer });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'DELETE':
        try {
          const deletedCustomer = await Customer.deleteOne({ _id: id });
          if (!deletedCustomer) {
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

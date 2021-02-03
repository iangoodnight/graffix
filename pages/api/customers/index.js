import { getSession } from 'next-auth/client';

import Customer from '../../../models/Customer';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;

  if (session) {
    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const customers = await Customer.find({});
          res.status(200).json({ success: true, data: customers });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const customer = await Customer.create(req.body.customer);
          res.status(201).json({ success: true, data: customer });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(403).json({ success: false });
  }
}

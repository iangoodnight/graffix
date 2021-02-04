import { getSession } from 'next-auth/client';

import Order from '../../../models/Order';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;

  if (session) {
    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const orders = await Order.find({}).populate(
            'customer'
          ); /* find all the data in our database */
          res.status(200).json({ success: true, data: orders });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const order = await Order.create(
            req.body
          ); /* create a new model in the database */
          res.status(201).json({ success: true, data: order });
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

import { Request, Response } from "express";
import SubscriptionService from "./SubscriptionService";
import UserModel from "../../database/models/UserModel";
import SubscriptionModel from "../../database/models/SignatureModel";

export default class SubcriptionController {

  constructor() {}

  async handle(req: Request, res: Response) {
    const { userId } = req.body;

    const subscriptionService = new SubscriptionService();

    const subscribe = await subscriptionService.execute({ userId });
    return res.status(201).json(subscribe);
  }
}
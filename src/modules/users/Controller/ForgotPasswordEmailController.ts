import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import User from '../typeorm/entities/User';
import { Response, Request } from 'express';

export default class ForgotPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { email } = request.body;
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmailService.execute({ email });
    return response.status(204).json();
  }
}

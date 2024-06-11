import ResetPasswordService from '../services/ResetPasswordService';
import User from '../typeorm/entities/User';
import { Response, Request } from 'express';

export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { token,password } = request.body;
    const sendForgotPasswordEmailService = new ResetPasswordService();
    await sendForgotPasswordEmailService.execute({ token,password });
    return response.status(204).json();
  }
}

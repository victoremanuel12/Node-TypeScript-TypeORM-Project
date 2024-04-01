import { Request,Response } from "express";
import User from "../typeorm/entities/User";
import CreateSessionsService from "../services/CreateSessionService";

class SessionsController{
  public async createSession(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { email, password } = request.body;
    const createSession =  new CreateSessionsService();
    const user = await createSession.execute({
      email,
      password,
    });
    return response.json(user);
  }
}
export default SessionsController
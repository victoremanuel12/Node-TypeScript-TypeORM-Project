import { Request, Response } from "express";
import User from "../typeorm/entities/User";
import UpdateUserAvatarService from "../services/updateUserAvatarService";

class UserAvatarController {
  public async update(
    request: Request,
    response: Response
  ): Promise<Response<User>> {
    if (!request.file || !request.file.filename) {
      return response.status(400).json({ error: "Avatar file not provided" });
    }

    const avatarService = new UpdateUserAvatarService();
    const user = await avatarService.execute({
      avatarFileName: request.file.filename,
      user_id: request.user.id,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);
    if (typeof user === "undefined") {
      throw new Error("User does not exist");
    } else if (!user.admin) {
      throw new Error("You are not allowed to access this section!");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

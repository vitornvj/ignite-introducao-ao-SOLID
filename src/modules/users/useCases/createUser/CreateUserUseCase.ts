import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userEmailNotAvailable = this.usersRepository.findByEmail(email);
    if (userEmailNotAvailable) {
      throw new Error("Email is not available");
    }
    const user = this.usersRepository.create({
      email,
      name,
    });
    return user;
  }
}

export { CreateUserUseCase };

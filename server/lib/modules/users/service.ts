import { IUser } from "./model";
import Users from "./schema";

export default class UserService {
  public async createUser(userParams: IUser) {
    try {
      const newUser = new Users(userParams);
      const user = await newUser.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async fetchUsers(query?: any) {
    try {
      const users = await Users.find(query);
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async findUser(query: any) {
    try {
      const user = await Users.findOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(userParams: IUser) {
    const query = { _id: userParams._id };

    try {
      const user = await Users.findOneAndUpdate(query, userParams, {
        new: true,
        runValidators: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(_id: String) {
    const query = { _id: _id };

    try {
      const user = await Users.deleteOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

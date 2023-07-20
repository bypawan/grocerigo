import { IUser } from "./model";
import users from "./schema";

export default class UserService {
  public async createUser(user_params: IUser) {
    try {
      const newUser = new users(user_params);
      const user_data = await newUser.save();
      return user_data;
    } catch (error) {
      throw error;
    }
  }

  public async filterUser(query: any) {
    try {
      const user = await users.findById(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(user_params: IUser) {
    const query = { _id: user_params._id };

    try {
      const user = await users.findOneAndUpdate(query, user_params);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(_id: String) {
    const query = { _id: _id };

    try {
      const user = await users.deleteOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

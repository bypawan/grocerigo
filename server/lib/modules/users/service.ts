import { IUser } from "./model";
import Users from "./schema";

export default class UserService {
  public async createUser(user_params: IUser) {
    try {
      const newUser = new Users(user_params);
      const user_data = await newUser.save();
      return user_data;
    } catch (error) {
      throw error;
    }
  }

  public async filterUser(query: any) {
    try {
      const user = await Users.findById(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(user_params: IUser) {
    const query = { _id: user_params._id };

    try {
      const user = await Users.findOneAndUpdate(query, user_params, {
        new: true,
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

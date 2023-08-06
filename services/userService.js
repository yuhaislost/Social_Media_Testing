import User from '../model/userModel.js';
import Thesis from '../utils/Thesis.js';

class UserService{
    async createUser(t_UserData)
    {
        try{
            const newUser = await User.create({
                username: t_UserData.username,
                email: t_UserData.email,
                password: t_UserData.password,
                birth: Date(t_UserData.birth),
            });

            return newUser;
        }catch(error)
        {
            // console.log("ERROR: ",error.message);
            throw new Thesis.Error(error.message, 500);
        }
    }

    async findByEmail(t_Email)
    {
        try{

            const user = await User.find({email: t_Email});

            if (!user)
            {
                throw new Thesis.Error(`The user with ${t_Email} does not exist!`, 404);
            }

            return user;

        }catch(error)
        {
            throw new Thesis.Error(error.message, 500); // Need to fix can be other errors other than 500
        }
    }
};  

export default new UserService();
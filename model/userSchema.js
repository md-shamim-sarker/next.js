import {model, models, Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {type: String, unique: true},
        email: {type: String, unique: true},
        password: String
    }
);

const Users = models.user || model('user', userSchema);

export default Users;
import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
      name: { type: "String", required: true },
      email: { type: "String", unique: true, required: true },
      password: { type: "String", required: true },
      pic: {
        type: "String",
        required: true,
        default:
          "https://github.com/shadcn.png",
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestaps: true }
  );


const User = mongoose.model('User',userSchema);

export default User;
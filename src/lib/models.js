import mongoose from "mongoose";


const  userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
    password: {
        type: String,
        required: true,
        min: 6,
    },  
    profilePicture: {
        type: String,
        default: "",
    },
    isAdmin :{
        type: String ,
        default: "false",

    }


},
{timestamps:true}

);
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      Boolean: false,
      default: "",
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      
    },
      createdAt: {
    type: Date,
    default: Date.now,
  },
  },
  { timestamps: true }
);


 export const user = mongoose.models.user || mongoose.model("user", userSchema);
export const post = mongoose.models.post || mongoose.model("post", postSchema);


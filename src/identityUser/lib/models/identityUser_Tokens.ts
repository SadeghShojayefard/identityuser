import mongoose from "mongoose";

const { Schema } = mongoose;

const TokensSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "identityUser_users",
            required: true,
        },
        identifier: {
            type: String,
            required: true,
            trim: true,
        },
        type: { // Used Email or Phone for Forget Password
            type: String,
<<<<<<< HEAD
            enum: ["email", "phone", "email-verify", "phone-verify", "login-otp", "fallback-login"],
=======
            enum: ["email", "phone", "email-verify", "phone-verify"],
>>>>>>> be9c483b74454327489f9e0de268e1c6b4423d09
            required: true,
        },
        hashedToken: {
            type: String,
            required: true,
            trim: true,
        },
        expireAt: {
            type: Date,
            required: true,
            index: { expires: 0 } // auto delete at expireAt
        },
        attempts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

<<<<<<< HEAD
export default mongoose.models.identityUser_Tokens ||
=======
export default mongoose.models.identityUser_passwordResetToken ||
>>>>>>> be9c483b74454327489f9e0de268e1c6b4423d09
    mongoose.model("identityUser_Tokens", TokensSchema);

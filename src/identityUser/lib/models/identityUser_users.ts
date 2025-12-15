// Users TABLE
import mongoose from "mongoose";

const { Schema } = mongoose;

const identityUser_usersSchema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true
        },
        normalizedUserName: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true
        },
        normalizedEmail: {
            type: Schema.Types.String,
            required: true
        },
        emailConfirmed: {
            type: Schema.Types.Boolean,
            required: true
        },
        passwordHash: {
            type: Schema.Types.String,
            required: true
        },
<<<<<<< HEAD
        passwordLastChanged:
        {
            type: Date,
            default: Date.now,
            required: true
        },
=======
>>>>>>> be9c483b74454327489f9e0de268e1c6b4423d09
        securityStamp: {
            type: Schema.Types.UUID,
            required: true
        },
        concurrencyStamp: {
            type: Schema.Types.UUID,
            required: true
        },

        phoneNumber: {
            type: Schema.Types.String,
            required: false
        },
        phoneNumberConfirmed: {
            type: Schema.Types.Boolean,
            required: true
        },
        twoFactorEnabled: {
            type: Schema.Types.Boolean,
            required: true
        },
        twoFactorSecret: {
            type: Schema.Types.String,
            required: false
        },

        recoveryCodes: {
            type: [Schema.Types.String],
            required: false,
        },
        // twoFactorMethod: { // Used Email or Phone for Forget Password
        //     type: String,
        //     enum: ["none", "totp", "sms", "email"],
        //     required: false,
        // },
        lockoutEnd: {
            type: Schema.Types.Date,
            required: false
        },
        lockoutEnabled: {
            type: Schema.Types.Boolean,
            required: true
        },
        accessFailedCount: {
            type: Schema.Types.Number,
            required: true
        },
        avatar: {
            type: Schema.Types.String,
            required: false,
        },
        name: {
            type: Schema.Types.String,
            required: false
        },


    },
    { timestamps: true }
);

export default mongoose.models.identityUser_users || mongoose.model('identityUser_users', identityUser_usersSchema)

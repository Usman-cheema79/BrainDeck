const mongoose = require("mongoose");

const LoginRecordSchema = new mongoose.Schema(
    {
        date: { type: String },
        duration: { type: Number, default: 0 },
    },
    { _id: false }
);

const UserSchema = new mongoose.Schema(
    {
        firebaseUid: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        name: { type: String ,required: true},
        role: { type: String, enum: ["admin", "student", "teacher"], required: true },
        onlineStatus: { type: Boolean, default: false },
        lastOnlineAt: { type: Date },
        totalQuizAttempts: { type: Number, default: 0 },
        loginHistory: { type: [LoginRecordSchema], default: [] },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
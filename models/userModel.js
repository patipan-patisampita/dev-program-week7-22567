import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//Hash the password before Saving
userSchema.pre('save', async function (next) {
    console.log(this.isModified('password'))
    if (!this.isModified('password')) {
        return next()
    }
    //Hash password with strength of 10
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null)
    return next()
})

//Match user's password using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User //users collection
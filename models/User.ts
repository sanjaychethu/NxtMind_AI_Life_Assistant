import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  email: string
  password: string
  name: string
  favoriteGenres: string[]
  watchHistory: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  name: { 
    type: String, 
    required: true 
  },
  favoriteGenres: [{ 
    type: String 
  }],
  watchHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie' 
  }]
}, {
  timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export type UserDocument = mongoose.Document & IUser 
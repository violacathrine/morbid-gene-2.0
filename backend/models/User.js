import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    favorites: [{
      sellableId: {
        type: String,
        required: true
      },
      name: String,
      productTypeName: String,
      price: {
        amount: Number,
        currencyId: String
      },
      previewImage: {
        url: String
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Create and export User model
const User = mongoose.model("User", userSchema);
export default User;

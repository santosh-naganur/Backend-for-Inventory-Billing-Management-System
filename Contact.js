const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  type: {
    type: String,
    required: [true, 'Contact type is required'],
    enum: {
      values: ['customer', 'vendor'],
      message: 'Type must be either customer or vendor'
    }
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
contactSchema.index({ name: 'text', email: 'text', phone: 'text' });
contactSchema.index({ businessId: 1, type: 1 });
contactSchema.index({ businessId: 1, isActive: 1 });

// Virtual for contact display name
contactSchema.virtual('displayName').get(function() {
  return `${this.name} (${this.type})`;
});

module.exports = mongoose.model('Contact', contactSchema);

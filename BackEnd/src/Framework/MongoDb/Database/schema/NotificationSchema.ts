import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true,
      },
      receiverId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      seen: {
        type: Boolean,
        default: false,
      }
});

const Notification = mongoose.model('Notification', NotificationSchema);

export {
    Notification
};
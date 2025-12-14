import mongoose, {Types} from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },

    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
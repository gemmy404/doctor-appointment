import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    specialty: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    },

    experienceYears: {
        type: Number,
        required: true,
    },
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
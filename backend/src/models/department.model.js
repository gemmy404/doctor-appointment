import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },

    description: {
       type: String,
        required: true,
    },

    image: {
       type: String,
        required: true,
    }
});

export const Department = mongoose.model("Department", departmentSchema);
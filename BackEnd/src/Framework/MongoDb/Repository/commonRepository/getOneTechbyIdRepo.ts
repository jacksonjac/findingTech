import mongoose from 'mongoose';
import { Technican } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (TechId: string) => {
      console.log("Inside PostExit function with questionId:", TechId);

      try {
        // Find the question by questionId
        const technician = await Technican.findOne({ _id: TechId }).populate('designation');
  
        if (!technician) {
          return { status: false, message: "Question not found" };
        }
  
        console.log("Found Question:", technician);
  
        // Return success status with found question data
        return { status: true, data: technician };
      } catch (error) {
        console.error("Error in PostExit function:", error);
        // Return failure status with error message
        return { status: false, message: "An error occurred" };
      }
    }
  };
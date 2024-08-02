import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const appPass = process.env.APP_PASS;
console.log('App Password:', appPass);
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'jacksonjack333r@gmail.com',
    pass: 'ispi oava uktt atrg',
  },
});

const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};



export const RegisterNewUser = (dependencies: any) => {
  const { RegisterNewUserRepo } = dependencies.repositery;

  const executeFunction = async (data: any) => {
    try {
      const responseFromRegisterNewUser = await RegisterNewUserRepo.postExist(data);

      console.log("Response from RegisterNewUserRepo:", responseFromRegisterNewUser);

      if (responseFromRegisterNewUser.status === true) {
        const email: string = responseFromRegisterNewUser.data?.email;
        const userId: string = responseFromRegisterNewUser.data?._id;

        if (!email) {
          console.error("Email is undefined or null.");
          return {
            status: false,
            message: "Failed to extract email",
            Data: responseFromRegisterNewUser,
          };
        }

        const otp: string = generateOTP();
        await sendOtpEmail(email, otp);

        console.log("userId", userId);

        return {
          status: true,
          message: "OTP sent to email",
          Data: responseFromRegisterNewUser,
          OTP: otp,
          token: "jacksontoken",
          id: userId
        };
      }

      return {
        status: false,
        message: responseFromRegisterNewUser.message || "Registration failed",
        Data: responseFromRegisterNewUser,
      };
    } catch (error) {
      console.error("Error in executeFunction:", error);
      return {
        status: false,
        message: "An error occurred during registration",
        error: error
      };
    }
  };

  return { executeFunction };
};

function sendOtpEmail(email: string, otp: string) {
  throw new Error('Function not implemented.');
}

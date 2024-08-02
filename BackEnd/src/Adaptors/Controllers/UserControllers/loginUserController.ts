import { Request, Response } from "express";

export default (dependecies: any) => {
  const LoginNewUserController = async (req: Request, res: Response) => {
    const { loginNewUser } = dependecies.useCase;

    const { email, password } = req.body;

    const data = {
      email,
      password,
    };

    const responce = await loginNewUser(dependecies).executeFunction(data);

    res.send(responce);
  };

  return LoginNewUserController;
};

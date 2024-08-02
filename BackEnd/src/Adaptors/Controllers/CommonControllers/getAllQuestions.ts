import { Request, Response } from "express";

export default (dependecies: any) => {
  const getQuestionController = async (req: Request, res: Response) => {

            console.log("getQuestionController")
    const { AllQuestions} = dependecies.useCase;

   

    const responce = await AllQuestions(dependecies).executeFunction();

    res.send(responce);
  };

  return getQuestionController;
};
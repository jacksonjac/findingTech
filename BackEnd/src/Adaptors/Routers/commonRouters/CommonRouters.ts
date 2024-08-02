import express from "express";
import CommonControllers from "../../Controllers/CommonControllers";
import { getChatsByidController } from "../../Controllers";

export default (dependencies: any) => {
  const { 
           getDesignationCtrl,getOneTechByIdController,getAllQuestions,
           getQuestionbyIdCtrl,
           getUserbyIdControllers,
           getTechbyIdControllers
           ,getAllSlotsCtrl,
           getChatsByidController,getChatListByidCtrl,getChatlistbyTechCtrl,getOneUserbyidCtrl,RoomidtoEmailCtrl
                 } = CommonControllers(dependencies);

  
  const router = express.Router();

    console.log("Common Router")
  router.get("/AllDesignation",getDesignationCtrl)
  router.get("/AllQuestions",getAllQuestions)
  router.put("/QDesi-id",getQuestionbyIdCtrl)
  router.put("/UDesi-id",getUserbyIdControllers)
  router.put("/TDesi-id",getTechbyIdControllers)
  router.get('/getOneTechbyId',getOneTechByIdController)
  router.get('/getOneUserbyId',getOneUserbyidCtrl)
  router.get("/getChatsbyId",getChatsByidController),
  router.get("/AllChatlistByid",getChatListByidCtrl),
  router.get("/AllChatlistByTechid",getChatlistbyTechCtrl),
  router.get("/AllSlots",getAllSlotsCtrl),
  router.post('/sentRoomidToEmail',RoomidtoEmailCtrl)
 
  
 


  return router;
};

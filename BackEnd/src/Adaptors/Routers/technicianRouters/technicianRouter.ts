import express from "express";

import techniciansControllers from "../../Controllers/techniciansCtrl";
import multer from '../../Utilities/multer';

export default (dependencies: any) => {
  const { 
           RegisterTechController,LogintechinicianController,VerifyidController,GetTechbyidCtrl,CanselSlotController,

                 AddnewSlotCtrl,TechImageUpload} = techniciansControllers(dependencies);
                 
  console.log("this is technician router")
  
  const router = express.Router();

  router.post("/newTech", RegisterTechController);
  router.post('/newTechlogin',LogintechinicianController)
  router.put('/verify',VerifyidController)
  router.get('/GetTechDatabyId',GetTechbyidCtrl)
  router.post('/newSlot',AddnewSlotCtrl),
  router.put('/canselSlot',CanselSlotController),
  router.post('/UploadImage', multer.single('image'), TechImageUpload);
  

  return router;
};

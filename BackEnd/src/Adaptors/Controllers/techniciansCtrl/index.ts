import technicianRegisterController from './technicianRegisterController'
import logintechinician from './logintechinicianController'
import VerifyIdcontroller from './VerifyIdcontroller'
import GetTechbyidCtrl from './GetTechbyidCtrl'
import AddnewSlotCtrl from './AddnewSlotCtrl'
import CanselSlotController from './CanselSlotController'
import TechImageUpload from './TechImageUpload'


export default (dependencies:any)=>{

 return {
    RegisterTechController:technicianRegisterController(dependencies),
    LogintechinicianController:logintechinician(dependencies),
    VerifyidController:VerifyIdcontroller(dependencies),
    GetTechbyidCtrl:GetTechbyidCtrl(dependencies),
    AddnewSlotCtrl:AddnewSlotCtrl(dependencies),
    CanselSlotController:CanselSlotController(dependencies),
    TechImageUpload:TechImageUpload(dependencies)
    
 }

}
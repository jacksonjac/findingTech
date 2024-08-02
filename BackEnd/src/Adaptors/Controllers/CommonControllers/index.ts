
import getDesignationCtrl from './getDesignationCtrl'
import getAllQuestions from './getAllQuestions'
import getQuestionbyIdCtrl from './getQuestionbyIdCtrl'
import getTechbyIdControllers from './getTechbyIdControllers'
import getUserbyIdControllers from './getUserbyIdControllers'
import getOneTechByIdController from './getOneTechbyidCtrl'
import getAllSlotsCtrl from './getAllSlotsCtrl'

import getChatsByidController from './getChatsByidsCtrl'
import getChatListByidCtrl from './getChatListByidCtrl'
import getChatlistbyTechCtrl from './getChatlistbyTechCtrl'
import getOneUserbyidCtrl from './getOneUserbyidCtrl'

export default (dependencies:any)=>{

 return {
    
    getDesignationCtrl:getDesignationCtrl(dependencies)  ,
    getAllQuestions:getAllQuestions(dependencies),
    getQuestionbyIdCtrl:getQuestionbyIdCtrl(dependencies),
    getUserbyIdControllers:getUserbyIdControllers(dependencies),
    getTechbyIdControllers:getTechbyIdControllers(dependencies),
    getOneTechByIdController:getOneTechByIdController(dependencies),
    getAllSlotsCtrl:getAllSlotsCtrl(dependencies),
    getChatListByidCtrl:getChatListByidCtrl(dependencies),
    getChatsByidController:getChatsByidController(dependencies),
    getChatlistbyTechCtrl:getChatlistbyTechCtrl(dependencies),
    getOneUserbyidCtrl:getOneUserbyidCtrl(dependencies)
 }

}
import {AddNewAddress, AddNewComment, addNewSlot, AdminApproveTech, AdminRefuseTech, AllSlots, CanselSlot, DeleteDesignation, GetAllChatsbyIds, GetAllChatsListbyid, GetAllChatsListbyTechid, GetAllCommentsbyTechid, getBookingsbyUserId, getOneTEchById, getOneUserById, getSlotDatabyId, MessageHandler, RegisterNewUser, RoomidtoEmail, TechUploadImage, UploadImage, UserAddnewSlot} from '../../Application'
import { loginNewUser } from '../../Application'
import { CanselSlotRepo, LogTechRepo, RegisterNewUserRepo, TechImageUploadRepo, UserImageUploadRepo, addNewCommetRepo, blockUserRepo, chatRepo, getBookingsbyUseridRepo, getChatlistbyTechidRepo, getChatlistbyidRepo, getCommetsbyidRepo, getOneUserbyidRepo, getSlotsDatabyIdRepo, getSlotsRepo, googlenewUserRepo} from '../MongoDb/Repository'
import { loginNewUserRepo} from '../MongoDb/Repository'
import { GoogleRegister } from '../../Application'
import { RegisterNewTech } from '../../Application'
import {RegisterNewTechRepo} from '../MongoDb/Repository'
import { loginNewAdmin } from '../../Application'
import {logAdminRepo} from '../MongoDb/Repository'
import { Adminuserlist } from '../../Application'
import {AdUserlistRepo} from '../MongoDb/Repository'
import { AdminBlockUser } from '../../Application'
import { loginNewTech } from '../../Application'
import { AdminUnBlockUser } from '../../Application'
import {UnblockUserRepo} from "../MongoDb/Repository"
import { VerifyUser } from '../../Application'
import {VerifyIdRepo} from '../MongoDb/Repository'
import { AdminTechlist } from '../../Application'
import {AdTechlistRepo} from '../MongoDb/Repository'
import { AdminBlockTech } from '../../Application'
import {blockTechRepo} from '../MongoDb/Repository'
import { UnblockTechRepo } from '../MongoDb/Repository'
import {AdminUnblockTech} from '../../Application'
import { VerifyTech } from '../../Application'
import {VerifyTechidRepo} from '../MongoDb/Repository'
import { AddDesignation } from '../../Application'
import { AllDesignation } from '../../Application'
import {getDesignationRepo} from '../MongoDb/Repository'
import { AddQuestion } from '../../Application'
import {AddDesignationRepo} from '../MongoDb/Repository'
import { AddQuestionRepo} from '../MongoDb/Repository'
import { AllQuestions } from '../../Application'
import { getAllQuestionRepo } from '../MongoDb/Repository'
import { getQuestionById } from '../../Application'
import {getQuestionByidRepo} from '../MongoDb/Repository'
import { UpdateQuestion } from '../../Application'
import {UpdateQuesitonRepo} from '../MongoDb/Repository'
import { DeleteQuestion } from '../../Application'
import {DeleteQuestionRepo} from '../MongoDb/Repository'
import { getUserById } from '../../Application'
import { getTechbyIdRepo } from '../MongoDb/Repository'
import { getTechById } from '../../Application'
import { UpdateDesignation } from '../../Application'
import {UpdateDesiRepo} from '../MongoDb/Repository'
import {ApproveTechRepo} from '../MongoDb/Repository'
import {RefuseTechRepo} from '../MongoDb/Repository'
import {DeleteDesiRepo} from '../MongoDb/Repository'
import { GetTechById } from '../../Application'
import {GetTechbyIdRepo} from '../MongoDb/Repository'
import { getOneQuestionById } from '../../Application'
import {getOneQuestionbyIdRepo} from '../MongoDb/Repository'
import {getOneTechbyIdRepo} from "../MongoDb/Repository"
import {AddnewSlotRepo} from '../MongoDb/Repository'
import {UserAddnewSlotRepo} from '../MongoDb/Repository'
import {Addnew_Address_SlotRepo} from '../MongoDb/Repository'
import {getChatsByidRepo}from '../MongoDb/Repository'

const useCase:any={
    RegisterNewUser,
    loginNewUser,
    GoogleRegister,
    RegisterNewTech,
    loginNewAdmin,
    Adminuserlist,
    AdminBlockUser,
    loginNewTech,
    AdminUnBlockUser,
    VerifyUser,
    AdminTechlist,
    AdminBlockTech,
    AdminUnblockTech,
    VerifyTech,
    AddDesignation,
    AllDesignation,
    AddQuestion,
    AllQuestions,
    getQuestionById,
    UpdateQuestion,
    DeleteQuestion,
    getTechById,
    getUserById,
    UpdateDesignation,
    AdminApproveTech,
    AdminRefuseTech,
    DeleteDesignation,
    GetTechById,
    getOneQuestionById,
    getOneTEchById,
    addNewSlot,
    AllSlots,
    UserAddnewSlot,
    AddNewAddress,
    getSlotDatabyId,
    getBookingsbyUserId,
    CanselSlot,
    UploadImage,
    MessageHandler,
    GetAllChatsbyIds,
    GetAllChatsListbyid,
    GetAllChatsListbyTechid,
    getOneUserById,
    TechUploadImage,
    RoomidtoEmail,
    AddNewComment,
    GetAllCommentsbyTechid

    
    
    
    


    
    
   
    
}

//This is Our All Repositary Functions
const repositery:any={
   RegisterNewUserRepo,
   loginNewUserRepo,
   googlenewUserRepo,
   RegisterNewTechRepo,
   LogTechRepo,
   logAdminRepo,
   AdUserlistRepo,
   blockUserRepo,
   UnblockUserRepo,
   VerifyIdRepo,
   AdTechlistRepo,
   blockTechRepo,
   UnblockTechRepo,
   VerifyTechidRepo,
   AddDesignationRepo,
   getDesignationRepo,
   AddQuestionRepo,
   getAllQuestionRepo,
   getQuestionByidRepo,
   UpdateQuesitonRepo,
   DeleteQuestionRepo,
   getTechbyIdRepo,
   UpdateDesiRepo,
   ApproveTechRepo,
   RefuseTechRepo,
   DeleteDesiRepo,
   GetTechbyIdRepo,
   getOneQuestionbyIdRepo,
   getOneTechbyIdRepo,
   AddnewSlotRepo,
   getSlotsRepo,
   UserAddnewSlotRepo,
   Addnew_Address_SlotRepo,
   getSlotsDatabyIdRepo,
   getBookingsbyUseridRepo,
   CanselSlotRepo,
   UserImageUploadRepo,
   chatRepo,
   getChatsByidRepo,
   getChatlistbyidRepo,
   getChatlistbyTechidRepo,
   getOneUserbyidRepo,
   TechImageUploadRepo,
   addNewCommetRepo,
   getCommetsbyidRepo
   
   

   
   

}


export default {
    useCase,repositery
}
import { Router } from 'express'
import getController from '../controllers/getController.js'
import authMiddleWare from '../middlewares/middleWare.js'

const router = new Router()
router.get('/area', getController.getAreas)
router.get('/street', getController.getStreets)
router.get('/application', authMiddleWare, getController.getApplications)
router.get('/employeeApplication', authMiddleWare, getController.getEmployees)
router.get('/status', authMiddleWare, getController.getStatus)
router.get('/breaking', authMiddleWare, getController.getBreaking)
router.get('/type', authMiddleWare, getController.getType)
router.get('/elevator', authMiddleWare, getController.getElevator)
router.get('/allEmployees', authMiddleWare, getController.getAllEmployees)
router.get('/post', authMiddleWare, getController.getPost)
router.get('/users', authMiddleWare, getController.getUsers)
router.get(
  '/manufacturerType',
  authMiddleWare,
  getController.getManufacturerType
)
router.get('/manufacturer', authMiddleWare, getController.getManufacturer)
router.get('/address', authMiddleWare, getController.getAddress)
router.get('/elevatorType', authMiddleWare, getController.getElevatorType)
router.get('/feature', authMiddleWare, getController.getFeature)
router.get('/part', authMiddleWare, getController.getPart)
router.get('/userAddress', authMiddleWare, getController.getUserAddress)
router.get('/partView', authMiddleWare, getController.getPartView)
router.get('/employeeView', authMiddleWare, getController.getEmployeeView)
router.get('/user', authMiddleWare, getController.getUser)
router.get('/addressNumber', authMiddleWare, getController.getAddressNumber)
router.get('/filterApp', authMiddleWare, getController.getFilterApplications)

export default router

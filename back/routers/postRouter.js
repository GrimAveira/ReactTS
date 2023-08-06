import { Router } from 'express'
import postController from '../controllers/postController.js'
import authMiddleWare from '../middlewares/middleWare.js'

const router = new Router()
router.put('/update', authMiddleWare, postController.updateApplication)
router.post('/add', authMiddleWare, postController.newApplication)
router.post('/street', authMiddleWare, postController.newStreet)
router.post(
  '/applicationStatus',
  authMiddleWare,
  postController.newApplicationStatus
)
router.post('/area', authMiddleWare, postController.newArea)
router.post('/role', authMiddleWare, postController.newRole)
router.post('/post', authMiddleWare, postController.newPost)
router.post(
  '/manufacturerType',
  authMiddleWare,
  postController.newManufacturerType
)
router.post('/feature', authMiddleWare, postController.newFeature)
router.post('/elevatorType', authMiddleWare, postController.newElevatorType)
router.post('/breaking', authMiddleWare, postController.newBreaking)
router.post(
  '/applicationType',
  authMiddleWare,
  postController.newApplicationType
)
router.post('/employee', authMiddleWare, postController.newEmployee)
router.post('/manufacturer', authMiddleWare, postController.newManufacturer)
router.post('/part', authMiddleWare, postController.newPart)
router.post('/address', authMiddleWare, postController.newAddress)
router.post('/elevator', authMiddleWare, postController.newElevator)
router.post(
  '/elevatorFeatures',
  authMiddleWare,
  postController.newElevatorFeature
)
router.post('/elevatorParts', authMiddleWare, postController.newElevatorPart)
router.post(
  '/elevatorUpdate',
  authMiddleWare,
  postController.updateElevatorAddress
)
router.post('/elevatorDelete', authMiddleWare, postController.deleteElevator)
router.post(
  '/updateElevatorPart',
  authMiddleWare,
  postController.updatePartElevator
)
router.post(
  '/deleteElevatorPart',
  authMiddleWare,
  postController.deletePartElevator
)
router.post('/updateUser', authMiddleWare, postController.updateUser)
export default router

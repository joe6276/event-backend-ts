import { Router } from "express";
import { deleteEvent, getEvent, getEvents, insertEvent, updateEvent } from "../controller";


const router = Router()
router.get('/', getEvents)
router.get('/:id', getEvent)
router.post('', insertEvent)
router.put('/:id', updateEvent)
router.delete('/:id',deleteEvent)



export default router 
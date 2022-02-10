//Desc Creating Routers

import nc from 'next-connect'
import dbConn from '../../../server/config/dbConn'
import {
	allNote,
	newNote,
	multipleNote,
} from '../../../server/controllers/noteController'
import onError from '../../../server/middlewares/errors'

const handler = nc({ onError })
dbConn()

//Desc: {{GET}} Get All Notes        =>     /api/notes
handler.get(allNote)

//Desc: {{POST}} Create New Note     =>     /api/notes
handler.post(newNote)

//Desc: {{POST}}  Multiple Notes     =>     /api/notes
handler.post(multipleNote)

export default handler

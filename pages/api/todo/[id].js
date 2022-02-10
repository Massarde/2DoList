//Desc Creating Routers

import nc from 'next-connect'
import dbConn from '../../../server/config/dbConn'
import {
	getSingleNote,
	updateNote,
	deleteNote,
} from '../../../server/controllers/noteController'

//Desc: Using {{onError}} to handle all the errors coming from the app
import onError from '../../../server/middlewares/errors'

const handler = nc({ onError })
dbConn()

//Desc: {{GET}} Note Details       =>     /api/notes
handler.get(getSingleNote)

//Desc: {{UPDATE}} Note            =>     /api/notes
handler.put(updateNote)

//Desc: {{DELETE}} Note            =>     /api/notes
handler.delete(deleteNote)

export default handler

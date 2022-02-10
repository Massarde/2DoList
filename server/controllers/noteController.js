import Note from '../models/noteSchema'
import ErrorHandler from '../utils/errorHandler'
// import APIFeatures from '../utils/apiFeatures'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'

//Desc: {{GET}} Get All Note   =>     /api/note
const allNote = catchAsyncErrors(async (req, res, next) => {
	const note = await Note.find()
	if (!note) {
		return next(new ErrorHandler('Notes Not Found With This ID', 404))
	}
	res.status(200).json({ success: true, note })
})
//-------------------x-------------------\\
//Desc:{{GET}} Note GET single Note   =>     /api/note

const getSingleNote = catchAsyncErrors(async (req, res, next) => {
	const note = await Note.findById(req.query.id)
	if (!note) {
		return next(new ErrorHandler('Note Not Found With This ID', 404))
	}
	res.status(200).json({ success: true, note })
})

//-------------------x-------------------\\

//Desc:{{POST}} Create New Note   =>     /api/note
const newNote = catchAsyncErrors(async (req, res) => {
	const note = await Note.create(req.body)
	res.status(200).json({ success: true, note })
})
//-------------------x-------------------\\

//Desc:{{UPDATE}} Note UPDATE single Note   =>     /api/note
const updateNote = catchAsyncErrors(async (req, res) => {
	//Desc: First get the note with the id
	let note = await Note.findById(req.query.id)
	if (!note) {
		return next(new ErrorHandler('Note Not Found With This ID', 404))
	}
	//Desc: Then update the note with the note input
	note = await Note.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	})
	//Desc: Update the data-bases
	res.status(200).json({ success: true, note })
})

//-------------------x-------------------\\

//Desc:{{DELETE}} Note DELETE single Note   =>    /api/note
const deleteNote = catchAsyncErrors(async (req, res) => {
	const {
		query: { id },
		method,
	} = req
	//Desc: First get the note with the id
	let note = await Note.deleteOne({ _id: id })
	if (!note) {
		return next(new ErrorHandler('Note Not Found With This ID', 404))
	}
	//Desc: Update the data-bases
	res.status(200).json({ success: true, message: 'Note Deleted' })
})

//Desc:{{POST}} Multiple Note   =>     /api/note
const multipleNote = catchAsyncErrors(async (req, res) => {
	const note = await Note.insertMany(req.body)
	res.status(200).json({ success: true, note })
})
//-------------------x-------------------\\

export { allNote, newNote, multipleNote, getSingleNote, updateNote, deleteNote }

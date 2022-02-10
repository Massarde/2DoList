const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Title is required'],
			unique: false,
			trim: true,
			maxLenght: [40, 'Title cannot be over 40 characters'],
		},
		email: {
			type: String,
			required: [true, 'Title is required'],
			unique: false,
			maxLenght: [40, 'Title cannot be over 40 characters'],
		},
		todosList: [
			{
				priority: { type: String, required: [true, 'Priority is required'] },
				description: {
					type: String,
					required: [true, 'Description is required'],
				},
				isCompleted: {
					type: Boolean,
					required: [true, 'isCompleted is required'],
				},
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)

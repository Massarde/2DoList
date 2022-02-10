import Layout from '@/components/Layout'
import css from '@/styles/main.module.css'
import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'

import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0'
import Card from '@/components/Card'
import router from 'next/router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '@/components/Loader'
import Tutorial from '@/components/Tutorial'

export default function Todos({ userData }) {
	const { user, error, isLoading } = useUser()
	const [priority, setPriority] = useState('high')
	const [priorityMessage, setPriorityMessage] = useState([])
	const [tess, setTess] = useState([])
	const [isSubmit, setIsSubmit] = useState(false)
	const [tutorial, setTutorial] = useState(false)
	const [isHover, setIsHover] = useState(null)
	const [values, setValues] = useState({
		name: '',
		email: '',
		priority: priority,
		description: '',
		isCompleted: false,
	})
	const noteCreated = {
		name: values.name,
		email: values.email,
		todosList: [
			{
				priority: values.priority,
				description: values.description,
				isCompleted: values.isCompleted,
			},
		],
	}
	if (tutorial) {
		const timer = setTimeout(() => {
			setTutorial(false)
		}, 31191)
	}
	useEffect(() => {
		if (isSubmit) {
			setIsSubmit(false)
			createNote()
			setValues({
				...values,
				description: '',
			})
		}
	}, [isSubmit])
	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		)
	}
	const createNote = async () => {
		try {
			await fetch('http://localhost:3000/api/todo', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(noteCreated),
			})
			router.push('/todos')
		} catch (error) {
			console.log(error)
		}
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (values.description.length === 0) {
			toast.error('Note is empty')
		} else {
			setValues({
				...values,
				name: user.name,
				email: user.email,
				priority: priority,
				isCompleted: false,
			})
			setIsSubmit(true)
		}
	}
	const getDataByEmail = userData.note.filter(function (obj) {
		return obj.email === user.email
	})
	const todosText = userData.note.filter(function (obj) {
		return obj.todosList[0].isCompleted === false
	})
	const completedText = userData.note.filter(function (obj) {
		return obj.todosList[0].isCompleted === true
	})
	return (
		<Layout title='Todos | Home Page'>
			<div className={css.todos_container}>
				<ToastContainer />
				<div className={css.welcome_logout}>
					<div
						className={
							isHover === true
								? `${css.hover_true}`
								: isHover === false
								? `${css.hover_false}`
								: `${css.hide_hover}`
						}
					>
						Tutorial..
					</div>
					<p>
						Hello{' '}
						<span className={css.userName}>{!user ? 'User' : user.name}</span>
					</p>
					<div
						className={css.logout}
						onClick={() => setTutorial(true)}
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					>
						<BsThreeDotsVertical />
					</div>
				</div>
				<h2 className={css.add_todos_text}>Add Todo</h2>
				<div className={css.priority_container}>
					<p>Chose Priority :</p>
					<div
						className={`${css.priority} ${css.priority_high}`}
						onClick={() => setPriority('high')}
						onMouseEnter={() =>
							setPriorityMessage([true, 'Mark Note As High Priority!'])
						}
						onMouseLeave={() =>
							setPriorityMessage([false, 'Mark Note As High Priority!'])
						}
					>
						{priority == 'high' && <BsCheck className={css.icon} />}
					</div>
					<div
						className={`${css.priority} ${css.priority_medium}`}
						onClick={() => setPriority('medium')}
						onMouseEnter={() =>
							setPriorityMessage([true, 'Mark Note As Medium Priority!'])
						}
						onMouseLeave={() =>
							setPriorityMessage([false, 'Mark Note As Medium Priority!'])
						}
					>
						{priority == 'medium' && <BsCheck className={css.icon} />}
					</div>
					<div
						className={`${css.priority} ${css.priority_low}`}
						onClick={() => setPriority('low')}
						onMouseEnter={() =>
							setPriorityMessage([true, 'Mark Note As Low Priority!'])
						}
						onMouseLeave={() =>
							setPriorityMessage([false, 'Mark Note As Low Priority!'])
						}
					>
						{priority == 'low' && <BsCheck className={css.icon} />}
					</div>
					<div
						className={
							priorityMessage[0] === true
								? `${css.priority_message}`
								: priorityMessage[0] === false
								? `${css.priority_message_off}`
								: `${css.priority_message_hidden}`
						}
					>
						{priorityMessage[1]}
					</div>
				</div>
				<div className={css.input_container}>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Add Todo'
							name='description'
							autoComplete='off'
							value={values.description}
							onChange={handleChange}
						/>
						<div className={css.btn} onClick={handleSubmit}>
							+
						</div>
					</form>
				</div>
				<div className={css.card_head_text}>
					{todosText.length > 0 && <p>To Dos</p>}
					{getDataByEmail
						.map((todo) => (
							<div key={todo._id}>
								{todo.todosList[0].isCompleted === false && (
									<Card todo={todo} />
								)}
							</div>
						))
						.reverse()}
				</div>
				<div className={css.card_head_text}>
					{completedText.length > 0 && (
						<p className={css.card_head_text_completed}>Completed</p>
					)}

					{getDataByEmail
						.map((todo) => (
							<div key={todo._id}>
								{todo.todosList[0].isCompleted === true && <Card todo={todo} />}
							</div>
						))
						.reverse()}
				</div>
			</div>
			{tutorial && <Tutorial setTutorial={setTutorial} />}
		</Layout>
	)
}

//using getServerSideProps with withPageAuthRequired
export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		// Getting user data from Auth0
		const user = getSession(context.req).user
		const res = await fetch('http://localhost:3000/api/todo/')
		const users = await res.json()
		return {
			props: { userData: users },
		}
	},
})

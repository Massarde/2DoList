import css from './index.module.css'
import { BsCheck } from 'react-icons/bs'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import { GoCalendar } from 'react-icons/go'
import { IoIosCloseCircle } from 'react-icons/io'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import Moment from 'react-moment'
import TimeAgo from 'react-timeago'

export default function Card({ todo }) {
	const [modal, setModal] = useState(false)
	const [value, onChange] = useState()
	const [isDeleted, setIsDeleted] = useState(false)
	const [loading, setLoading] = useState(false)
	const { description, priority, isCompleted } = todo.todosList[0]
	const deleT = () => {
		setIsDeleted(true)
		const timer = setTimeout(() => {
			deleteNote()
		}, 100)
	}
	const deleteNote = async () => {
		try {
			await fetch(`http://localhost:3000/api/todo/${todo._id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
			router.push('/todos')
		} catch (error) {
			console.log(error)
		}
	}
	const updateNote = async () => {
		try {
			await fetch(`http://localhost:3000/api/todo/${todo._id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: todo.name,
					email: todo.email,
					todosList: [
						{
							priority: priority,
							description: description,
							isCompleted: !todo.todosList[0].isCompleted,
						},
					],
				}),
			})
			router.push('/todos')
			// setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	const handleComplete = () => {
		setLoading(true)
		updateNote()
	}
	const handleDate = () => {
		setModal(true)
	}
	return (
		<div className={css.MAIN_CONTAINER}>
			<div
				className={
					isDeleted === true ? ` ${css.card} ${css.delAnime}` : `${css.card}`
				}
			>
				{loading && <div className={css.load}></div>}
				<div
					className={
						priority === 'high'
							? `${css.priority} ${css.priority_high}`
							: priority === 'medium'
							? `${css.priority} ${css.priority_medium}`
							: priority === 'low'
							? `${css.priority} ${css.priority_low}`
							: ''
					}
				></div>
				<div className={css.priority_completed}>
					<div
						className={
							isCompleted ? ` ${css.itsCompleted}` : `${css.completed}`
						}
						onClick={handleComplete}
					>
						{isCompleted && <BsCheck className={css.icon} />}
					</div>
				</div>
				<div className={css.description_container}>
					<p
						className={
							!isCompleted
								? `${css.description}`
								: `${css.description_completed}`
						}
					>
						{description}
					</p>
				</div>
				<div className={css.calendar_delete}>
					<div className={css.calendar} onClick={handleDate}>
						<GoCalendar />
					</div>
					<div className={css.delete} onClick={deleT}>
						<Image
							src='/image/trashTwo.png'
							alt=''
							layout='responsive'
							width={69}
							height={83}
							quality={100}
						/>
					</div>
				</div>
			</div>
			<div>
				{modal && (
					<div className={css.modal_container} onClick={() => setModal(false)}>
						<div className={css.calend_container}></div>
					</div>
				)}
				{modal && (
					<div className={css.modal_}>
						<IoIosCloseCircle
							className={css.close_btn}
							onClick={() => setModal(false)}
						/>
						<Calendar
							className={css.calend}
							onChange={onChange}
							value={new Date(todo.createdAt.toString())}
						/>
						<div className={css.formatDate}>
							<Moment format=' Do MMM,  h:mm:ssa,' className={css.moment}>
								{todo.createdAt}
							</Moment>
							<TimeAgo date={todo.createdAt} className={css.timeago} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

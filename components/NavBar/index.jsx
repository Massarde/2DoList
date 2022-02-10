import css from './index.module.css'
import Image from 'next/image'
import { FaUserAlt } from 'react-icons/fa'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
const Navbar = () => {
	const { user, error, isLoading } = useUser()
	const [isHover, setIsHover] = useState('')

	return (
		<header>
			<nav className={css.mainContainer}>
				<div className={css.img_title}>
					<div className={css.img}>
						<Image
							src='/image/todoIcon.png'
							alt=''
							layout='responsive'
							width={150}
							height={153}
						/>
					</div>
					<div className={css.text_title}>
						<p>ZDoList</p>
					</div>
				</div>
				<div
					className={css.icon}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<a
						href={user ? '/api/auth/logout' : '/api/auth/login'}
						aria-label='Todo page'
					>
						{user ? (
							<img src={user.picture} className={css.user_picture} />
						) : (
							<div className={css.icon_user}>
								<FaUserAlt />
							</div>
						)}
					</a>
					<div
						className={
							isHover === true
								? `${css.hover_true}`
								: isHover === false
								? `${css.hover_false}`
								: `${css.hide_hover}`
						}
					>
						{!user ? 'Login..' : 'Logout..'}
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar

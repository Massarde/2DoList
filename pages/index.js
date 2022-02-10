import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { StartUp } from '@/components'
import css from '@/styles/main.module.css'

import { UserProvider, useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

export default function Home() {
	const { user, error, isLoading } = useUser()
	const router = useRouter()
	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		)
	}
	if (user) {
		router.push('/todos')
	}
	return (
		<>
			<Layout title='SingUp | Home Page'>
				<div className={css.mainContainer}>
					<main>
						<section>
							<div className={css.signUp_container}>
								<h1>It&apos;s Free!</h1>
								<h2>Sign Up or Login</h2>
								<p>Is Quickly, Easy and You Can Save All Your Todos</p>
								<div className={css.btn}>
									<a href={'/api/auth/login'}>Yes! Sign me up!</a>
								</div>
								<div className={css.img_container}>
									<div className={css.img_todos}>
										<Image
											src='/image/todosPic.png'
											alt=''
											layout='responsive'
											width={720}
											height={799}
											// loading={'lazy'}
											priority={true}
										/>
									</div>
									<div className={css.img_calendar}>
										<div>
											<Image
												src='/image/calendar.png'
												alt=''
												layout='responsive'
												width={540}
												height={441}
												loading={'lazy'}
											/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</main>
				</div>
			</Layout>
		</>
	)
}

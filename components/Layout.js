import Head from 'next/head'
import css from '../styles/main.module.css'
import { NavBar, Footer } from '@/components'
import { useRouter } from 'next/router'
// import Hero from './Hero'

export default function Layout({ title, keyowrds, description, children }) {
	const router = useRouter()
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
				<meta name='descriptions' content={description} />
				<meta name='keywords' content={keyowrds} />
			</Head>
			<NavBar />
			{/* {router.pathname === '/' && <Hero />} */}
			<div className={css.container}>{children}</div>
			<Footer />
		</div>
	)
}

Layout.defaultProps = {
	title: 'Sport News | Find Latest Sport News',
	description: 'A Website that brings you latest news about sports',
	keyowrds: 'cricket, football, f1, tennis, badminton, golf',
}

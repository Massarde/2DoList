import css from './index.module.css'
import Moment from 'react-moment'

const Footer = () => {
	const timeStamp = new Date()

	return (
		<footer className={css.mainContainer}>
			2DoList All Rights Reserved{' '}
			<div>
				CopyRight &copy;&nbsp;
				<Moment format=' YYYY' className={css.moment}>
					{timeStamp}
				</Moment>
			</div>
		</footer>
	)
}

export default Footer

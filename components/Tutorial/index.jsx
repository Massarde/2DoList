import css from './index.module.css'
import Image from 'next/image'
export default function Tutorial({ setTutorial }) {
	return (
		<div className={css.MAIN_CONTAINER}>
			<div
				className={css.modal_background}
				onClick={() => setTutorial(false)}
			></div>
			<div className={css.foreground}>
				<Image
					src='/image/tutorialGif.gif'
					alt=''
					layout='responsive'
					width={383}
					height={488}
					quality={100}
				/>
			</div>
		</div>
	)
}

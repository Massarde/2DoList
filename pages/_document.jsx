import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charset='UTF-8' />
					<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/>
					<meta
						name='description'
						content='Author: Paulo Massarde Author,
    				A simple app to track all your todos'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id='modal-root'></div>
				</body>
			</Html>
		)
	}
}

export default MyDocument

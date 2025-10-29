export default function AboutUs() {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-8 space-y-6 animate-page-fade'>
			<h1 className='text-3xl font-bold text-gray-800'>About Us</h1>
			<p className='text-gray-600 text-center max-w-xl'>
				Welcome to my project! Here’s a short video that tells a bit more about us.
			</p>

			<div className='w-full max-w-2xl aspect-video'>
				<iframe
					className='w-full h-full rounded-xl shadow-lg'
					src='https://www.youtube.com/embed/DWtxuQHN7nk'
					title='About Us Video'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				></iframe>
			</div>
		</main>
	)
}

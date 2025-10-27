export default function Loading() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
			<div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
				<div className='flex justify-center mb-6'>
					<div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600'></div>
				</div>

				<h2 className='text-xl font-semibold text-gray-900 mb-2'>Loading...</h2>

				<p className='text-gray-600'>Please wait while we load the content</p>
			</div>
		</div>
	)
}

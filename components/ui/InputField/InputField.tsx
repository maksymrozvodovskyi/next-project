type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
}

export const InputField = ({ label, id, ...props }: Props) => {
	return (
		<div className='mb-4'>
			{label && (
				<label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
					{label}
				</label>
			)}
			<input
				id={id}
				className='input-focus appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
				{...props}
			/>
		</div>
	)
}

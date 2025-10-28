type Props = {
	label: string
	value: string
	isEditing: boolean
	onChange: (value: string) => void
	type?: 'text' | 'email' | 'tel'
	placeholder?: string
}

export function EditableField({ label, value, isEditing, onChange, type = 'text', placeholder }: Props) {
	return (
		<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
			<dt className='text-sm/6 font-medium text-gray-100'>{label}</dt>
			<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
				{isEditing ? (
					<input
						type={type}
						value={value}
						onChange={e => onChange(e.target.value)}
						className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
						placeholder={placeholder}
					/>
				) : value ? (
					<span>{value}</span>
				) : (
					<span className='text-gray-500 italic'>Not provided</span>
				)}
			</dd>
		</div>
	)
}

'use client'

import { useState, useCallback } from 'react'
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ProfileData } from '@/types/profileTypes'
import { EditableField } from '@/components/EditableField'

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false)
	const [profileData, setProfileData] = useState<ProfileData>({
		fullName: '',
		email: '',
		address: '',
		phoneNumber: '',
		postalCode: '',
	})

	const [editableData, setEditableData] = useState<ProfileData>({ ...profileData })

	const handleEdit = () => {
		setEditableData({ ...profileData })
		setIsEditing(true)
	}

	const handleSave = () => {
		setProfileData({ ...editableData })
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditableData({ ...profileData })
		setIsEditing(false)
	}

	const handleInputChange = useCallback((field: keyof ProfileData, value: string) => {
		setEditableData(prev => ({
			...prev,
			[field]: value,
		}))
	}, [])

	return (
		<div className='min-h-screen bg-gray-900 p-8'>
			<div className='mx-auto max-w-7xl'>
				<div className='px-4 sm:px-0 flex justify-between items-center'>
					<div>
						<h3 className='text-base/7 font-semibold text-white'>Applicant Information</h3>
						<p className='mt-1 max-w-2xl text-sm/6 text-gray-400'>Personal details and application.</p>
					</div>
					<div className='flex gap-2'>
						{isEditing ? (
							<>
								<button
									onClick={handleSave}
									className='inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
								>
									<CheckIcon className='size-4' />
									Save
								</button>
								<button
									onClick={handleCancel}
									className='inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
								>
									<XMarkIcon className='size-4' />
									Cancel
								</button>
							</>
						) : (
							<button
								onClick={handleEdit}
								className='inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
							>
								<PencilIcon className='size-4' />
								Edit
							</button>
						)}
					</div>
				</div>
				<div className='mt-6 border-t border-white/10'>
					<dl className='divide-y divide-white/10'>
						<EditableField
							label='Full name'
							value={isEditing ? editableData.fullName : profileData.fullName}
							isEditing={isEditing}
							onChange={value => handleInputChange('fullName', value)}
							type='text'
							placeholder='Enter full name'
						/>

						<EditableField
							label='Email address'
							value={isEditing ? editableData.email : profileData.email}
							isEditing={isEditing}
							onChange={value => handleInputChange('email', value)}
							type='email'
							placeholder='Enter email address'
						/>

						<EditableField
							label='Address'
							value={isEditing ? editableData.address : profileData.address}
							isEditing={isEditing}
							onChange={value => handleInputChange('address', value)}
							type='text'
							placeholder='Enter address'
						/>

						<EditableField
							label='Phone number'
							value={isEditing ? editableData.phoneNumber : profileData.phoneNumber}
							isEditing={isEditing}
							onChange={value => handleInputChange('phoneNumber', value)}
							type='tel'
							placeholder='Enter phone number'
						/>

						<EditableField
							label='Postal code'
							value={isEditing ? editableData.postalCode : profileData.postalCode}
							isEditing={isEditing}
							onChange={value => handleInputChange('postalCode', value)}
							type='text'
							placeholder='Enter postal code'
						/>
					</dl>
				</div>
			</div>
		</div>
	)
}

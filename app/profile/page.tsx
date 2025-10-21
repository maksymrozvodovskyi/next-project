'use client'

import { useState, useCallback } from 'react'
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

type ProfileData = {
	fullName: string
	email: string
	address: string
	phoneNumber: string
	postalCode: string
}

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
						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm/6 font-medium text-gray-100'>Full name</dt>
							<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
								{isEditing ? (
									<input
										type='text'
										value={editableData.fullName}
										onChange={e => handleInputChange('fullName', e.target.value)}
										className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
										placeholder='Enter full name'
									/>
								) : profileData.fullName ? (
									<span>{profileData.fullName}</span>
								) : (
									<span className='text-gray-500 italic'>Not provided</span>
								)}
							</dd>
						</div>

						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm/6 font-medium text-gray-100'>Email address</dt>
							<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
								{isEditing ? (
									<input
										type='email'
										value={editableData.email}
										onChange={e => handleInputChange('email', e.target.value)}
										className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
										placeholder='Enter email address'
									/>
								) : profileData.email ? (
									<span>{profileData.email}</span>
								) : (
									<span className='text-gray-500 italic'>Not provided</span>
								)}
							</dd>
						</div>

						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm/6 font-medium text-gray-100'>Address</dt>
							<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
								{isEditing ? (
									<input
										type='text'
										value={editableData.address}
										onChange={e => handleInputChange('address', e.target.value)}
										className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
										placeholder='Enter address'
									/>
								) : profileData.address ? (
									<span>{profileData.address}</span>
								) : (
									<span className='text-gray-500 italic'>Not provided</span>
								)}
							</dd>
						</div>

						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm/6 font-medium text-gray-100'>Phone number</dt>
							<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
								{isEditing ? (
									<input
										type='tel'
										value={editableData.phoneNumber}
										onChange={e => handleInputChange('phoneNumber', e.target.value)}
										className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
										placeholder='Enter phone number'
									/>
								) : profileData.phoneNumber ? (
									<span>{profileData.phoneNumber}</span>
								) : (
									<span className='text-gray-500 italic'>Not provided</span>
								)}
							</dd>
						</div>

						<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
							<dt className='text-sm/6 font-medium text-gray-100'>Postal code</dt>
							<dd className='mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>
								{isEditing ? (
									<input
										type='text'
										value={editableData.postalCode}
										onChange={e => handleInputChange('postalCode', e.target.value)}
										className='w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
										placeholder='Enter postal code'
									/>
								) : profileData.postalCode ? (
									<span>{profileData.postalCode}</span>
								) : (
									<span className='text-gray-500 italic'>Not provided</span>
								)}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

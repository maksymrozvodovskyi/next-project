'use client'

import * as React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface AccordionContextType {
	value: string | string[]
	type: 'single' | 'multiple'
	isCollapsible: boolean
	onValueChange: (value: string) => void
	isItemOpen: (value: string) => boolean
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

const Accordion = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		type?: 'single' | 'multiple'
		isCollapsible?: boolean
		defaultValue?: string
	}
>(({ className, children, type = 'single', isCollapsible = false, defaultValue, ...props }, ref) => {
	const [value, setValue] = React.useState<string | string[]>(type === 'multiple' ? [] : defaultValue || '')

	const handleValueChange = React.useCallback(
		(itemValue: string) => {
			if (type === 'multiple') {
				const currentValue = value as string[]
				const newValue = currentValue.includes(itemValue)
					? currentValue.filter(v => v !== itemValue)
					: [...currentValue, itemValue]
				setValue(newValue)
			} else {
				const currentValue = value as string
				if (isCollapsible && currentValue === itemValue) {
					setValue('')
				} else {
					setValue(itemValue)
				}
			}
		},
		[value, type, isCollapsible]
	)

	const isItemOpen = React.useCallback(
		(itemValue: string) => {
			if (type === 'multiple') {
				return (value as string[]).includes(itemValue)
			}
			return (value as string) === itemValue
		},
		[value, type]
	)

	const contextValue = React.useMemo(
		() => ({
			value,
			type,
			isCollapsible,
			onValueChange: handleValueChange,
			isItemOpen,
		}),
		[value, type, isCollapsible, handleValueChange, isItemOpen]
	)

	return (
		<AccordionContext.Provider value={contextValue}>
			<div ref={ref} className={cn('space-y-2', className)} {...props}>
				{children}
			</div>
		</AccordionContext.Provider>
	)
})
Accordion.displayName = 'Accordion'

const AccordionItemContext = React.createContext<
	| {
			isOpen: boolean
			onToggle: () => void
	  }
	| undefined
>(undefined)

const AccordionItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		value: string
	}
>(({ className, children, value, ...props }, ref) => {
	const context = React.useContext(AccordionContext)
	if (!context) {
		throw new Error('AccordionItem must be used within an Accordion')
	}

	const isOpen = context.isItemOpen(value)
	const onToggle = () => context.onValueChange(value)

	return (
		<AccordionItemContext.Provider value={{ isOpen, onToggle }}>
			<div ref={ref} className={cn('border border-gray-200 rounded-lg', className)} {...props}>
				{children}
			</div>
		</AccordionItemContext.Provider>
	)
})
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
	({ className, children, ...props }, ref) => {
		const itemContext = React.useContext(AccordionItemContext)
		if (!itemContext) {
			throw new Error('AccordionTrigger must be used within an AccordionItem')
		}

		const { isOpen, onToggle } = itemContext

		return (
			<button
				ref={ref}
				type='button'
				className={cn(
					'flex flex-1 w-full items-center justify-between py-4 px-6 text-left font-medium transition-all hover:bg-gray-50',
					isOpen && 'bg-gray-50',
					className
				)}
				onClick={onToggle}
				{...props}
			>
				{children}
				<ChevronDownIcon className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
			</button>
		)
	}
)
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children }, ref) => {
		const itemContext = React.useContext(AccordionItemContext)
		if (!itemContext) {
			throw new Error('AccordionContent must be used within an AccordionItem')
		}

		const { isOpen } = itemContext

		return (
			<div ref={ref} className={cn('overflow-hidden', className)}>
				{isOpen && <div className='pb-4 pt-0 px-6'>{children}</div>}
			</div>
		)
	}
)
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

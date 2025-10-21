import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface AccordionDemoProps {
	description?: string
}

export function AccordionDemo({ description }: AccordionDemoProps) {
	return (
		<Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>Product Information</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<p className='text-gray-700 text-lg leading-relaxed'>
						{description || 'No description available for this product.'}
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>Shipping Details</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<p>
						We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days,
						while express shipping ensures delivery within 1-2 business days.
					</p>
					<p>
						All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated
						tracking portal.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>Return Policy</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<p>
						We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
						satisfied, simply return the item in its original condition.
					</p>
					<p>
						Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of
						receiving the returned item.
					</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

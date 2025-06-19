import * as React from 'react'

import { cn } from '@/shared/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-all duration-300 outline-none',
				'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'placeholder:text-muted-foreground',
				'focus-visible:border-primary/20 focus-visible:outline-none',
				'focus-visible:ring-primary/10 focus-visible:ring-[2px]',
				'focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)/5%)]',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'md:text-sm',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

export { Input }

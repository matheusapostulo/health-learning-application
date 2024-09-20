import { cn } from "@/utils"
import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { ButtonHTMLAttributes, forwardRef } from "react"

const buttonVariants = cva(
    'inline-flex items-center whitespace-nowrap justify-center text-sm font-bold',
    {
      variants: {
        variant: {
          default: "bg-beige-main text-white",
          secondary: "bg-gray-main text-white font-bold",
          secondary_outline: "bg-transparent text-gray-main",
            
        },
        size: {
          default: 'h-10 py-2 px-4 rounded-md',
          sm: 'h-9 px-2 rounded-md',
          md: 'h-9 px-7 rounded-md',
          lg: 'h-11 px-32 rounded-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, children, href, size, variant, ...props}, ref) => {
        if (href) {
            return (
                <Link
                    href={href}
                    className={cn(buttonVariants({ variant, size, className }))}
                >
                    {children}
                </Link>
            )
        }
        return (
            <button
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            >
              {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export {Button, buttonVariants}
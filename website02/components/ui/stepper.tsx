import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface StepProps {
  title: string
  description?: string
  completed?: boolean
  active?: boolean
}

export function Step({ title, description, completed, active }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium", {
          "border-primary bg-primary text-primary-foreground": completed,
          "border-primary text-primary": active && !completed,
          "border-muted-foreground text-muted-foreground": !active && !completed,
        })}
      >
        {completed ? <CheckIcon className="h-4 w-4" /> : null}
        {!completed && <span>{title.charAt(0)}</span>}
      </div>
      <div className="mt-2 text-center">
        <div
          className={cn("text-sm font-medium", {
            "text-primary": active || completed,
            "text-muted-foreground": !active && !completed,
          })}
        >
          {title}
        </div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    </div>
  )
}

interface StepperProps {
  currentStep: number
  className?: string
  children: React.ReactNode
}

export function Stepper({ currentStep, className, children }: StepperProps) {
  const steps = React.Children.toArray(children)
  const totalSteps = steps.length

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      {steps.map((step, index) => {
        const stepProps = (step as React.ReactElement<StepProps>).props
        const completed = index < currentStep
        const active = index === currentStep

        return (
          <React.Fragment key={index}>
            {React.cloneElement(step as React.ReactElement<StepProps>, {
              completed,
              active,
            })}
            {index < totalSteps - 1 && (
              <div
                className={cn("h-0.5 w-full max-w-[100px] flex-1", {
                  "bg-primary": index < currentStep,
                  "bg-muted": index >= currentStep,
                })}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}


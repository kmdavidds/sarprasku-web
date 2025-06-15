interface Step {
  number: number
  title: string
  subtitle: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="relative mb-8">
          {/* Background line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-200"></div>

          {/* Progress line */}
          <div
            className="absolute top-6 left-0 h-1 bg-blue-900 transition-all duration-500 ease-in-out"
            style={{
              width: currentStep === 1 ? "0%" : `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.number < currentStep
              const isCurrent = step.number === currentStep
              const isUpcoming = step.number > currentStep

              return (
                <div key={step.number} className="flex flex-col items-center">
                  {/* Step circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 relative z-10 ${
                      isCompleted
                        ? "bg-blue-900 text-white"
                        : isCurrent
                          ? "bg-blue-900 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step labels */}
                  <div className="mt-3 text-center max-w-[120px]">
                    <div className={`text-sm font-medium ${isCurrent ? "text-blue-900" : "text-gray-900"}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{step.subtitle}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar - Keep existing design */}
      <div className="md:hidden">
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-900 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step.number <= currentStep ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Step Labels */}
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{steps[currentStep - 1].title}</div>
          <div className="text-xs text-gray-600">{steps[currentStep - 1].subtitle}</div>
        </div>
      </div>
    </div>
  )
}

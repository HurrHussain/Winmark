import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  children?: ReactNode
  fallbackMessage?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-950/20 border border-red-500/50 rounded-lg text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <h2 className="text-lg font-bold text-red-400">Something went wrong</h2>
          <p className="text-sm text-red-200/80 max-w-sm">
            {this.props.fallbackMessage || "An unexpected error occurred in this component. Please try refreshing."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-md text-xs font-bold uppercase transition-colors border border-red-500/30"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

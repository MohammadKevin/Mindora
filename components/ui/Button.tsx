type Props = {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

export default function Button({ children, onClick, className }: Props) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl bg-purple-600 text-white ${className}`}
        >
            {children}
        </button>
    )
}
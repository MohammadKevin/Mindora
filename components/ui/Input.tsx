type Props = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: string
}

export default function Input({ value, onChange, placeholder, type = "text" }: Props) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            className="w-full p-2 border rounded-xl"
        />
    )
}
import Image from "next/image"

export type IconName =
    | "calendar"
    | "check"
    | "chevron-down"
    | "chevron-left"
    | "chevron-right"
    | "close"
    | "download"
    | "eye-off"
    | "eye"
    | "menu"
    | "plus"
    | "search"
    | "logoMD"
    | "logoSM"

// TO-DO: Make logo separate component?
interface IconProps {
    name: IconName
    size?: number
    className?: string
    alt?: string
}

export function Icon({
    name,
    size = 24,
    className = "",
    alt
}: IconProps) {
    return (
        <Image
            src={`/icons/${name}.svg`}
            alt={alt || `${name} icon`}
            width={size}
            height={size}
            className={className}
        />
    )
}
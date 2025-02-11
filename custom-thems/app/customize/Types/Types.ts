import { StaticImageData } from "next/image";

export interface ColorCardProps {
    image: StaticImageData;
    color: string;
    isSelected?: boolean;
    onSelect?: (color: string) => void;
    title?: string;
}
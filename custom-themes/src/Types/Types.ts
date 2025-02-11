
export interface ColorCardProps {
    image: string;
    color: string;
    isSelected?: boolean;
    onSelect?: (color: string) => void;
    title?: string;
}
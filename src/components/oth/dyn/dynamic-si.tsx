import React from 'react';
import * as SimpleIcons from 'react-icons/si';

export type SimpleIconNames = keyof typeof SimpleIcons;

interface DynamicSimpleIconProps extends React.SVGAttributes<SVGElement> {
    iconName: SimpleIconNames;
    size?: string | number;
    color?: string;
}

export const DynamicSimpleIcon: React.FC<DynamicSimpleIconProps> = ({ 
    iconName, 
    size, 
    color,
    ...props 
}) => {
    const IconComponent = SimpleIcons[iconName];

    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in Simple Icons`);
        return null;
    }

    return <IconComponent size={size} color={color} {...props} />;
};
const exceptionsSINameBadge = {
    css: "css3"
}
export const createSimpleIconByNameBadge = (nameBadge: string) => {
    if (nameBadge in exceptionsSINameBadge) {
        return `Si${exceptionsSINameBadge[nameBadge as keyof typeof exceptionsSINameBadge].charAt(0).toUpperCase() + 
            exceptionsSINameBadge[nameBadge as keyof typeof exceptionsSINameBadge].slice(1)}` as SimpleIconNames
    }
    return `Si${nameBadge.charAt(0).toUpperCase() + nameBadge.slice(1)}` as SimpleIconNames
}
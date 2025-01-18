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
export const createSimpleIconByNameBadge = (nameBadge: string) => {
    return `Si${nameBadge.charAt(0).toUpperCase() + nameBadge.slice(1)}` as SimpleIconNames
}
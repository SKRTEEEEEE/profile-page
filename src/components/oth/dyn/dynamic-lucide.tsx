import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconNames = keyof typeof LucideIcons;

interface DynamicLucideIconProps extends LucideIcons.LucideProps{
    iconName: IconNames
}

export const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({ iconName, ...props }) => {
    const IconComponent = LucideIcons[iconName] as LucideIcons.LucideIcon;
  
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found in Lucide icons`);
      return null;
    }
  
    return <IconComponent {...props} />;
  };
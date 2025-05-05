declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export type Icon = ComponentType<IconProps>;

  export const HeartPulse: Icon;
  export const Dumbbell: Icon;
  export const Brain: Icon;
  export const Apple: Icon;
  export const Wallet: Icon;
  export const GraduationCap: Icon;
  export const Plane: Icon;
  export const Clapperboard: Icon;
  export const Users: Icon;
  export const Moon: Icon;
  export const Star: Icon;
  export const Briefcase: Icon;
  export const MessageSquare: Icon;
  export const Send: Icon;
  export const X: Icon;
} 
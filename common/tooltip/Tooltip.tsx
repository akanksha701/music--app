import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { IHoverCardProps } from '../types/types';

const Tooltip = (props: IHoverCardProps) => {
  const { content, children } = props;
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="bg-white w-full">{content}</HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip;

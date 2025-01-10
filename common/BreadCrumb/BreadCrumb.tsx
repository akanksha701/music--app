import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/utils'; // Use your utility function for class merging
import Link from 'next/link';

export function Breadcrumb({
  items,
  className,
}: {
  items: Array<{ href: string; label: string }>;
  className: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      {items.map((item: { href: string; label: string }, index: number) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-sm text-blue-600 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm text-gray-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

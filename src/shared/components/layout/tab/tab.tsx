import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { Tab } from './types';

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode;
}

const defaultActiveClasses = 'bg-white text-gray-900 shadow-sm';
const defaultInactiveClasses = 'text-gray-600 hover:text-gray-900';
const defaultDisabledClasses = 'text-gray-400 cursor-not-allowed';

export function Tab({ tabs, activeTab, onTabChange, children }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-6 w-full">
        <nav className="flex bg-gray-100 rounded-lg p-1 w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors w-full',
                {
                  [defaultDisabledClasses]: tab.disabled,
                  [defaultInactiveClasses]:
                    !tab.disabled && activeTab !== tab.id,
                  [defaultActiveClasses]: activeTab === tab.id,
                }
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}

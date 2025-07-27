import { useState, useCallback, useEffect } from 'react';
import type { Tab } from './types';

interface UseTabOptions {
  tabs: Tab[];
  initialTab?: string;
}

interface UseTabReturn {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  isActive: (tabId: string) => boolean;
  getActiveTab: () => Tab | undefined;
  nextTab: () => void;
  previousTab: () => void;
}

export function useTab({ tabs, initialTab }: UseTabOptions): UseTabReturn {
  const [activeTab, setActiveTabState] = useState<string>('');

  // Initialize active tab
  useEffect(() => {
    if (tabs.length === 0) return;

    // If initialTab is provided and exists in tabs, use it
    if (initialTab && tabs.some(tab => tab.id === initialTab)) {
      setActiveTabState(initialTab);
      return;
    }

    // Otherwise use the first non-disabled tab, or first tab if all are disabled
    const firstEnabledTab = tabs.find(tab => !tab.disabled);
    const defaultTab = firstEnabledTab?.id || tabs[0]?.id;

    if (defaultTab && defaultTab !== activeTab) {
      setActiveTabState(defaultTab);
    }
  }, [tabs, initialTab]);

  const setActiveTab = (tabId: string) => {
    const tabExists = tabs.some(tab => tab.id === tabId);
    if (tabExists) {
      setActiveTabState(tabId);
    }
  };

  const isActive = (tabId: string) => activeTab === tabId;

  const getActiveTab = () => tabs.find(tab => tab.id === activeTab);

  const nextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTabState(tabs[nextIndex]?.id || '');
  };

  const previousTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const previousIndex =
      currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    setActiveTabState(tabs[previousIndex]?.id || '');
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
    isActive,
    getActiveTab,
    nextTab,
    previousTab,
  };
}

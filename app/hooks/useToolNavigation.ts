'use client';

import { useRouter } from 'next/navigation';
import { getToolRoute } from '../utils/toolRoutes';

export const useToolNavigation = () => {
  const router = useRouter();

  const navigateToTools = () => {
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      sessionStorage.setItem('toolsPageScrollPosition', scrollY.toString());
    }
    router.push('/tool');
  };

  const navigateToTool = () => {
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      sessionStorage.setItem('toolsPageScrollPosition', scrollY.toString());
    }
    router.push('/tool');
  };

  const handleToolClick = (tool: any) => {
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      sessionStorage.setItem('toolsPageScrollPosition', scrollY.toString());
    }
    
    const route = getToolRoute(tool.name, tool.category);
    if (route) {
      localStorage.setItem('selectedCategory', tool.category);
      router.push(route);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    // Save current scroll position before navigation
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      sessionStorage.setItem('toolsPageScrollPosition', scrollY.toString());
    }
    
    localStorage.setItem('selectedCategory', categoryName);
    router.push('/tool');
  };

  // New function to restore scroll position
  const restoreScrollPosition = () => {
    if (typeof window !== 'undefined') {
      const savedScrollPosition = sessionStorage.getItem('toolsPageScrollPosition');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
          sessionStorage.removeItem('toolsPageScrollPosition');
        }, 100);
      }
    }
  };

  // New function to clear scroll position
  const clearScrollPosition = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('toolsPageScrollPosition');
    }
  };

  return {
    navigateToTools,
    navigateToTool,
    handleToolClick,
    handleCategoryClick,
    restoreScrollPosition,
    clearScrollPosition
  };
};
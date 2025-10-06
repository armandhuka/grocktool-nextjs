// 'use client';

// import { useRouter } from 'next/navigation';
// import { getToolRoute } from '../utils/toolRoutes';

// export const useToolNavigation = () => {
//   const router = useRouter();

//   const navigateToTools = () => {
//     router.push('/tool');
//   };

//   const handleToolClick = (tool: any) => {
//     const route = getToolRoute(tool.name, tool.category);
//     if (route) {
//       localStorage.setItem('selectedCategory', tool.category);
//       router.push(route);
//     }
//   };

//   const handleCategoryClick = (categoryName: string) => {
//     localStorage.setItem('selectedCategory', categoryName);
//     router.push('/tool');
//   };

//   return {
//     navigateToTools,
//     handleToolClick,
//     handleCategoryClick
//   };
// };

'use client';

import { useRouter } from 'next/navigation';
import { getToolRoute } from '../utils/toolRoutes';

export const useToolNavigation = () => {
  const router = useRouter();

  const navigateToTools = () => {
    router.push('/tools');
  };

  const navigateToTool = () => {
    router.push('/tool');
  };

  const handleToolClick = (tool: any) => {
    const route = getToolRoute(tool.name, tool.category);
    if (route) {
      localStorage.setItem('selectedCategory', tool.category);
      router.push(route);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    localStorage.setItem('selectedCategory', categoryName);
    router.push('/tool');
  };

  return {
    navigateToTools,
    navigateToTool,
    handleToolClick,
    handleCategoryClick
  };
};
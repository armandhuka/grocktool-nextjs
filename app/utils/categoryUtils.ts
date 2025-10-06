export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    'Unit Converter Tools': '📏',
    'Text Tools': '📝',
    'Date & Time Tools': '📅',
    'Number Tools': '🔢',
    'Math Tools': '🧮',
    'Health Tools': '💪'
  };
  return icons[category] || '🔧';
};

export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Unit Converter Tools': 'bg-blue-100 text-blue-600',
    'Text Tools': 'bg-green-100 text-green-600',
    'Date & Time Tools': 'bg-purple-100 text-purple-600',
    'Number Tools': 'bg-yellow-100 text-yellow-600',
    'Math Tools': 'bg-red-100 text-red-600',
    'Health Tools': 'bg-cyan-100 text-cyan-600'
  };
  return colors[category] || 'bg-gray-100 text-gray-600';
};
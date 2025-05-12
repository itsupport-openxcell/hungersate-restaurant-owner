import { useEffect } from 'react';
import { Utensils } from 'lucide-react';

const SplashScreen = () => {
  // Set background color for body during splash screen
  useEffect(() => {
    document.body.classList.add('bg-white');
    
    return () => {
      document.body.classList.remove('bg-white');
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-bounce-in flex flex-col items-center">
        <Utensils className="h-24 w-24 text-primary-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">Foodie</h1>
        <p className="mt-2 text-xl text-gray-600">Restaurant Dashboard</p>
      </div>
      <div className="mt-16">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-primary-500 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
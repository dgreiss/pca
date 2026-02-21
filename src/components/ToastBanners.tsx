import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useState } from 'react';

export function ToastBanners() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Prior authorization request requires additional documentation',
      action: 'View Requirements',
      visible: true,
    },
    {
      id: 2,
      type: 'info',
      message: 'Insurance verification completed successfully for this member',
      action: 'View Details',
      visible: true,
    },
  ]);

  const closeBanner = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, visible: false } : banner
    ));
  };

  const getBannerStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-[#00373a]',
          icon: AlertCircle,
        };
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: CheckCircle2,
        };
      case 'info':
        return {
          bg: 'bg-cyan-600',
          icon: Info,
        };
      default:
        return {
          bg: '',
          icon: Info,
          customStyle: { background: 'linear-gradient(to right, #00373a, #004d51)' }
        };
    }
  };

  const visibleBanners = banners.filter(b => b.visible);

  if (visibleBanners.length === 0) return null;

  return (
    <div className="space-y-2 p-3">
      {visibleBanners.map((banner) => {
        const styles = getBannerStyles(banner.type);
        const Icon = styles.icon;
        
        return (
          <div
            key={banner.id}
            className={`${styles.bg} text-white px-6 py-3 flex items-center justify-between shadow-sm rounded-lg`}
            style={'customStyle' in styles ? styles.customStyle : {}}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{banner.message}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="text-sm font-medium hover:underline">
                {banner.action}
              </button>
              <button
                onClick={() => closeBanner(banner.id)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
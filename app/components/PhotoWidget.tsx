import React from 'react';
import { Camera, X } from 'lucide-react';

interface Photo {
  id: string;
  student: string;
  date: string;
  subject: string;
  teacher: string;
  caption: string;
  imageUrl: string;
  timestamp: string;
}

interface PhotoWidgetProps {
  data: {
    photos: Photo[];
  };
}

const PhotoModal = ({ photo, onClose }: { photo: Photo; onClose: () => void }) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-lg max-w-3xl w-full mx-auto shadow-xl">
        {/* Header */}
        <div className="p-4 border-b dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{photo.subject}</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-500 dark:text-slate-400">{photo.student}</span>
            <span className="text-sm text-gray-500 dark:text-slate-400">{photo.date}</span>
          </div>
        </div>

        {/* Image */}
        <div className="relative p-4">
          <img 
            src={photo.imageUrl}
            alt={`${photo.student}'s ${photo.subject} class - ${photo.caption}`}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-slate-300">{photo.caption}</p>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Taken by {photo.teacher}
          </p>
        </div>
      </div>
    </div>
  );
};

const PhotoWidget = ({ data }: PhotoWidgetProps) => {
  const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null);

  // Sort photos by timestamp, most recent first
  const sortedPhotos = [...data.photos].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 6); // Show up to 6 most recent photos

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
            <Camera className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">In-class Photos</h2>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-3 gap-3">
          {sortedPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative cursor-pointer group"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Photo */}
              <div className="aspect-square w-full rounded-lg overflow-hidden">
                <img 
                  src={photo.imageUrl}
                  alt={`${photo.student}'s ${photo.subject} class - ${photo.caption}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent rounded-lg">
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs font-medium text-white truncate">
                    {photo.student}
                  </div>
                  <div className="text-xs text-gray-200 truncate">
                    {photo.subject}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.photos.length === 0 && (
          <div className="text-center text-gray-500 dark:text-slate-400 py-4">
            No photos available
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </>
  );
};

export default PhotoWidget;
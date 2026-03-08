import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef
} from "react";
import {
  ArrowsPointingOutIcon,
  XMarkIcon,
  PlayIcon
} from "@heroicons/react/24/solid";

interface Video {
  name: string;
  fileName: string;
  url: string;
}

interface ApiResponse {
  success: boolean;
  total: number;
  data: Video[];
}

const API_URL = "https://airtelng.kidszonepro.com/api/videos";

/* ============================= */
/* Video Card                    */
/* ============================= */

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = memo(({ video, onClick }) => {
  return (
    <div
      onClick={() => onClick(video)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden 
      bg-gray-900 shadow-lg hover:shadow-indigo-500/40 
      transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Thumbnail */}
      <video
        src={video.url}
        muted
        preload="metadata"
        className="w-full h-72 object-cover opacity-80 group-hover:opacity-100 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PlayIcon className="w-14 h-14 text-white opacity-80 group-hover:scale-125 transition duration-500" />
      </div>

      {/* Title */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white text-lg font-semibold truncate">
          {video.name}
        </h3>
      </div>
    </div>
  );
});

/* ============================= */
/* Main Component                */
/* ============================= */

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const result: ApiResponse = await res.json();

      if (result.success) {
        setVideos(result.data);
      } else {
        setError("Failed to load videos");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const renderedVideos = useMemo(() => {
    return videos.map((video) => (
      <VideoCard
        key={video.fileName}
        video={video}
        onClick={setSelectedVideo}
      />
    ));
  }, [videos]);

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6" id="videos-section">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Kids Video Library
      </h1>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderedVideos}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-5xl shadow-2xl relative">

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 truncate">
                {selectedVideo.name}
              </h2>

              <div className="relative">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="w-full rounded-lg max-h-[75vh]"
                >
                  <source src={selectedVideo.url} type="video/mp4" />
                  <source src={selectedVideo.url} type="video/webm" />
                </video>

                {/* Fullscreen Button */}
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-4 right-4 bg-black/70 p-2 rounded-full hover:bg-indigo-600 transition"
                >
                  <ArrowsPointingOutIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
import React, { useEffect, useRef, useState } from 'react';
import { Music, Music2, Volume2, Volume1, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  isOpened: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpened }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const playerRef = useRef<any>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const volumeTimeoutRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
    } else {
      setIsApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (isApiReady && isOpened && !playerRef.current) {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'gRj83OcBbXc',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'gRj83OcBbXc',
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            event.target.setVolume(volume);
            setIsPlaying(true);
          },
        },
      });
    }
  }, [isApiReady, isOpened]);

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, []);

  const resetVolumeTimeout = () => {
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 3000);
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
    resetVolumeTimeout();
  };

  const toggleVolumeUI = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVolume(!showVolume);
    if (!showVolume) {
      resetVolumeTimeout();
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-4 h-4" />;
    if (volume < 50) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  return (
    <>
      <div id="youtube-player" className="hidden"></div>
      
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-8 left-8 z-[100] flex items-center gap-3"
          >
            <div className="relative flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="relative w-12 h-12 flex items-center justify-center bg-fuji-charcoal/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl group transition-all duration-500 hover:border-fuji-sage"
              >
                {/* Pulsing background effect */}
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full bg-fuji-sage/20 animate-ping"></span>
                )}
                
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
                >
                  {isPlaying ? (
                    <Music2 className="w-5 h-5 text-fuji-sage" />
                  ) : (
                    <Music className="w-5 h-5 text-fuji-mist" />
                  )}
                </motion.div>
              </button>

              <button 
                onClick={toggleVolumeUI}
                className="w-8 h-8 flex items-center justify-center bg-fuji-charcoal/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg text-fuji-cream/60 hover:text-fuji-sage transition-colors"
              >
                {getVolumeIcon()}
              </button>
            </div>

            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: 'auto', x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  onMouseEnter={() => { if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current); }}
                  onMouseLeave={resetVolumeTimeout}
                  className="bg-fuji-charcoal/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 overflow-hidden shadow-xl"
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fuji-sage"
                  />
                  <span className="font-sans text-[10px] text-fuji-cream/60 w-6 tabular-nums">
                    {volume}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;

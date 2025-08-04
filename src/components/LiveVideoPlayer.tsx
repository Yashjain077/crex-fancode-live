import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LiveVideoPlayerProps {
  streamUrl: string;
  title?: string;
  className?: string;
  isPlaying?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const LiveVideoPlayer = ({ streamUrl, title, className, isPlaying: externalIsPlaying = true, onPlayStateChange }: LiveVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([100]);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Security: Hide stream URL from DOM
  const hiddenStreamUrl = btoa(streamUrl).slice(0, 20) + "...";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    // Reset CORS settings
    video.crossOrigin = 'anonymous';

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 0,
        maxBufferLength: 0.5,
        maxMaxBufferLength: 0.5,
        liveDurationInfinity: true,
        liveBackBufferLength: 0,
        manifestLoadingTimeOut: 3000,
        manifestLoadingMaxRetry: 1,
        levelLoadingTimeOut: 3000,
        fragLoadingTimeOut: 5000,
        startLevel: -1,
        autoStartLoad: true,
        liveSyncDurationCount: 1,
        liveMaxLatencyDurationCount: 2,
        maxLiveSyncPlaybackRate: 1.2,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (externalIsPlaying) {
          video.play().then(() => {
            setIsPlaying(true);
            onPlayStateChange?.(true);
          }).catch(console.error);
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        setIsLoading(false);
        
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              if (data.details === 'manifestLoadError') {
                setHasError(true);
                setErrorMessage('Stream unavailable: CORS policy restriction. This stream requires direct access.');
              } else {
                console.log('Network error, trying to recover...');
                hls.startLoad();
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              setHasError(true);
              setErrorMessage('Stream playback failed. Please try again later.');
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Video play error:', error);
          setHasError(true);
          setErrorMessage('Failed to start video playback.');
        });
      });
      
      video.addEventListener('error', () => {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage('Video loading failed. Stream may be unavailable.');
      });
    } else {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage('Your browser does not support HLS video streaming.');
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl]);

  // Effect to handle external play/pause control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (externalIsPlaying && !isPlaying) {
      video.play().then(() => {
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }).catch(console.error);
    } else if (!externalIsPlaying && isPlaying) {
      video.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    }
  }, [externalIsPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }).catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const volumeValue = value[0] / 100;
    video.volume = volumeValue;
    setVolume(value);
    setIsMuted(volumeValue === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const setSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div 
      className={cn(
        "relative bg-black rounded-lg overflow-hidden shadow-2xl",
        "border border-border/20 select-none",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Live Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2 bg-live-red/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">LIVE</span>
        </div>
      </div>

      {/* Title */}
      {title && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <h3 className="text-white text-sm font-medium">{title}</h3>
          </div>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover select-none"
        playsInline
        autoPlay
        muted={isMuted}
        onClick={togglePlay}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />

      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-center p-6">
          <div className="max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Stream Unavailable</h3>
            <p className="text-white/80 text-sm mb-4">{errorMessage}</p>
            <p className="text-white/60 text-xs">
              This stream may require special access or be temporarily unavailable. Please try again later or use a different stream.
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent",
          "transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-20"
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Playback Speed */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 text-xs font-medium min-w-[4rem] flex items-center gap-1"
              >
                {playbackRate}x
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border-border/20">
              {speeds.map((speed) => (
                <DropdownMenuItem
                  key={speed}
                  onClick={() => setSpeed(speed)}
                  className={`text-white hover:bg-white/10 cursor-pointer ${
                    playbackRate === speed ? 'bg-white/20' : ''
                  }`}
                >
                  {speed}x {speed === 1 ? '(Normal)' : ''}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
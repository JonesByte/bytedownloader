import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = async () => {
      // If already playing or already finished, don't try to start again
      if (hasStarted.current || !audio.paused) return;

      try {
        await audio.play();
        hasStarted.current = true;
        setIsPlaying(true);
        setIsBlocked(false);
        removeListeners();
      } catch (error) {
        setIsBlocked(true);
      }
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', startAudio);
      window.removeEventListener('mousedown', startAudio);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('scroll', startAudio);
      window.removeEventListener('keydown', startAudio);
    };

    window.addEventListener('mousemove', startAudio);
    window.addEventListener('mousedown', startAudio);
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('scroll', startAudio);
    window.addEventListener('keydown', startAudio);

    // Initial attempt
    startAudio();

    return () => {
      removeListeners();
      // IMPORTANT: We do NOT pause here. 
      // This allows the audio to keep playing even if the component re-renders.
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      if (!newMutedState && audioRef.current.paused && !hasStarted.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          hasStarted.current = true;
          setIsBlocked(false);
        }).catch(() => {
          setIsBlocked(true);
        });
      }
    }
  };

  const handleCanPlay = () => {
    setIsReady(true);
  };

  const handleAudioError = (e: any) => {
    console.error("Erro ao carregar áudio:", e);
    setHasError(true);
  };

  if (hasError) return null;

 return (
    <>
      <audio
        ref={audioRef}
        src="/bytedownloader/musica.mp3"
        preload="auto"
        // Removed loop: will stop only when the file ends
        onCanPlay={handleCanPlay}
        onError={handleAudioError}
        onEnded={() => {
          setIsPlaying(false);
          hasStarted.current = true; // Mark as finished so it doesn't restart
        }}
      />
      
      {/* Subtle control */}
      <button
        onClick={toggleMute}
        className={`fixed bottom-6 right-24 z-50 p-3 rounded-full transition-all backdrop-blur-md shadow-lg group ${
          isBlocked ? 'bg-byte-cyan text-byte-navy animate-bounce' : 'bg-byte-surface/80 text-white'
        } border border-white/10 hover:scale-110 active:scale-95`}
        title={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-red-400" />
        ) : isPlaying ? (
          <Volume2 size={20} className="text-byte-cyan animate-pulse" />
        ) : isBlocked ? (
          <Play size={20} fill="currentColor" />
        ) : (
          <Music size={20} className="text-gray-400" />
        )}
        
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-byte-navy text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5 font-bold tracking-wider">
          {isBlocked ? "CLIQUE PARA OUVIR" : !isReady ? "CARREGANDO..." : isMuted ? "SOM DESATIVADO" : isPlaying ? "MÚSICA TOCANDO" : "MOVA O MOUSE"}
        </span>
      </button>

      {/* Full screen interaction trigger if blocked */}
      {isBlocked && !isPlaying && (
        <div 
          className="fixed inset-0 z-[40] cursor-pointer"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                hasStarted.current = true;
                setIsBlocked(false);
              });
            }
          }}
        />
      )}
    </>
  );
};

import { createContext, useState, useContext, useCallback } from 'react';
import { huskyAudio } from '../utils/huskyAudio';

const PetContext = createContext(null);

export const PetProvider = ({ children }) => {
  const [petMode, setPetMode] = useState('FOLLOWING'); // 'FOLLOWING', 'IDLE_REST', 'GOING_HOME', 'AT_HOME', 'PLAYING'
  const [helloTrigger, setHelloTrigger] = useState(0);

  const isAtHome = petMode === 'AT_HOME' || petMode === 'GOING_HOME';
  const isPlaying = petMode === 'PLAYING';
  const isResting = petMode === 'IDLE_REST';

  const goHome = useCallback(() => {
    setPetMode('GOING_HOME');
  }, []);

  const comeBack = useCallback(() => {
    if (petMode === 'AT_HOME' || petMode === 'GOING_HOME') {
      setPetMode('FOLLOWING');
      huskyAudio.playYipSound();
    }
  }, [petMode]);

  const playBall = useCallback(() => {
    if (petMode !== 'GOING_HOME' && petMode !== 'AT_HOME') {
      setPetMode('PLAYING');
      huskyAudio.playYipSound();
    }
  }, [petMode]);

  const sayHello = useCallback(() => {
    huskyAudio.playHelloSound();
    setHelloTrigger((prev) => prev + 1);
  }, []);

  return (
    <PetContext.Provider
      value={{
        petMode,
        setPetMode,
        isAtHome,
        isPlaying,
        isResting,
        helloTrigger,
        goHome,
        comeBack,
        playBall,
        sayHello,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};

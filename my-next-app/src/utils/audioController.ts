let currentAudio: HTMLAudioElement | null = null;

export function playAudio(filePath: string): Promise<HTMLAudioElement> {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    return new Promise((resolve, reject) => {
        try {
            const audio = new Audio(filePath);
            currentAudio = audio;
            
            audio.play()
                .then(() => resolve(audio))
                .catch((error: Error) => {
                    console.error('Error playing audio:', error);
                    reject(error);
                });
        } catch (error) {
            console.error('Audio playback failed:', error);
            reject(error as Error);
        }
    });
}
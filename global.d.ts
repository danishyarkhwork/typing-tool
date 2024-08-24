// Extend the Window interface with gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    // Include other properties if needed
  }

  // Extend the Event interface to include BeforeInstallPromptEvent
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
    prompt(): Promise<void>;
  }

  // Extend the WindowEventMap with BeforeInstallPromptEvent
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// Ensure the file is treated as a module
export {};

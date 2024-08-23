import { useState, useEffect } from "react";

export function useTypingEffect(
  text: string,
  speed: number = 100,
  delay: number = 30000
) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    const typeCharacter = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsTyping(false);
        const timeoutId = setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
          setIsTyping(true);
        }, delay); // 30 seconds delay before restarting
        return () => clearTimeout(timeoutId);
      }
    };

    if (isTyping && index < text.length) {
      const typingTimeout = setTimeout(typeCharacter, speed);
      return () => clearTimeout(typingTimeout);
    }
  }, [index, isTyping, text, speed, delay]);

  return { displayedText, isTyping };
}

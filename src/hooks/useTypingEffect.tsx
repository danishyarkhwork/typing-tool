import { useState, useEffect } from "react";

export function useTypingEffect(text, speed = 100, delay = 30000) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

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

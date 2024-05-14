/**
 *
 *  This is the Fade Left Transition
 *
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const useVisibility = (threshold) => {
  // State to store the visibility status of each element
  const [elementVisibilityMap, setElementVisibilityMap] = useState(new Map());

  // Callback function to handle scroll events and update element visibility
  const handleScroll = useCallback(() => {
    // Get all elements with the specified class
    const ELEMENTS = document.querySelectorAll(".fm-element");

    // Check the visibility of each element
    ELEMENTS.forEach((element) => {
      const { top, height } = element.getBoundingClientRect();
      // Determine if the element is partially visible based on the threshold
      const PARTIALLY_VISIBLE = top + height * threshold < window.innerHeight;

      // Update the visibility status in the map
      setElementVisibilityMap((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.set(element, PARTIALLY_VISIBLE);
        return newMap;
      });
    });
  }, [threshold]);

  // Effect to add and remove the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Function to get the visibility status of a specific element
  return (element) => elementVisibilityMap.get(element) || false;
};

export const FadeLeft = ({ threshold = 0.5, children }) => {
  const IS_VISIBLE = useVisibility(threshold);
  const CONTROLS = useAnimation();
  const REF = useRef();

  useEffect(() => {
    if (IS_VISIBLE(REF.current)) {
      CONTROLS.start({ opacity: 1, x: 0 });
    }
  }, [CONTROLS, IS_VISIBLE]);

  return (
    <motion.div
      ref={REF}
      initial={{ opacity: 0, x: -50 }}
      animate={CONTROLS}
      transition={{ duration: 0.5 }}
      className="fm-element fade-left half-second"
    >
      {children}
    </motion.div>
  );
};

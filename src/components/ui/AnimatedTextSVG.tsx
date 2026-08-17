"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextSVGProps {
  textLines: string[];
  className?: string;
}

export default function AnimatedTextSVG({ textLines, className }: AnimatedTextSVGProps) {
  return (
    <svg className={`w-full h-auto ${className}`} viewBox="0 0 800 400" preserveAspectRatio="xMinYMin meet">
      {textLines.map((line, index) => (
        <motion.text
          key={index}
          x="0"
          y={(index + 1) * 85}
          fontSize="80"
          fontWeight="900"
          fontFamily="inherit"
          fill="black"
          stroke="black"
          strokeWidth="1.5"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fillOpacity: 0 }}
          animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
          transition={{
            strokeDashoffset: { duration: 2, ease: "easeInOut", delay: index * 0.3 },
            fillOpacity: { duration: 1, ease: "easeIn", delay: index * 0.3 + 1.2 }
          }}
          className="tracking-tight"
        >
          {line}
        </motion.text>
      ))}
    </svg>
  );
}

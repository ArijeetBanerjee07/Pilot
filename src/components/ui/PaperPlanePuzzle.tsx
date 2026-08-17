"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface PaperPlanePuzzleProps {
  onSolve: () => void;
  forceSolve?: boolean;
  className?: string;
}

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export default function PaperPlanePuzzle({ onSolve, forceSolve, className }: PaperPlanePuzzleProps) {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const undoMovesRef = React.useRef<number[]>([]);

  useEffect(() => {
    if (forceSolve && !isSolved && !isAutoSolving) {
      setTimeout(() => setIsAutoSolving(true), 0);
    }
  }, [forceSolve, isSolved, isAutoSolving]);

  useEffect(() => {
    if (isAutoSolving && undoMovesRef.current.length > 0) {
      const timer = setInterval(() => {
        if (undoMovesRef.current.length === 0) {
          clearInterval(timer);
          setIsAutoSolving(false);
          return;
        }
        
        const nextMove = undoMovesRef.current.shift()!;
        
        setTiles(currentTiles => {
          const emptyIdx = currentTiles.indexOf(TILE_COUNT - 1);
          const newTiles = [...currentTiles];
          [newTiles[nextMove], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[nextMove]];
          return newTiles;
        });
      }, 500); // Slower animation (500ms per slide)
      
      return () => clearInterval(timer);
    } else if (isAutoSolving && undoMovesRef.current.length === 0) {
       setIsAutoSolving(false);
    }
  }, [isAutoSolving]);

  // Centralized win checker to avoid updating state during render
  useEffect(() => {
    if (tiles.length > 0 && !isSolved) {
      const won = tiles.every((val, index) => val === index);
      if (won) {
        setTimeout(() => {
          setIsSolved(true);
          setIsAutoSolving(false);
          onSolve();
        }, 0);
      }
    }
  }, [tiles, isSolved, onSolve]);

  // Initialize and shuffle
  useEffect(() => {
    // Start solved
    const initialTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);
    let emptyIndex = TILE_COUNT - 1;
    const history: number[] = [];
    
    // Shuffle by making random valid moves to ensure it's solvable
    for (let i = 0; i < 40; i++) {
      const validMoves = [];
      const row = Math.floor(emptyIndex / GRID_SIZE);
      const col = emptyIndex % GRID_SIZE;
      
      if (row > 0) validMoves.push(emptyIndex - GRID_SIZE); // Up
      if (row < GRID_SIZE - 1) validMoves.push(emptyIndex + GRID_SIZE); // Down
      if (col > 0) validMoves.push(emptyIndex - 1); // Left
      if (col < GRID_SIZE - 1) validMoves.push(emptyIndex + 1); // Right
      
      const filteredMoves = validMoves.filter(m => history.length === 0 || m !== history[history.length - 1]);
      const movesToUse = filteredMoves.length > 0 ? filteredMoves : validMoves;
      const randomMove = movesToUse[Math.floor(Math.random() * movesToUse.length)];
      
      history.push(emptyIndex);
      // Swap
      [initialTiles[emptyIndex], initialTiles[randomMove]] = [initialTiles[randomMove], initialTiles[emptyIndex]];
      emptyIndex = randomMove;
    }
    
    undoMovesRef.current = history.reverse();
    const tilesToSet = initialTiles;
    setTimeout(() => { setTiles(tilesToSet); }, 0);
  }, []);

  const handleTileClick = (index: number) => {
    if (isSolved || isAutoSolving) return;

    const emptyIndex = tiles.indexOf(TILE_COUNT - 1);
    
    // Check if adjacent
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if (isAdjacent) {
      undoMovesRef.current.unshift(emptyIndex);
      
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  return (
    <div className={cn("relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white/10 p-2 border border-white/20 backdrop-blur-xl", className)}>
      <div 
        className="relative w-full h-full grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
        }}
      >
        {tiles.map((tile, index) => {
          const row = Math.floor(tile / GRID_SIZE);
          const col = tile % GRID_SIZE;
          
          const isEmpty = tile === TILE_COUNT - 1;
          
          // Background positions mapped to percentages
          const bgPosX = (col / (GRID_SIZE - 1)) * 100;
          const bgPosY = (row / (GRID_SIZE - 1)) * 100;

          return (
            <motion.div
              key={tile}
              layout
              onClick={() => handleTileClick(index)}
              className={cn(
                "relative w-full h-full rounded-md overflow-hidden cursor-pointer",
                isEmpty && !isSolved ? "opacity-0" : "opacity-100",
                isSolved ? "cursor-default" : "hover:brightness-110 active:scale-95 transition-all duration-500"
              )}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(/paper-plane-puzzle.jpg)`,
                  backgroundSize: `${GRID_SIZE * 100}%`,
                  backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
      
      {isSolved && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 mix-blend-overlay"></div>
        </motion.div>
      )}
    </div>
  );
}

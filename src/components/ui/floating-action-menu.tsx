"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingActionMenuProps = {
  options: {
    label: string;
    onClick: () => void;
    Icon?: React.ReactNode;
  }[];
  className?: string;
};

const FloatingActionMenu = ({
  options,
  className,
}: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed bottom-6 right-6 md:bottom-8 md:right-[max(1.5rem,calc(50vw-24rem+1.5rem))] z-40",
        className
      )}
    >
      <Button
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 bg-zinc-950 text-white border border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:shadow-[0_0_20px_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.8)] dark:hover:bg-zinc-700 dark:hover:border-zinc-500"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.05,
            }}
            className="absolute bottom-14 right-0 mb-2"
          >
            <div className="flex flex-col items-end gap-2.5">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                >
                  <Button
                    onClick={() => {
                      option.onClick();
                      setIsOpen(false);
                    }}
                    size="sm"
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl backdrop-blur-md cursor-pointer transition-all duration-150 active:scale-95 text-xs font-medium bg-zinc-950/95 text-white border border-zinc-800 shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:bg-black hover:border-zinc-700 dark:bg-zinc-800/95 dark:text-white dark:border-zinc-600 dark:shadow-[0_8px_25px_rgba(0,0,0,0.7)] dark:hover:bg-zinc-700 dark:hover:border-zinc-500"
                  >
                    {option.Icon}
                    <span className="text-white whitespace-nowrap">{option.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionMenu;
export { FloatingActionMenu };

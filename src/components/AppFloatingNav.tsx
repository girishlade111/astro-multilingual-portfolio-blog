import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingActionMenu from "@/components/ui/floating-action-menu";
import { Home, BookOpen, Languages, Sun, Moon, X, Check } from "lucide-react";
import {
  LOCALES,
  LOCALE_METADATA,
  getTranslations,
  switchLocalePath,
  type Locale,
} from "../i18n/config";

interface AppFloatingNavProps {
  locale: Locale;
  currentPath: string;
  homeUrl: string;
  blogUrl: string;
}

export const AppFloatingNav: React.FC<AppFloatingNavProps> = ({
  locale,
  currentPath,
  homeUrl,
  blogUrl,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);

    const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
      setIsDark(e.detail.theme === "dark");
    };

    window.addEventListener("theme-change" as any, handleThemeChange);
    return () => {
      window.removeEventListener("theme-change" as any, handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isLanguageModalOpen) {
        setIsLanguageModalOpen(false);
      }
    };

    if (isLanguageModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageModalOpen]);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    const val = nextDark ? "dark" : "light";
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    try {
      localStorage.setItem("theme", val);
      document.cookie = "theme=" + val + ";path=/;max-age=31536000;SameSite=Lax";
    } catch (_) {}
    const metaTheme = document.getElementById("meta-theme-color");
    if (metaTheme) {
      metaTheme.setAttribute("content", nextDark ? "#09090b" : "#fafafa");
    }
    setIsDark(nextDark);
    window.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: { theme: val },
      })
    );
  };

  const t = getTranslations(locale);
  const currentMeta = LOCALE_METADATA[locale];

  const menuOptions = [
    {
      label: t.nav.home || "Home",
      Icon: <Home className="w-4 h-4 text-white" />,
      onClick: () => {
        window.location.href = homeUrl;
      },
    },
    {
      label: t.nav.blog || "Blog",
      Icon: <BookOpen className="w-4 h-4 text-white" />,
      onClick: () => {
        window.location.href = blogUrl;
      },
    },
    {
      label: `${currentMeta.nativeName} (${locale.toUpperCase()})`,
      Icon: <Languages className="w-4 h-4 text-white" />,
      onClick: () => {
        setIsLanguageModalOpen(true);
      },
    },
    {
      label: isDark ? "Light Mode" : "Dark Mode",
      Icon: isDark ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-white" />
      ),
      onClick: toggleTheme,
    },
  ];

  return (
    <>
      <FloatingActionMenu options={menuOptions} />

      {/* Dedicated Language Switcher Popup Window */}
      <AnimatePresence>
        {isLanguageModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsLanguageModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Popup Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{
                duration: 0.22,
                type: "spring",
                stiffness: 340,
                damping: 24,
              }}
              className="relative w-full max-w-md max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl shadow-zinc-950/20 dark:shadow-black/80 overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div>
                    <h2
                      id="language-modal-title"
                      className="text-sm font-semibold text-zinc-950 dark:text-white"
                    >
                      {t.nav.languageLabel || "Select Language"}
                    </h2>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      10 languages available
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLanguageModalOpen(false)}
                  aria-label="Close language modal"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Languages List */}
              <div className="p-3 sm:p-4 overflow-y-auto max-h-[60vh] space-y-1 sm:space-y-1.5">
                {LOCALES.map((loc) => {
                  const meta = LOCALE_METADATA[loc];
                  const isSelected = loc === locale;
                  const targetUrl = switchLocalePath(currentPath, loc);

                  return (
                    <a
                      key={loc}
                      href={targetUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          localStorage.setItem("preferred_locale", loc);
                          document.cookie = "preferred_locale=" + encodeURIComponent(loc) + ";path=/;max-age=31536000;SameSite=Lax";
                        } catch (_) {}
                        setIsLanguageModalOpen(false);
                        window.location.href = targetUrl;
                      }}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-zinc-900 text-white font-semibold dark:bg-zinc-100 dark:text-zinc-950 shadow-sm"
                          : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-6 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase ${
                            isSelected
                              ? "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900"
                              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          }`}
                        >
                          {loc}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="font-medium text-xs leading-tight">
                            {meta.nativeName}
                          </span>
                          <span
                            className={`text-[10px] leading-tight mt-0.5 ${
                              isSelected
                                ? "text-zinc-300 dark:text-zinc-600 font-normal"
                                : "text-zinc-400 dark:text-zinc-500"
                            }`}
                          >
                            {meta.label}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                            Active
                          </span>
                          <Check className="w-4 h-4 shrink-0" />
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppFloatingNav;

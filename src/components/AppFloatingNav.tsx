import React, { useEffect, useState } from "react";
import FloatingActionMenu from "@/components/ui/floating-action-menu";
import { Home, BookOpen, Sun, Moon } from "lucide-react";
import { getTranslations, type Locale } from "../i18n/config";

interface AppFloatingNavProps {
  locale: Locale;
  homeUrl: string;
  blogUrl: string;
}

export const AppFloatingNav: React.FC<AppFloatingNavProps> = ({
  locale,
  homeUrl,
  blogUrl,
}) => {
  const [isDark, setIsDark] = useState(false);

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

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (_) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch (_) {}
    }
    const metaTheme = document.getElementById("meta-theme-color");
    if (metaTheme) {
      metaTheme.setAttribute("content", nextDark ? "#09090b" : "#fafafa");
    }
    setIsDark(nextDark);
    window.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: { theme: nextDark ? "dark" : "light" },
      })
    );
  };

  const t = getTranslations(locale);

  const options = [
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
      label: isDark ? "Light Mode" : "Dark Mode",
      Icon: isDark ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-white" />
      ),
      onClick: toggleTheme,
    },
  ];

  return <FloatingActionMenu options={options} className="z-50" />;
};

export default AppFloatingNav;

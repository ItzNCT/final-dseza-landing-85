// src/components/hero/TopBar.tsx
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation, formatDate } from "@/utils/translations"; // Đảm bảo formatDate được import
import { Sun, Moon, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Đổi tên state để rõ ràng hơn
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Cập nhật mỗi giây để hiển thị giờ:phút:giây chính xác
    const timerId = setInterval(() => setCurrentDateTime(new Date()), 1000);
    // Cleanup interval khi component unmount
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Màu chữ cho trạng thái chưa cuộn (isScrolled = false) -> glass-initial
  const initialTextColor = theme === "dark" ? "text-white/80 hover:text-dseza-dark-primary" : "text-gray-700 hover:text-dseza-light-primary";
  const initialLangActiveColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const initialLangInactiveColor = theme === "dark" ? "text-white/70 hover:text-dseza-dark-primary" : "text-gray-600 hover:text-dseza-light-primary";
  const initialSeparatorColor = theme === "dark" ? "text-white/50" : "text-gray-500/70";

  // Màu chữ cho trạng thái đã cuộn (isScrolled = true) -> glass-sticky
  const scrolledTextColor = theme === "dark" ? "text-gray-200 hover:text-dseza-dark-primary" : "text-gray-700 hover:text-dseza-light-primary";
  const scrolledLangActiveColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const scrolledLangInactiveColor = theme === "dark" ? "text-gray-300 hover:text-dseza-dark-primary" : "text-gray-600 hover:text-dseza-light-primary";
  const scrolledSeparatorColor = theme === "dark" ? "text-gray-400" : "text-gray-500";

  // Đổi tên biến cho rõ ràng hơn
  const dateTimeTextColor = isScrolled
    ? (theme === "dark" ? "text-gray-300" : "text-gray-600")
    : (theme === "dark" ? "text-white/90" : "text-neutral-700");

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 h-12",
        isScrolled ? "glass-sticky" : "glass-initial"
      )}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        {/* Ngày giờ */}
        <div className={cn("flex items-center text-sm", dateTimeTextColor)}> {/* Thêm class text-sm cho nhất quán */}
          {/* Gọi formatDate với includeTime = true */}
          <span>{formatDate(currentDateTime, true)}</span>
        </div>

        {/* Sơ đồ site, Ngôn ngữ, Theme */}
        <div className="flex items-center">
          {/* Sơ đồ site */}
          <a
            href="/sitemap"
            className={cn(
              "flex items-center transition-colors duration-300 mr-6 text-sm",
              isScrolled ? scrolledTextColor : initialTextColor
            )}
          >
            <Map className="w-4 h-4 mr-1" />
            <span>{t('sitemap')}</span>
          </a>

          {/* Ngôn ngữ */}
          <div className="flex items-center mx-4">
            <button
              onClick={toggleLanguage}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                language === "vi"
                  ? (isScrolled ? scrolledLangActiveColor : initialLangActiveColor)
                  : (isScrolled ? scrolledLangInactiveColor : initialLangInactiveColor)
              )}
            >
              VIE
            </button>
            <span className={cn(
                "mx-1",
                isScrolled ? scrolledSeparatorColor : initialSeparatorColor
            )}>
                /
            </span>
            <button
              onClick={toggleLanguage}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                language === "en"
                  ? (isScrolled ? scrolledLangActiveColor : initialLangActiveColor)
                  : (isScrolled ? scrolledLangInactiveColor : initialLangInactiveColor)
              )}
            >
              ENG
            </button>
          </div>

          {/* Nút chuyển Theme */}
          <button
            onClick={toggleTheme}
            className={cn(
              "transition-colors duration-300",
              isScrolled ? scrolledTextColor : initialTextColor
            )}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
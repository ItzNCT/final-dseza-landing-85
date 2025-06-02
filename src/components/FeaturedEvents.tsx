import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";

type EventCardProps = {
  image: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  featured?: boolean;
  isLarge?: boolean;
};

const EventCard = ({ image, date, title, titleEn, excerpt, excerptEn, featured = false, isLarge = false }: EventCardProps) => {
  const isFeature = featured || isLarge;
  const { language } = useLanguage();
  
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayExcerpt = language === 'en' && excerptEn ? excerptEn : excerpt;
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl group",
      isFeature ? 'col-span-2 row-span-2' : ''
    )}>
      <AspectRatio ratio={1/1}>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </AspectRatio>
      {/* Overlay for darkening effect on hover */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/50"></div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3 lg:p-4">
        <div className="flex items-center gap-2 mb-2 text-white/80">
          <CalendarDays className="h-4 w-4" />
          <span className="text-xs">{date}</span>
        </div>
        <h3 className={cn(
          "text-white transition-all duration-300 ease-in-out",
          "group-hover:font-extrabold",
          isFeature ? 'text-lg lg:text-xl mb-2 font-bold' : 'text-sm lg:text-base font-semibold'
        )}>
          <a href="#" className="hover:underline">{displayTitle}</a>
        </h3>
        {isFeature && displayExcerpt && (
          <p className="text-white/80 text-sm line-clamp-2">{displayExcerpt}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Featured events section displaying prominent events
 */
const FeaturedEvents: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  // Sample event data - in a real app, this would come from an API
  const events = [
    {
      id: "1",
      image: "/media/Featuredevent/Featuredevent1.png",
      date: "20/05/2023",
      title: "Sự kiện nổi bật 1",
      titleEn: "Featured event 1",
      excerpt: "Hội nghị xúc tiến đầu tư công nghệ cao Đà Nẵng năm 2023 với sự tham gia của nhiều doanh nghiệp lớn trong và ngoài nước.",
      excerptEn: "Danang High-Tech Investment Promotion Conference 2023 with the participation of many large domestic and foreign enterprises.",
      featured: true,
    },
    {
      id: "2",
      image: "/media/Featuredevent/Featuredevent2.png",
      date: "15/05/2023",
      title: "Sự kiện nổi bật 2",
      titleEn: "Featured event 2",
    },
    {
      id: "3",
      image: "/media/Featuredevent/Featuredevent3.png",
      date: "10/05/2023",
      title: "Sự kiện nổi bật 3",
      titleEn: "Featured event 3",
    },
    {
      id: "4",
      image: "/media/Featuredevent/Featuredevent4.png",
      date: "05/05/2023",
      title: "Sự kiện nổi bật 4",
      titleEn: "Featured event 4",
    },
    {
      id: "5",
      image: "/media/Featuredevent/Featuredevent5.png",
      date: "01/05/2023",
      title: "Sự kiện nổi bật 5",
      titleEn: "Featured event 5",
    },
  ];

  return (
    <section className={cn(
      "py-8 lg:py-10 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#2C363F]" : "bg-[#F2F2F2]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl mb-6 lg:mb-8 text-center",
          textColor
        )}>
          {t('featuredEvents.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {events.map((event, index) => (
            <EventCard 
              key={event.id}
              date={event.date}
              title={event.title}
              titleEn={event.titleEn}
              excerpt={event.excerpt}
              excerptEn={event.excerptEn}
              image={event.image}
              isLarge={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
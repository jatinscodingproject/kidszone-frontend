import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Explore & Discover",
    subtitle: "Trending videos updated daily",
    image: "https://media.istockphoto.com/id/1223127014/vector/children-writing-on-paper.jpg?s=612x612&w=0&k=20&c=bmSedYRTJnaIuklGR4MoZZ0JCzPpkPP-09JMDC8X9_k=",
  },
  {
    title: "Watch Anywhere",
    subtitle: "Stream videos on any device",
    image: "https://media.istockphoto.com/id/1028032242/vector/happy-children-playing-in-playground.jpg?s=612x612&w=0&k=20&c=lbyF1qbdCBHeyHs06ifBiKxzzLgrSLmTIdOeTqudync=",
  },
  {
    title: "Create & Share",
    subtitle: "Upload and share your creativity",
    image: "https://media.istockphoto.com/id/507304856/vector/naughty-kids-fantastic-happy-world-and-wonderland.jpg?s=612x612&w=0&k=20&c=Ag43oVALjbnKWv3kHCkq4FBOHLQv8tweVG9xdpnxZC0=",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt={slide.title}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {/* {slide.title} */}
                  </h1>
                  <p className="text-lg md:text-xl mb-8">
                    {/* {slide.subtitle} */}
                  </p>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

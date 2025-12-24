import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Electronics',
    subtitle: 'Latest gadgets at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
    cta: 'Shop Electronics',
  },
  {
    id: 2,
    title: 'Fashion Collection',
    subtitle: 'Trendy styles for every occasion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop',
    cta: 'Browse Fashion',
  },
  {
    id: 3,
    title: 'Home & Living',
    subtitle: 'Transform your space with our selection',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    cta: 'Explore Home',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-secondary-foreground">
              <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
                New Arrivals
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {slide.subtitle}
              </p>
              <Link to="/products">
                <Button size="lg" className="text-lg px-8 py-6">
                  {slide.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-background/60 hover:bg-background'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

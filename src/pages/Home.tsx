import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Check, Star, Shield, Clock, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";

// --- Hero Section ---
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-primary text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="h-[1px] w-12 bg-accent"></div>
            <span className="text-sm font-medium tracking-widest text-accent uppercase">Кухни на заказ с 2010 года</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-white">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="block"
              >
                Создаём кухни,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="block"
              >
                в которых хочется <span className="text-gradient-gold italic relative">
                  жить
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-lg text-text-medium max-w-lg leading-relaxed"
          >
            Спроектируем и изготовим кухню вашей мечты за 30 дней.
            Бесплатный 3D-дизайн проект при заказе до конца месяца.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/quiz">
              <Button size="lg" className="text-lg shadow-gold/30 shadow-lg w-full sm:w-auto">
                Подобрать кухню
              </Button>
            </Link>
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="text-lg w-full sm:w-auto">
                Смотреть каталог
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            {[
              { icon: Shield, text: "Гарантия 10 лет" },
              { icon: TrendingUp, text: "Рассрочка 0%" },
              { icon: Clock, text: "Монтаж за 1 день" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-text-dark/80">
                <div className="w-6 h-6 rounded-full bg-secondary/30 flex items-center justify-center text-accent-hover">
                  <Check className="w-3 h-3" />
                </div>
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative order-1 lg:order-2 h-[400px] lg:h-[600px] w-full">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="Premium Kitchen" 
              className="w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-[2s]"
            />
            
            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]"
            >
              <div className="flex items-center gap-1 text-accent mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-primary">4.9</span>
              </div>
              <p className="text-xs text-text-medium">Средний рейтинг на основе 1200+ отзывов</p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-8 right-8 bg-primary/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10"
            >
              <p className="text-white/60 text-xs mb-1">Стоимость</p>
              <p className="text-white font-mono font-medium">от 89 000 ₽/м.п.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light/50"
      >
        <span className="text-xs uppercase tracking-widest">Листайте вниз</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}

// --- Marquee Section ---
function MarqueeSection() {
  return (
    <div className="bg-gradient-gold py-4 overflow-hidden relative z-20">
      <div className="flex w-max animate-marquee">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-primary font-display font-bold text-lg tracking-widest uppercase whitespace-nowrap">Индивидуальный дизайн</span>
            <div className="w-2 h-2 rotate-45 bg-primary/40"></div>
            <span className="text-primary font-display font-bold text-lg tracking-widest uppercase whitespace-nowrap">Немецкая фурнитура</span>
            <div className="w-2 h-2 rotate-45 bg-primary/40"></div>
            <span className="text-primary font-display font-bold text-lg tracking-widest uppercase whitespace-nowrap">Гарантия 10 лет</span>
            <div className="w-2 h-2 rotate-45 bg-primary/40"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Benefits Section ---
function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const benefits = [
    { number: "12", label: "Лет на рынке", desc: "Успешной работы и развития" },
    { number: "3200+", label: "Проектов", desc: "Реализовано и установлено" },
    { number: "4.9", label: "Рейтинг", desc: "Средняя оценка клиентов" },
    { number: "24", label: "Месяца", desc: "Гарантия на монтаж" },
  ];

  return (
    <section ref={ref} className="py-24 bg-light relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Почему мы</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Не просто кухни — пространство для жизни</h2>
          <div className="w-20 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
            >
              <div className="text-5xl font-mono font-light text-primary mb-4 group-hover:text-accent transition-colors">{item.number}</div>
              <h4 className="text-xl font-serif font-bold mb-2">{item.label}</h4>
              <p className="text-text-medium text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Popular Styles Section (Horizontal Scroll) ---
function StylesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const styles = [
    { title: "Современный", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop", price: "185 000" },
    { title: "Скандинавский", img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070&auto=format&fit=crop", price: "165 000" },
    { title: "Классика", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2071&auto=format&fit=crop", price: "220 000" },
    { title: "Лофт", img: "https://images.unsplash.com/photo-1556909190-eccf4c8ba7ef?q=80&w=2070&auto=format&fit=crop", price: "195 000" },
    { title: "Неоклассика", img: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop", price: "210 000" },
    { title: "Минимализм", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop", price: "175 000" },
  ];

  return (
    <section className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Найдите свой стиль</h2>
          <p className="text-white/60">Мы работаем с любым дизайнерским направлением</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-8 px-4 container mx-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {styles.map((style, i) => (
          <div key={i} className="min-w-[220px] md:min-w-[280px] h-[320px] relative group rounded-2xl overflow-hidden snap-center flex-shrink-0 cursor-pointer">
            <img 
              src={style.img} 
              alt={style.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-serif font-bold mb-1">{style.title}</h3>
              <p className="text-white/70 text-sm mb-3">от {style.price} ₽</p>
              <span className="inline-flex items-center text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                Подробнее <ArrowRight className="w-3 h-3 ml-2" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- CTA / Quiz Teaser Section ---
function QuizTeaserSection() {
  return (
    <section className="py-24 bg-light overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto group">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
              alt="Kitchen Detail" 
              className="w-full h-full object-cover"
            />
            
            {/* Hotspots */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent animate-ping opacity-75"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent z-10 cursor-pointer hover:scale-125 transition-transform group/spot">
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap text-sm pointer-events-none">
                 Фасады МДФ эмаль
               </div>
            </div>
          </div>
          
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Соберите кухню мечты за 2 минуты</h2>
            <p className="text-text-medium mb-8 text-lg">
              Ответьте на 8 простых вопросов и получите персональный расчёт стоимости + подарок на выбор.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Расчёт стоимости в 3 вариантах",
                "3D-визуализация бесплатно",
                "Скидка до 15% за прохождение теста",
                "Подарок на выбор (мойка, вытяжка...)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-dark">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <Link to="/quiz">
              <Button size="lg" className="w-full sm:w-auto h-16 text-lg animate-shimmer bg-[linear-gradient(110deg,#C9A96E,45%,#E8D5B7,55%,#C9A96E)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Sparkles className="w-5 h-5 mr-2" />
                Пройти квиз и получить подарок
              </Button>
            </Link>
            <p className="mt-4 text-xs text-center sm:text-left text-text-light">Занимает ≈ 2 минуты</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <Layout>
      <HeroSection />
      <MarqueeSection />
      <BenefitsSection />
      <StylesSection />
      <QuizTeaserSection />
      
      {/* Short CTA Section */}
      <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Готовы обсудить проект?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Оставьте заявку на бесплатный замер и дизайн-проект. Мы приедем с образцами материалов.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/contacts">
               <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                 Записаться на замер
               </Button>
             </Link>
             <a href="tel:+79991234567" className="flex items-center gap-2 hover:text-accent transition-colors p-4">
               <Phone className="w-5 h-5" />
               <span>+7 (999) 123-45-67</span>
             </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

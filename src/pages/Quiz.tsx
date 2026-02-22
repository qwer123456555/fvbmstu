import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Gift } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

// Icons for Kitchen Shapes (More detailed)
const ShapeIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "linear":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className={className}>
          <rect x="10" y="40" width="80" height="20" rx="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M10 40h80 M30 40v20 M50 40v20 M70 40v20" />
          <circle cx="20" cy="50" r="3" fill="currentColor" />
          <circle cx="60" cy="50" r="3" fill="currentColor" />
        </svg>
      );
    case "L-shape":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className={className}>
          <path d="M20 20v60h60" strokeWidth="20" strokeLinecap="round" stroke="currentColor" opacity="0.2" />
          <path d="M20 20v60h60" strokeLinecap="round" />
          <path d="M20 40h-5 M20 60h-5 M40 80v5 M60 80v5" strokeWidth="2" />
          <circle cx="20" cy="30" r="3" fill="currentColor" />
          <circle cx="70" cy="80" r="3" fill="currentColor" />
        </svg>
      );
    case "U-shape":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className={className}>
          <path d="M20 20v60h60v-60" strokeWidth="20" strokeLinecap="round" stroke="currentColor" opacity="0.2" />
          <path d="M20 20v60h60v-60" strokeLinecap="round" />
          <circle cx="20" cy="30" r="3" fill="currentColor" />
          <circle cx="50" cy="80" r="3" fill="currentColor" />
          <circle cx="80" cy="30" r="3" fill="currentColor" />
        </svg>
      );
    case "island":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className={className}>
          <rect x="10" y="20" width="80" height="20" rx="2" fill="currentColor" fillOpacity="0.2" />
          <rect x="30" y="60" width="40" height="20" rx="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M10 20h80 M30 60h40" />
          <circle cx="20" cy="30" r="3" fill="currentColor" />
          <circle cx="50" cy="70" r="3" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

const questions = [
  {
    id: "style",
    title: "Какой стиль вам ближе?",
    subtitle: "Выберите один вариант, который вам нравится больше всего",
    type: "cards",
    options: [
      {
        id: "modern",
        title: "Современный",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "classic",
        title: "Классика",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "scandi",
        title: "Сканди",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "loft",
        title: "Лофт",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "provence",
        title: "Прованс",
        image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "hitech",
        title: "Хай-тек",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      },
    ],
  },
  {
    id: "shape",
    title: "Какая форма кухни вам подходит?",
    subtitle: "Исходя из планировки вашего помещения",
    type: "shapes",
    options: [
      { id: "linear", title: "Прямая", desc: "Для узких помещений", iconType: "linear" },
      { id: "L-shape", title: "Г-образная", desc: "Универсальный вариант", iconType: "L-shape" },
      { id: "U-shape", title: "П-образная", desc: "Много места для хранения", iconType: "U-shape" },
      { id: "island", title: "С островом", desc: "Для просторных кухонь", iconType: "island" },
    ],
  },
  {
    id: "area",
    title: "Какая площадь вашей кухни?",
    subtitle: "Хотя бы примерно, чтобы мы понимали масштаб",
    type: "slider",
    min: 4,
    max: 30,
    unit: "м²",
  },
  {
    id: "material",
    title: "Какой материал фасадов?",
    subtitle: "От этого зависит долговечность и внешний вид",
    type: "cards_text",
    options: [
      { id: "ldsp", title: "ЛДСП", desc: "Бюджетный вариант", price: "₽" },
      { id: "mdf_film", title: "МДФ Плёнка", desc: "Практично и недорого", price: "₽₽" },
      { id: "mdf_enamel", title: "МДФ Эмаль", desc: "Премиальный вид", price: "₽₽₽" },
      { id: "wood", title: "Массив", desc: "Элитная классика", price: "₽₽₽₽" },
    ],
  },
  {
    id: "color",
    title: "Предпочтительная цветовая гамма",
    subtitle: "Какие оттенки вы хотите видеть на своей кухне?",
    type: "colors",
    options: [
      { id: "white", title: "Белый", hex: "#FFFFFF", border: true },
      { id: "beige", title: "Бежевый", hex: "#E8D5B7" },
      { id: "grey", title: "Серый", hex: "#808080" },
      { id: "dark", title: "Тёмный", hex: "#2D2D2D" },
      { id: "green", title: "Зелёный", hex: "#4CAF50" },
      { id: "blue", title: "Синий", hex: "#1A1A2E" },
      { id: "wood_tex", title: "Дерево", hex: "url('https://images.unsplash.com/photo-1543446695-950c0250742f?w=100&h=100&fit=crop')", isImage: true },
    ],
  },
  {
    id: "countertop",
    title: "Какую столешницу рассматриваете?",
    subtitle: "Рабочая поверхность - самая важная часть кухни",
    type: "cards_text",
    options: [
      { id: "laminate", title: "Пластик (HPL)", desc: "Износостойкий и доступный", price: "₽" },
      { id: "artificial_stone", title: "Искусственный камень", desc: "Бесшовное соединение", price: "₽₽₽" },
      { id: "quartz", title: "Кварцевый агломерат", desc: "Сверхпрочный материал", price: "₽₽₽₽" },
      { id: "natural_stone", title: "Натуральный камень", desc: "Уникальный рисунок", price: "₽₽₽₽₽" },
    ],
  },
  {
    id: "appliances",
    title: "Нужна ли встроенная техника?",
    subtitle: "Мы можем укомплектовать кухню под ключ",
    type: "multiselect",
    options: [
      { id: "hob", title: "Варочная панель" },
      { id: "oven", title: "Духовой шкаф" },
      { id: "dishwasher", title: "Посудомойка" },
      { id: "fridge", title: "Холодильник" },
      { id: "hood", title: "Вытяжка" },
      { id: "microwave", title: "СВЧ" },
    ],
  },
  {
    id: "gift",
    title: "Выберите подарок!",
    subtitle: "За прохождение опроса вы получаете гарантированный бонус",
    type: "gift",
    options: [
      { id: "design", title: "3D-проект", desc: "Бесплатная визуализация", icon: "🎨" },
      { id: "discount", title: "Скидка 15%", desc: "На гарнитур", icon: "💰" },
      { id: "mounting", title: "Монтаж", desc: "Установка в подарок", icon: "🔧" },
      { id: "blum", title: "Петли Blum", desc: "Премиум фурнитура", icon: "🎁" },
    ],
  },
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const question = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;
  
  const expertLevel = 
    progress < 25 ? "Новичок" :
    progress < 50 ? "Любитель" :
    progress < 75 ? "Дизайнер" :
    "Гуру кухонь";

  const handleSelect = (value: any) => {
    setAnswers({ ...answers, [question.id]: value });
    // Auto advance for single choice
    if (question.type !== "slider" && question.type !== "multiselect" && question.type !== "gift") {
      setTimeout(() => {
        if (currentStep < questions.length) {
          setCurrentStep(currentStep + 1);
        }
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light to-white flex items-center justify-center p-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
         >
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-success" />
            </div>
            <h2 className="text-3xl font-playfair font-bold mb-4">Спасибо!</h2>
            <p className="text-text-medium mb-8">
              Ваша заявка принята. Менеджер свяжется с вами в течение 15 минут для уточнения деталей.
            </p>
            <div className="bg-secondary/10 p-4 rounded-xl mb-8">
              <p className="font-medium text-primary">Ваш подарок:</p>
              <p className="text-xl font-bold text-accent">
                {questions.find(q => q.id === "gift")?.options?.find((o: any) => o.id === answers.gift)?.title || "3D-проект"}
              </p>
            </div>
            <Link to="/">
              <Button variant="primary" className="w-full">Вернуться на главную</Button>
            </Link>
         </motion.div>
      </div>
    );
  }

  // Final form step
  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Summary */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-light-gray flex flex-col justify-center">
              <h3 className="text-2xl font-playfair font-bold mb-6">Ваши предпочтения:</h3>
              <div className="space-y-4">
                 {Object.entries(answers).map(([key, value]: [string, any]) => {
                    const q = questions.find(q => q.id === key);
                    if(!q) return null;
                    
                    let label = value;
                    if(q.options) {
                       if(Array.isArray(value)) {
                          label = value.map(v => q.options?.find((o: any) => o.id === v)?.title).join(", ");
                       } else {
                          label = q.options.find((o: any) => o.id === value)?.title;
                       }
                    }
                    if(key === 'area') label += ' м²';

                    return (
                       <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-text-medium font-medium">{q.title.split(' ')[1]}:</span> 
                          {/* Hacky shortened title for summary */}
                          <span className="font-bold text-primary">{label}</span>
                       </div>
                    )
                 })}
              </div>
            </div>

            {/* Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
               <h2 className="text-3xl font-playfair font-bold mb-2">Почти готово!</h2>
               <p className="text-text-medium mb-8">Оставьте контакты, чтобы закрепить за собой подарок и получить расчет.</p>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-medium mb-1">Ваше имя</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent outline-none transition-colors"
                      placeholder="Иван"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-medium mb-1">Телефон</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent outline-none transition-colors"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-text-medium mb-1">Комментарий (необязательно)</label>
                     <textarea 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent outline-none transition-colors h-24 resize-none"
                        placeholder="Пожелания..."
                        value={formData.comment}
                        onChange={e => setFormData({...formData, comment: e.target.value})}
                     />
                  </div>
                  
                  <Button type="submit" variant="primary" className="w-full py-4 text-lg shadow-gold glow">
                    Получить расчёт
                  </Button>
                  <p className="text-xs text-center text-text-light mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
               </form>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/* Quiz Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 h-20">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <Link to="/" className="text-text-medium hover:text-primary transition-colors flex items-center gap-2">
             <ArrowLeft size={20} /> <span className="hidden sm:inline">На главную</span>
          </Link>
          
          <div className="flex flex-col items-center w-1/3">
             <span className="text-sm font-mono font-medium text-accent uppercase tracking-widest mb-1">
               Шаг {currentStep + 1} из {questions.length}
             </span>
             <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
             </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="text-right hidden sm:block">
                <p className="text-xs text-text-light uppercase">Уровень эксперта</p>
                <p className="font-bold text-primary">{expertLevel}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-accent">
               <Gift size={20} />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-12 px-4 container mx-auto flex flex-col justify-center max-w-5xl">
         <AnimatePresence mode="wait">
            <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="w-full"
            >
               <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-4 text-primary">
                    {question.title}
                  </h1>
                  <p className="text-lg text-text-medium">
                    {question.subtitle}
                  </p>
               </div>

               {/* Render Options based on type */}
               <div className="min-h-[400px]">
                  {question.type === "cards" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {question.options?.map((option: any) => (
                        <div 
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={cn(
                            "relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] border-2 transition-all duration-300",
                            answers[question.id] === option.id ? "border-accent ring-2 ring-accent/30" : "border-transparent hover:border-gray-200"
                          )}
                        >
                          <img src={option.image} alt={option.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                             <div className="w-full flex justify-between items-center">
                                <h3 className="text-white font-bold text-xl">{option.title}</h3>
                                {answers[question.id] === option.id && <div className="bg-accent text-white rounded-full p-1"><Check size={16}/></div>}
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "shapes" && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {question.options?.map((option: any) => (
                           <div 
                             key={option.id}
                             onClick={() => handleSelect(option.id)}
                             className={cn(
                               "p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-3 bg-white hover:shadow-lg",
                               answers[question.id] === option.id ? "border-accent bg-accent/5" : "border-gray-100"
                             )}
                           >
                              <div className={cn("w-20 h-20 p-2 rounded-xl", answers[question.id] === option.id ? "text-accent" : "text-gray-400")}>
                                <ShapeIcon type={option.iconType} className="w-full h-full" />
                              </div>
                              <div>
                                 <h3 className="font-bold text-lg mb-1">{option.title}</h3>
                                 <p className="text-xs text-text-light">{option.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {question.type === "slider" && (
                     <div className="max-w-xl mx-auto py-12">
                        <div className="text-center mb-12">
                           <span className="text-8xl font-dm-mono font-bold text-primary">
                             {answers[question.id] || question.min}
                           </span>
                           <span className="text-2xl text-text-light ml-2">{question.unit}</span>
                        </div>
                        <input 
                           type="range"
                           min={question.min}
                           max={question.max}
                           step={1}
                           value={answers[question.id] || question.min}
                           onChange={(e) => setAnswers({...answers, [question.id]: parseInt(e.target.value)})}
                           className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="flex justify-between mt-4 text-sm text-text-light font-mono">
                           <span>Компактная ({question.min} {question.unit})</span>
                           <span>Просторная ({question.max} {question.unit})</span>
                        </div>
                        <div className="mt-12 text-center">
                           <Button variant="primary" onClick={handleNext} className="w-full md:w-auto px-12">Далее</Button>
                        </div>
                     </div>
                  )}

                  {question.type === "cards_text" && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        {question.options?.map((option: any) => (
                           <div 
                             key={option.id}
                             onClick={() => handleSelect(option.id)}
                             className={cn(
                               "p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between bg-white hover:shadow-md",
                               answers[question.id] === option.id ? "border-accent bg-accent/5" : "border-gray-100"
                             )}
                           >
                              <div>
                                 <h3 className="font-bold text-lg">{option.title}</h3>
                                 <p className="text-sm text-text-light">{option.desc}</p>
                              </div>
                              <div className="text-right">
                                 <span className="text-text-light font-mono text-sm">{option.price}</span>
                                 {answers[question.id] === option.id && <div className="text-accent mt-1"><Check size={20}/></div>}
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {question.type === "colors" && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                      {question.options?.map((option: any) => (
                        <div 
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={cn(
                            "group cursor-pointer flex flex-col items-center gap-3",
                          )}
                        >
                          <div className={cn(
                            "w-24 h-24 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105 relative flex items-center justify-center",
                            answers[question.id] === option.id && "ring-4 ring-accent ring-offset-2"
                          )}
                          style={{ 
                            background: option.hex,
                            backgroundSize: 'cover',
                            border: option.border ? '1px solid #e5e5e5' : 'none'
                          }}
                          >
                             {answers[question.id] === option.id && <Check className={option.id === 'white' ? 'text-black' : 'text-white'} size={32} />}
                          </div>
                          <span className={cn("font-medium transition-colors", answers[question.id] === option.id ? "text-accent" : "text-text-medium")}>{option.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "multiselect" && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {question.options?.map((option: any) => {
                           const isSelected = (answers[question.id] || []).includes(option.id);
                           return (
                             <div 
                               key={option.id}
                               onClick={() => {
                                  const current = answers[question.id] || [];
                                  const newVal = isSelected ? current.filter((i: string) => i !== option.id) : [...current, option.id];
                                  setAnswers({...answers, [question.id]: newVal});
                               }}
                               className={cn(
                                 "p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-3 bg-white hover:shadow-md",
                                 isSelected ? "border-accent bg-accent/5" : "border-gray-100"
                               )}
                             >
                                <div className={cn(
                                   "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                                   isSelected ? "bg-accent border-accent" : "border-gray-300"
                                )}>
                                   {isSelected && <Check size={14} className="text-white"/>}
                                </div>
                                <span className="font-medium">{option.title}</span>
                             </div>
                           )
                        })}
                        <div className="col-span-full text-center mt-8">
                           <Button variant="primary" onClick={handleNext} className="w-full md:w-auto px-12">Подтвердить выбор</Button>
                        </div>
                     </div>
                  )}

                  {question.type === "gift" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                       {question.options?.map((option: any) => (
                          <div 
                            key={option.id}
                            onClick={() => {
                               setAnswers({...answers, [question.id]: option.id});
                               handleNext();
                            }}
                            className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-gold transition-all duration-300 cursor-pointer border border-transparent hover:border-accent/30 group"
                          >
                             <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{option.icon}</span>
                                <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-accent flex items-center justify-center">
                                   <ChevronRight size={16} className="text-gray-300 group-hover:text-accent" />
                                </div>
                             </div>
                             <h3 className="text-xl font-bold mb-1">{option.title}</h3>
                             <p className="text-text-medium text-sm">{option.desc}</p>
                          </div>
                       ))}
                    </div>
                  )}
               </div>
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:hidden z-40">
         <div className="flex justify-between gap-4">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="flex-1">
               Назад
            </Button>
            {question.type === "multiselect" || question.type === "slider" ? null : (
               <Button variant="outline" onClick={handleNext} className="flex-1">
                  Пропустить
               </Button>
            )}
         </div>
      </div>
    </div>
  );
};

export default Quiz;

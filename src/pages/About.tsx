import React from "react";
import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { Users, Award, PenTool, Truck } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Лет на рынке", value: "12" },
    { label: "Реализованных проектов", value: "3,200+" },
    { label: "Сотрудников", value: "45" },
    { label: "Кв. метров производства", value: "1,500" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center text-white">
         <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover brightness-50" />
         </div>
         <div className="relative z-10 text-center max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">Создаем не просто кухни</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">Мы проектируем пространство, где собирается вся семья, рождаются идеи и создаются воспоминания.</p>
         </div>
      </div>

      <Section className="bg-white">
         <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl font-playfair font-bold mb-6 text-primary">История качества</h2>
                  <p className="text-text-medium mb-6 leading-relaxed">
                     Компания «КУХНИ МЕЧТЫ» была основана в 2010 году группой энтузиастов-мебельщиков. Мы начинали с небольшого цеха в 100 м² и огромного желания делать мебель европейского уровня по российским ценам.
                  </p>
                  <p className="text-text-medium mb-6 leading-relaxed">
                     Сегодня мы — это производство полного цикла, собственное дизайн-бюро и команда из 45 профессионалов. Мы используем только проверенные материалы и фурнитуру от ведущих мировых брендов.
                  </p>
                  <div className="grid grid-cols-2 gap-8 mt-12">
                     {stats.map(s => (
                        <div key={s.label}>
                           <div className="text-4xl font-dm-mono font-bold text-accent mb-2">{s.value}</div>
                           <div className="text-sm text-text-light uppercase tracking-wider">{s.label}</div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-gold">
                     <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Производство" />
                  </div>
                  <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block">
                     <p className="font-playfair italic text-xl text-primary">"Каждая деталь имеет значение. Мы не идем на компромиссы в качестве."</p>
                  </div>
               </div>
            </div>
         </Container>
      </Section>

      <Section className="bg-light-gray">
         <Container>
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Наши ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                  { icon: Users, title: "Клиентоцентричность", desc: "Мы слышим каждого клиента и воплощаем именно его мечты, а не шаблоны." },
                  { icon: Award, title: "Качество", desc: "Контроль на каждом этапе: от закупки материалов до финишной сборки." },
                  { icon: PenTool, title: "Дизайн", desc: "Следим за мировыми трендами и внедряем лучшие решения в проекты." },
                  { icon: Truck, title: "Сервис", desc: "Бережная доставка и чистый монтаж. Убираем за собой весь мусор." },
               ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-primary mb-6">
                        <item.icon size={32} />
                     </div>
                     <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                     <p className="text-text-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </Container>
      </Section>
    </Layout>
  );
};

export default About;

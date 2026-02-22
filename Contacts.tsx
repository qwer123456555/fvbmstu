import React from "react";
import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacts = () => {
  return (
    <Layout>
      <div className="pt-32 pb-12">
        <Container>
           <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-center">Контакты</h1>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Info */}
              <div className="space-y-8">
                 <div className="bg-white p-8 rounded-3xl shadow-soft">
                    <h3 className="text-2xl font-bold mb-6 font-playfair">Наш шоурум</h3>
                    <ul className="space-y-6">
                       <li className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center text-accent flex-shrink-0">
                             <MapPin size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-primary text-lg">Адрес</p>
                             <p className="text-text-medium">г. Москва, ул. Лесная, д. 5, БЦ "White Square"</p>
                             <p className="text-sm text-text-light mt-1">3 этаж, офис 305</p>
                          </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center text-accent flex-shrink-0">
                             <Phone size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-primary text-lg">Телефон</p>
                             <p className="text-text-medium">+7 (999) 123-45-67</p>
                             <p className="text-sm text-text-light mt-1">Ежедневно с 9:00 до 21:00</p>
                          </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center text-accent flex-shrink-0">
                             <Mail size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-primary text-lg">Email</p>
                             <p className="text-text-medium">hello@kuhni-mechty.ru</p>
                          </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center text-accent flex-shrink-0">
                             <Clock size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-primary text-lg">Режим работы</p>
                             <p className="text-text-medium">Пн-Пт: 10:00 - 20:00</p>
                             <p className="text-text-medium">Сб-Вс: 11:00 - 18:00</p>
                          </div>
                       </li>
                    </ul>
                 </div>
                 
                 <div className="bg-primary text-white p-8 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-4 font-playfair">Есть вопросы?</h3>
                       <p className="mb-6 opacity-90">Закажите обратный звонок, и наш менеджер свяжется с вами в течение 15 минут.</p>
                       <Button variant="primary" className="w-full justify-center">Заказать звонок</Button>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-medium relative">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.430481195992!2d37.58467231582914!3d55.77884298055938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a2a4b3b1e3b%3A0x6b4f7e5b5b5b5b5b!2z0JHQpiBXaGl0ZSBTcXVhcmU!5e0!3m2!1sen!2sru!4v1620000000000!5m2!1sen!2sru" 
                   width="100%" 
                   height="100%" 
                   style={{border:0}} 
                   loading="lazy"
                   title="Map"
                 ></iframe>
              </div>
           </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Contacts;

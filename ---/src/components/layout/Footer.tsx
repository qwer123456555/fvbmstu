import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 md:py-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif font-bold tracking-tight block">
            КУХНИ <span className="text-accent">МЕЧТЫ</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Создаём премиальные кухни с душой и вниманием к деталям. 
            Индивидуальный дизайн, немецкое качество, монтаж за 1 день.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-accent">Навигация</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {["Главная", "Каталог", "Квиз", "Галерея", "О нас", "Контакты"].map((item) => (
              <li key={item}>
                <Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-accent">Услуги</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {["Дизайн-проект", "Замер помещения", "Производство", "Доставка и монтаж", "Гарантийный сервис"].map((item) => (
              <li key={item}>
                <Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-accent">Контакты</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>г. Москва, ул. Пресненская наб., 12<br/>Башня Федерация, офис 45</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <a href="tel:+79991234567" className="hover:text-white transition-colors">+7 (999) 123-45-67</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <a href="mailto:info@kuhnim.ru" className="hover:text-white transition-colors">info@kuhnim.ru</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <p>© 2024 Кухни Мечты. Все права защищены.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          <Link to="/" className="hover:text-white transition-colors">Договор оферты</Link>
        </div>
      </div>
    </footer>
  );
}

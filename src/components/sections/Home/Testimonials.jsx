import React from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Hexa Dijital ile Paninoteca Chicken'in marka kimliğini baştan yarattık. Logo güncellemesinden QR menü sistemine kadar her detay özenle kurgulandı; vizyonumuzu bizden bile daha iyi yansıttılar.",
    name: "İbrahim Bey",
    title: "Kurucu, Paninoteca Chicken",
    initial: "İ",
  },
  {
    id: 2,
    quote:
      "Geleneksel işleyişimizi modern bir dijital altyapıya taşıma konusunda harika bir iş çıkardılar. İşletmemizin dijital dönüşümü kusursuz yönetildi ve süreçlerimiz inanılmaz hızlandı.",
    name: "Mehmet Bey",
    title: "Kurucu, Hira Halı Yıkama",
    initial: "M",
  },
  {
    id: 3,
    quote:
      "Hexa Finans entegrasyonu ile restoranımızdaki adisyon ve komisyon takibi karmaşası tamamen ortadan kalktı. Emir ve Hisham ile sadece bir yazılım değil, işimizi büyüten bir iş ortaklığı bulduk.",
    name: "Ömer Bey",
    title: "Ömer Usta",
    initial: "Ö",
  },
];

const Testimonials = () => {
  return (
    <section className="global-section testimonials-section">
      <div className="container testimonials-container">
        {/* SOL TARAF: Ekrana kilitlenen (Sticky) alan */}
        <div className="testimonials-left">
          <div className="testimonials-sticky-content">
            <div className="text-gradient-flow">Yorumlarınız</div>
            <h2 className="testimonials-title">
              Müşterilerimiz <br />
              <span className="text-dimmed global-text-dimmed">
                bizimle olan çalışmaları hakında ne diyor?
              </span>
            </h2>
          </div>
        </div>

        {/* SAĞ TARAF: Yukarı doğru kayan kartlar */}
        <div className="testimonials-right">
          {testimonialsData.map((item) => (
            <div className="testimonial-card global-glass-card" key={item.id}>
              <p className="testimonial-quote">"{item.quote}"</p>

              <div className="testimonial-author">
                <div className="author-avatar">{item.initial}</div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-title">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

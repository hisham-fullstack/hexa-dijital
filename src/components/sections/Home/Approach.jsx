import React from "react";
import "./Approach.css";

const approachValues = [
  {
    id: 1,
    title: "Yaptığımız İşi Seviyoruz",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Özden Görsele",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Koordinatları uç noktalara çekerek maksimum büyüklüğe ulaştırdık */}
        <polygon points="12 1 23 7 23 17 12 23 1 17 1 7" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Sakin Süreç",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Önce Verimlilik",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Yaratıcı Zihinler",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          {/* Görseldeki kesikleri birebir elde etmek için maske kullanıyoruz */}
          <mask id="brainMask">
            <circle cx="12" cy="12" r="7" fill="white" />
            <path
              d="M20 10.5H10.5a1.5 1.5 0 0 0 0 3H20"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M4 7.5h9.5a1.5 1.5 0 0 0 1.5-1.5V4"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 16.5h-9.5a1.5 1.5 0 0 1-1.5 1.5V20"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          </mask>
        </defs>
        {/* Güneş ışınları / Veri akışı (Dışarıdaki 16 adet kesik çizgi) */}
        {/* İç kısımdaki teknolojik beyin dolgusu */}
        <circle
          cx="12"
          cy="12"
          r="7"
          fill="currentColor"
          mask="url(#brainMask)"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Meraktan Beslenen",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        {/* Soru işareti tam olarak 11, 11 (Büyütecin merkezi) koordinatlarına sabitlendi */}
        <path d="M9 9a2 2 0 1 1 4 0c0 1.5-2 2.5-2 3.5" />
        <line x1="11" y1="15" x2="11.01" y2="15" strokeWidth="2.5" />
      </svg>
    ),
  },
];

const Approach = () => {
  return (
    <section className="global-section approach-section">
      <div className="container">
        <div className="approach-content">
          <div className="approach-label">
            <p>YAKLAŞIMIMIZ & DEĞERLERİMİZ</p>
          </div>

          <div className="approach-text">
            <h2>
              <span className="text-dark">
                Yaratıcılığı, stratejik fikirleri ve teknolojiyi
                harmanlayarak{" "}
              </span>
              <span className="text-light">
                başarınızı büyütecek size özel çözümler üretiyoruz.
              </span>
            </h2>
          </div>
        </div>

        <div className="approach-icons-container">
          {approachValues.map((item) => (
            <div key={item.id} className="icon-wrapper">
              <div className="svg-container">{item.icon}</div>
              <span className="icon-text">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;

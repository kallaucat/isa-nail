import { useState } from 'react'
import './App.css'
import emailjs from '@emailjs/browser'
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};
  const [booking, setBooking] = useState({
    name: '',
    service: 'Russian Manicure',
    date: '',
  });

  const [reviews] = useState([
    { id: 1, name: "Lisbeth", comment: "Best Russian manicure in Queens!", stars: 5 },
    { id: 2, name: "Chloe", comment: "Love the atmosphere and the art.", stars: 5 }
  ]);

  const designs = [
    { id: 1, title: "Classic French", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=300", price: "$45" },
    { id: 2, title: "Luxury Gold", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300", price: "$60" },
    { id: 3, title: "Street Style", img: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=300", price: "$55" },
    { id: 4, title: "Matte Finish", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300", price: "$50" }
  ];

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    const serviceID = 'service_b2b8d8x'; 
    const templateID = 'template_q4uw2t4'; 
    const publicKey = 'FuN9_25wkGEZJ0Rfq';

    const templateParams = {
      name: booking.name,
      service: booking.service,
      date: booking.date,
      to_email: 'izzycnails@gmail.com'
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => alert("Booking request sent!"))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="salon-container">
      {/* 1. NAVBAR */}
     <nav className="navbar">
  <div className="nav-logo">Isa Nails<span>✨</span></div>
  
  {/* Botón de hamburguesa para móvil */}
  <button className="menu-toggle" onClick={toggleMenu}>
    ☰
  </button>

  {/* Añadimos una clase dinámica 'active' según el estado */}
  <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
    <li><a href="#inicio" onClick={toggleMenu}>INICIO</a></li>
    <li><a href="#galeria" onClick={toggleMenu}>GALERÍA</a></li>
    <li><a href="#nosotros" onClick={toggleMenu}>NOSOTROS</a></li>
    <li><a href="#reservar" onClick={toggleMenu}>RESERVAR</a></li>
    <li><a href="#reseñas" onClick={toggleMenu}>RESEÑAS</a></li>
    <li><a href="#contacto" onClick={toggleMenu}>CONTACTO</a></li>
  </ul>
</nav>
      {/* 2. HEADER */}
<header
  id="inicio"
  className="hero-section"
  style={{ backgroundImage: "url('/img/hero-nails.jpg')" }}
>
  <div className="hero-overlay" />
  <div className="hero-content">
    <div className="hero-kicker">NEW YORK CITY</div>

    <h1 className="hero-title">
      Elegancia en <span>cada detalle</span>
    </h1>

    <p className="hero-subtitle">
      Experimenta el arte de las uñas en nuestro exclusivo salón en Queens.
      Diseños únicos, productos premium y atención personalizada.
    </p>

    <div className="hero-buttons">
      <a href="#reservar" className="btn-primary">RESERVA TU CITA</a>
      <a href="#galeria" className="btn-ghost">NUESTROS SERVICIOS</a>
    </div>

    <div className="hero-scroll">Isa-Nails</div>
  </div>
</header>
{/* 3. GALERÍA */}
      <section id="galeria" className="gallery-section">
        <h2>Our Latest Designs</h2>
        <div className="nail-grid">
          {designs.map((design) => (
            <div key={design.id} className="nail-item">
              <img src={design.img} alt={design.title} />
              <div className="nail-info">
                <p>{design.title}</p>
                <span>{design.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NOSOTROS */}
      <section id="nosotros" className="about-section">
        <h2>About Isa Nails✨</h2>
        <p>De Colombia a las calles de New York. Pasión por la manicura rusa y el arte en uñas.</p>
      </section>

      {/* 5. FORMULARIO (RESERVAR) */}
      <main id="reservar">
        <form className="booking-form" onSubmit={confirmBooking}>
          <h2>Book an Appointment</h2>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="e.g. Jane Doe" onChange={handleChange} required />

          <label>Select Service</label>
          <select name="service" onChange={handleChange}>
            <option value="Russian Manicure">Russian Manicure</option>
            <option value="Acrylic Nails">Acrylic Nails</option>
            <option value="Gel Polish">Gel Polish</option>
            <option value="Nail Art Design">Nail Art Design</option>
          </select>

          <label>Date & Time</label>
          <input type="datetime-local" name="date" onChange={handleChange} required />

          <button type="submit" className="btn-confirmar">Confirm Booking</button>
        </form>
      </main>

      {/* 6. RESEÑAS */}
      <section id="reseñas" className="reviews-section">
        <h2>What our clients say</h2>
        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <strong>{rev.name}</strong>
              <p>{"⭐".repeat(rev.stars)}</p>
              <p>"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACTO (FOOTER) */}
      <footer id="contacto">
        <p>📍 Queens, New York</p>
        <p>📧 izzycnails@gmail.com</p>
      </footer>
    </div>
  )
}

export default App;
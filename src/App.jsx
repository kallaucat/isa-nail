import { useState } from 'react'
import './App.css'
import emailjs from '@emailjs/browser'

const WHATSAPP_NUMBER = '19298417462'
const WHATSAPP_MSG = encodeURIComponent('Hola Isa Nails 💅 Vi tu página web y me gustaría agendar una cita. ¿Tienes disponibilidad?')
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const BASE = '/isa-nail'

const SERVICES = [
  {
    id: 1,
    name: 'Gel-X Extensions',
img: `${BASE}img/img1.jpg`,
    price: '$90 – $200+',
    desc: 'Extensiones completas con color sólido. Tiers 1–4 según el diseño elegido.'
  },
  {
    id: 2,
    name: 'Structure Gel',
img: `${BASE}img/img2.jpg`,
    price: '$75 – $190+',
    desc: 'Refuerzo con nivelación y color sólido. Ideal para uñas naturales.'
  },
  {
    id: 3,
    name: 'Nail Art & Diseños',
img: `${BASE}img/img3.jpg`,
    price: '$25 – $80+',
    desc: 'Desde francesas hasta diseños personalizados. Precio según complejidad.'
  },
  {
    id: 4,
    name: 'Add-ons & Repairs',
img: `${BASE}img/img4.jpg`,
    price: '$12 – $30',
    desc: 'Remoción foránea ($30) · Reparación de uña ($12) · Remoción propia ($15).'
  }
]

const REVIEWS = [
  {
    id: 1,
    name: 'Lisbeth M.',
    location: 'Queens, NY',
    comment: 'The best Russian manicure in all of Queens — her attention to detail is unmatched. I won\'t go anywhere else.',
    stars: 5
  },
  {
    id: 2,
    name: 'Chloe R.',
    location: 'Brooklyn, NY',
    comment: 'I love the atmosphere and the art. Every set she does feels like a custom piece made just for me.',
    stars: 5
  },
  {
    id: 3,
    name: 'Valentina G.',
    location: 'Bronx, NY',
    comment: 'Increíble calidad y súper profesional. Mis uñas duraron más de 4 semanas perfectas. ¡Regresaré siempre!',
    stars: 5
  }
]

function Stars({ count }) {
  return <div className="review-stars">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</div>
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return <div className="review-avatar">{initials}</div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const [form, setForm] = useState({ name: '', service: 'Gel-X Full Set', date: '', notes: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const confirmBooking = e => {
    e.preventDefault()
    setSending(true)

    const templateParams = {
      name: form.name,
      service: form.service,
      date: form.date,
      notes: form.notes || '—',
      to_email: 'izzycnails@gmail.com'
    }

    emailjs
      .send('service_b2b8d8x', 'template_q4uw2t4', templateParams, 'FuN9_25wkGEZJ0Rfq')
      .then(() => { setSent(true); setSending(false) })
      .catch(err => { console.error(err); setSending(false); alert('Hubo un error. Intenta por WhatsApp.') })
  }

  return (
    <div className="salon-container">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Isa Nails<span>✨</span>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
          {menuOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          <li><a href="#inicio"   onClick={closeMenu}>INICIO</a></li>
          <li><a href="#galeria"  onClick={closeMenu}>SERVICIOS</a></li>
          <li><a href="#nosotros" onClick={closeMenu}>NOSOTROS</a></li>
          <li><a href="#reservar" onClick={closeMenu}>RESERVAR</a></li>
          <li><a href="#resenas"  onClick={closeMenu}>RESEÑAS</a></li>
          <li><a href="#contacto" onClick={closeMenu}>CONTACTO</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <header id="inicio" className="hero-section" style={{ backgroundImage: `url('${BASE}/img/hero-nails.jpg')` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-kicker">Queens · New York City</span>

          <h1 className="hero-title">
            Elegancia en <span>cada detalle</span>
          </h1>

          <p className="hero-subtitle">
            Arte de uñas de alta calidad en el corazón de Queens.
            Diseños únicos, productos premium y atención completamente personalizada.
          </p>

          <div className="hero-buttons">
            <a href="#reservar" className="btn-primary">Reserva tu cita</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Escríbeme por WhatsApp
            </a>
          </div>

          <div className="hero-badge">Isa Nails</div>
        </div>
      </header>

      {/* ── STATS ── */}
      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-number">5+</div>
          <div className="stat-label">Años de experiencia</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Clientes felices</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4</div>
          <div className="stat-label">Servicios disponibles</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">⭐ 5.0</div>
          <div className="stat-label">Calificación promedio</div>
        </div>
      </div>

      {/* ── SERVICIOS ── */}
      <section id="galeria">
        <div className="section-inner">
          <div className="section-header-center">
            <span className="section-eyebrow">Lo que ofrezco</span>
            <h2 className="section-title">Servicios</h2>
            <p className="section-sub">
              Desde extensiones Gel-X hasta diseños personalizados — cada servicio pensado
              para que tus uñas hablen por ti.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.id} className="service-card">
                <img src={s.img} alt={s.name} />
                <div className="service-info">
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <span className="service-price">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros">
        <div className="section-inner">
          <div className="about-grid">
            <div>
              <span className="section-eyebrow">Mi historia</span>
              <blockquote className="about-quote">
                "Cada set es un lienzo — algo que construyo con <span>intención</span>, detalle y creatividad."
              </blockquote>
              <p className="about-body">
                Siempre tuve una conexión natural con el arte. Empecé a hacerme mis propias uñas a los 12 años, simplemente por curiosidad y creatividad.

Crecí en Colombia, donde desarrollé mi amor por el nail art y comencé a verlo como una forma de expresión personal.

Al llegar a Nueva York, mi camino evolucionó — pero mi enfoque siempre fue el mismo: usar el arte para conectar, crear y expresarme con los demás.

Hoy veo cada set como algo especial que construyo con intención y detalle para ti. ✨
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
                Habla conmigo
              </a>
            </div>
            <div className="about-photo-wrap">
<img src={`${BASE}img/img2.jpeg`} alt="Isa trabajando en uñas" />             
<div className="about-accent-box">
                <strong>Isa Nails ✨</strong>
                Queens, New York
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVAR ── */}
      <section id="reservar">
        <div className="section-inner">
          <div className="booking-wrap">
            <div>
              <span className="section-eyebrow">Agenda tu visita</span>
              <h2 className="section-title">Reserva tu cita</h2>
              <p className="section-sub">
                Llena el formulario o escríbeme directamente por WhatsApp.
                Respondo en menos de 24 horas.
              </p>

              <div className="booking-info-item">
                <div className="booking-icon">📍</div>
                <div>
                  <div className="booking-info-label">Ubicación</div>
                  <div className="booking-info-value">Queens, New York City</div>
                </div>
              </div>
              <div className="booking-info-item">
                <div className="booking-icon">⏰</div>
                <div>
                  <div className="booking-info-label">Horario</div>
                  <div className="booking-info-value">Lun – Sáb · 10 am – 7 pm</div>
                </div>
              </div>
              <div className="booking-info-item">
                <div className="booking-icon">📧</div>
                <div>
                  <div className="booking-info-label">Email</div>
                  <div className="booking-info-value">izzycnails@gmail.com</div>
                </div>
              </div>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="wa-booking-card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
                <div className="wa-booking-card-text">
                  <strong>Agendar por WhatsApp</strong>
                  <span>Respuesta rápida · Sin esperas</span>
                </div>
              </a>
            </div>

            <div>
              {sent ? (
                <div className="booking-form">
                  <div className="form-success">
                    <div className="form-success-icon">💅</div>
                    <h3>¡Cita enviada!</h3>
                    <p>Te confirmaré tu cita en menos de 24 horas por email o WhatsApp. ¡Gracias {form.name}!</p>
                  </div>
                </div>
              ) : (
                <form className="booking-form" onSubmit={confirmBooking}>
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input type="text" name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Servicio</label>
                    <select name="service" value={form.service} onChange={handleChange}>
                      <option value="Gel-X Full Set">Gel-X Extensions (desde $90)</option>
                      <option value="Structure Gel">Structure Gel (desde $75)</option>
                      <option value="Nail Art">Nail Art & Diseños (desde $25)</option>
                      <option value="Foreign Removal">Remoción foránea ($30)</option>
                      <option value="Nail Repair">Reparación de uña ($12)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fecha y hora preferida</label>
                    <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Notas adicionales (opcional)</label>
                    <textarea name="notes" placeholder="Color, diseño, referencia de foto, alergias..." value={form.notes} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn-confirmar" disabled={sending}>
                    {sending ? 'Enviando...' : 'Confirmar cita'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEÑAS ── */}
      <section id="resenas">
        <div className="section-inner">
          <div className="section-header-center">
            <span className="section-eyebrow">Testimonios</span>
            <h2 className="section-title">Lo que dicen mis clientas</h2>
            <p className="section-sub">Reseñas reales de mujeres que confían en mi trabajo.</p>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map(r => (
              <div key={r.id} className="review-card">
                <Stars count={r.stars} />
                <p className="review-text">"{r.comment}"</p>
                <div className="review-author">
                  <Avatar name={r.name} />
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-location">{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contacto">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Isa Nails<span>✨</span></div>
            <p className="footer-tagline">
              Arte de uñas de alta calidad en Queens, NYC.<br />
              Diseños únicos · Productos premium · Atención personalizada.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/izzynailss_" target="_blank" rel="noopener noreferrer" className="social-link">IG</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="social-link">WA</a>
              <a href="mailto:izzycnails@gmail.com" className="social-link">✉</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Navegación</div>
            <ul className="footer-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#galeria">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#reservar">Reservar</a></li>
              <li><a href="#resenas">Reseñas</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contacto</div>
            <div className="footer-contact-line"><span>📍</span><span>Queens, New York City</span></div>
            <div className="footer-contact-line"><span>📧</span><span>izzycnails@gmail.com</span></div>
            <div className="footer-contact-line"><span>⏰</span><span>Lun – Sáb · 10 am – 7 pm</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Isa Nails. Queens, New York.</span>
          <span className="footer-copy">Hecho con ✨ en NYC</span>
        </div>
      </footer>

      {/* ── WHATSAPP BUBBLE ── */}
      <a href={WHATSAPP_LINK} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>

    </div>
  )
}
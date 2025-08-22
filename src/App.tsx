import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Users, 
  Shield, 
  FileText, 
  Search,
  Star,
  Menu,
  X,
  ChevronDown,
  Car,
  AlertTriangle,
  BookOpen,
  Gavel
} from 'lucide-react';

// Generar ID de sesión único
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Obtener información del navegador y dispositivo
const getSessionInfo = () => {
  return {
    sessionId: sessionStorage.getItem('sessionId') || (() => {
      const newSessionId = generateSessionId();
      sessionStorage.setItem('sessionId', newSessionId);
      return newSessionId;
    })(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || 'direct',
    currentUrl: window.location.href,
    timestamp: new Date().toISOString()
  };
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    consulta: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consulta.trim()) {
      alert('Por favor, ingrese su consulta antes de enviar.');
      return;
    }

    setIsLoading(true);
    setWebhookResponse(null);
    setShowResponse(false);

    // Obtener información de sesión
    const sessionInfo = getSessionInfo();

    // Enviar consulta al webhook
    fetch('https://n8n.matomaylla.com/webhook-test/b41cc15f-f9f0-44b8-9eeb-1b4840c50d4a', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consulta: formData.consulta,
        source: 'landing-transito-peru',
        session: sessionInfo
      })
    })
    .then(response => response.json())
    .then(data => {
      setWebhookResponse(data);
      setShowResponse(true);
      setFormData({ consulta: '' });
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error al enviar consulta:', error);
      alert('Hubo un error al enviar su consulta. Por favor, inténtelo nuevamente.');
      setIsLoading(false);
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-800" />
              <h1 className="text-2xl font-bold text-gray-800">
                Tránsito<span className="text-red-600">Perú</span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-blue-800 font-medium transition-colors"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('servicios')}
                className="text-gray-700 hover:text-blue-800 font-medium transition-colors"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection('nosotros')}
                className="text-gray-700 hover:text-blue-800 font-medium transition-colors"
              >
                Nosotros
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors"
              >
                Consultar Ahora
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-700 hover:text-blue-800 font-medium py-2 text-left"
                >
                  Inicio
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="text-gray-700 hover:text-blue-800 font-medium py-2 text-left"
                >
                  Servicios
                </button>
                <button 
                  onClick={() => scrollToSection('nosotros')}
                  className="text-gray-700 hover:text-blue-800 font-medium py-2 text-left"
                >
                  Nosotros
                </button>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-900 transition-colors mt-4"
                >
                  Consultar Ahora
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Consulta las
                <span className="text-yellow-400 block">Reglas de Tránsito</span>
                de Perú en Línea
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Obtén información precisa y actualizada sobre las normas de tránsito peruanas. 
                Consulta infracciones, multas, procedimientos y más con nuestros especialistas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Consulta Gratuita
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  Ver Servicios
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Consulta Rápida</h3>
                
                {/* Mostrar respuesta del webhook si existe */}
                {showResponse && webhookResponse && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Respuesta:</h4>
                    <div className="text-green-700 text-sm">
                      {typeof webhookResponse === 'object' ? (
                        <div className="space-y-2">
                          {Object.entries(webhookResponse).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                              <span className="ml-2">
                                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{String(webhookResponse)}</p>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    name="consulta"
                    value={formData.consulta}
                    onChange={handleInputChange}
                    placeholder="¿Cuál es tu consulta sobre tránsito?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    disabled={isLoading}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-blue-900 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Consulta'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nuestros Servicios de Consulta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos asesoría especializada en todas las áreas del código de tránsito peruano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-12 w-12" />,
                title: "Consulta de Infracciones",
                description: "Verifica multas, infracciones y estado de tu record de conductor"
              },
              {
                icon: <FileText className="h-12 w-12" />,
                title: "Asesoría Legal",
                description: "Orientación legal especializada en casos de tránsito y transporte"
              },
              {
                icon: <Gavel className="h-12 w-12" />,
                title: "Defensa de Multas",
                description: "Te ayudamos a presentar recursos y defensas contra multas injustas"
              },
              {
                icon: <BookOpen className="h-12 w-12" />,
                title: "Capacitación",
                description: "Cursos y talleres sobre normativa vigente de tránsito"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="text-blue-800 mb-4 group-hover:text-red-600 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                ¿Por qué elegir nuestro servicio?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "Información Actualizada",
                    description: "Acceso a la normativa más reciente del código de tránsito peruano"
                  },
                  {
                    icon: <Users className="h-6 w-6" />,
                    title: "Especialistas Certificados",
                    description: "Equipo de abogados especializados en derecho de tránsito"
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: "Atención 24/7",
                    description: "Servicio de consulta disponible todos los días del año"
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6" />,
                    title: "Resultados Garantizados",
                    description: "Alta tasa de éxito en la resolución de casos de tránsito"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-8 rounded-2xl">
              <div className="text-center">
                <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  ¿Recibiste una multa de tránsito?
                </h3>
                <p className="text-gray-600 mb-6">
                  No te preocupes. Nuestros especialistas pueden ayudarte a entender tus opciones 
                  y encontrar la mejor solución para tu caso.
                </p>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Consulta Gratuita Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600">
              Miles de peruanos confían en nosotros para sus consultas de tránsito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Conductora Profesional",
                content: "Excelente servicio. Me ayudaron a resolver una multa injusta y me explicaron todos mis derechos como conductora.",
                rating: 5
              },
              {
                name: "Carlos Mendoza",
                role: "Empresario",
                content: "Muy profesionales y rápidos. Consulté sobre las nuevas normas para mi flota de vehículos y obtuve respuestas claras.",
                rating: 5
              },
              {
                name: "Ana Rodríguez",
                role: "Estudiante",
                content: "Me orientaron perfectamente para obtener mi licencia de conducir. Información actualizada y muy útil.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="text-xl text-blue-100">
              Estamos aquí para resolver todas tus dudas sobre tránsito en Perú
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Teléfono</h4>
                    <p className="text-blue-100">+51 1 234-5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-blue-100">info@transitoperu.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-blue-100">Av. Javier Prado Este 123, Lima, Perú</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Horarios</h4>
                    <p className="text-blue-100">Lunes a Domingo: 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Envíanos tu Consulta</h3>
              
              {/* Mostrar respuesta del webhook si existe */}
              {showResponse && webhookResponse && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Respuesta:</h4>
                  <div className="text-green-700 text-sm">
                    {typeof webhookResponse === 'object' ? (
                      <div className="space-y-2">
                        {Object.entries(webhookResponse).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                            <span className="ml-2">
                              {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>{String(webhookResponse)}</p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  name="consulta"
                  value={formData.consulta}
                  onChange={handleInputChange}
                  placeholder="Describe tu consulta sobre tránsito..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={isLoading}
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-blue-900 px-6 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Consulta Gratuita'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Sobre TránsitoPerú
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas en normativa de tránsito peruano con más de 10 años de experiencia
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5,000+</h3>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">95%</h3>
              <p className="text-gray-600">Tasa de éxito en casos</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7</h3>
              <p className="text-gray-600">Atención disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">
                  Tránsito<span className="text-red-400">Perú</span>
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Tu fuente confiable de información sobre reglas de tránsito en Perú.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Consulta de Infracciones</li>
                <li>Asesoría Legal</li>
                <li>Defensa de Multas</li>
                <li>Capacitación</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('inicio')}>Inicio</button></li>
                <li><button onClick={() => scrollToSection('servicios')}>Servicios</button></li>
                <li><button onClick={() => scrollToSection('nosotros')}>Nosotros</button></li>
                <li><button onClick={() => scrollToSection('contacto')}>Contacto</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p>+51 1 234-5678</p>
                <p>info@transitoperu.com</p>
                <p>Lima, Perú</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 TránsitoPerú. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
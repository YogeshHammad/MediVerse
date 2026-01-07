import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, ShieldCheck, Clock, Users, ChevronRight, 
  CheckCircle2, Phone, Mail, MapPin, HeartPulse, Stethoscope,
  Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, Award, Map
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const LandingPage = () => {
  const navigate = useNavigate();

  // Function to handle smooth scrolling from Nav or Footer
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const doctors = [
    { name: "Dr. Sarah Johnson", degree: "MD, Cardiology", profile: "Senior Specialist", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
    { name: "Dr. Michael Chen", degree: "MS, Orthopedics", profile: "Surgery Expert", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
    { name: "Dr. Alisha Khan", degree: "MD, Pediatrics", profile: "Child Care", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
    { name: "Dr. James Wilson", degree: "MD, Neurology", profile: "Brain Expert", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-[100] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <Activity className="text-blue-600" size={28} />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">MediVerse</h1>
        </div>
        
        <div className="hidden lg:flex gap-8 font-bold text-slate-600">
          {['Home', 'About', 'Doctors', 'Services', 'Pricing'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-blue-600 transition-colors">
              {item}
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-100">
          Login Portal
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900 mb-6">
              Modern Care, <br /><span className="text-blue-600">Trusted Results.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
              We provide the highest quality medical services with state-of-the-art technology and compassionate care.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:shadow-2xl transition-all">
                Get Started <ChevronRight />
              </button>
              {/* FIXED LEARN MORE BUTTON */}
              <button onClick={() => scrollToSection('about')} className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all flex items-center gap-2">
                Learn More <ArrowUpRight size={20}/>
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] shadow-2xl border-8 border-white w-full h-[500px] object-cover" alt="Hospital" />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 bg-blue-600 text-white p-8 rounded-3xl shadow-xl z-10 hidden md:block">
                <p className="text-4xl font-black">15+</p>
                <p className="font-bold opacity-80">Years Experience</p>
              </div>
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] shadow-xl relative z-0" alt="Laboratory" />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">About Our Hospital</h3>
              <h2 className="text-4xl font-black mb-6 leading-tight">Leading the Way in Medical Excellence Since 2010</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                MediVerse is dedicated to providing comprehensive healthcare solutions. Our facility integrates advanced diagnostics, expert surgical teams, and digital record management to ensure your health is managed perfectly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {['Emergency Care 24/7', 'Certified Specialists', 'Modern Technology', 'Digital Health Lab'].map(item => (
                  <div key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <CheckCircle2 className="text-blue-600" size={20}/> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Our Premium Services</h2>
            <p className="text-slate-500 font-medium">We offer a wide range of specialized medical departments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <HeartPulse size={40}/>, title: "Cardiology", desc: "Advanced heart care including ECG, Stress Tests, and specialized surgery." },
              { icon: <Stethoscope size={40}/>, title: "Pediatrics", desc: "Compassionate healthcare for children from birth through adolescence." },
              { icon: <Award size={40}/>, title: "Neurology", desc: "Expert treatment for brain, spinal cord, and peripheral nerve disorders." }
            ].map((s, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:bg-blue-600 hover:text-white transition-all group duration-500 cursor-default">
                <div className="text-blue-600 group-hover:text-white mb-6 transition-colors">{s.icon}</div>
                <h4 className="text-2xl font-black mb-4">{s.title}</h4>
                <p className="leading-relaxed opacity-70 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOCTORS SLIDER --- */}
      <section id="doctors" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">Expert Medical Team</h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
            className="pb-16"
          >
            {doctors.map((dr, i) => (
              <SwiperSlide key={i}>
                <div onClick={() => navigate('/login')} className="bg-slate-800 rounded-3xl overflow-hidden cursor-pointer group hover:bg-blue-600 transition-all duration-500">
                  <img src={dr.img} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all" alt={dr.name} />
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-black">{dr.name}</h4>
                    <p className="text-blue-400 group-hover:text-blue-100 font-bold mb-2">{dr.degree}</p>
                    <p className="text-xs uppercase tracking-widest font-black opacity-50">Book Now</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Basic", price: "25", feat: ["Blood Test", "Sugar Level", "Consult"] },
            { name: "Standard", price: "55", feat: ["Blood Test", "Sugar Level", "ECG", "Consult"], active: true },
            { name: "Premium", price: "95", feat: ["Full Body", "X-Ray", "CT Scan", "Specialist"] }
          ].map((p, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] ${p.active ? 'bg-blue-600 text-white shadow-2xl scale-105' : 'bg-white text-slate-900 border'}`}>
              <h3 className="text-xl font-black mb-2">{p.name} Checkup</h3>
              <div className="text-5xl font-black mb-8">${p.price}</div>
              <ul className="space-y-4 mb-10">
                {p.feat.map(f => <li key={f} className="flex items-center gap-2 font-bold opacity-90"><CheckCircle2 size={18}/> {f}</li>)}
              </ul>
              <button onClick={() => navigate('/login')} className={`w-full py-4 rounded-xl font-black transition-all ${p.active ? 'bg-white text-blue-600 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>
                Book Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROFESSIONAL FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-blue-500" size={32} />
              <h2 className="text-3xl font-black tracking-tight">MediVerse</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-sm font-medium mb-8 leading-relaxed">
              Providing world-class healthcare with a digital-first approach. Your recovery is our mission.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-blue-500">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              {['Home', 'About', 'Doctors', 'Services', 'Pricing'].map(link => (
                <li key={link}>
                  <button onClick={() => scrollToSection(link.toLowerCase())} className="hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-blue-500">Contact</h4>
            <div className="space-y-4 text-slate-400 font-bold">
              <p className="flex items-center gap-3"><MapPin size={18}/> Indore, India</p>
              <p className="flex items-center gap-3"><Phone size={18}/> +91 731 284 2234</p>
              <p className="flex items-center gap-3"><Mail size={18}/> care@mediverse.com</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-slate-500 font-bold text-sm">
          © 2026 MediVerse Health Systems. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
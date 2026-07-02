import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Ticket, Code, Server, Cloud, Award, Download, X } from 'lucide-react';
import { visitConfig } from '../config';
import { sanityClient, urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Clock,
  Calendar,
  Ticket,
  Code,
  Server,
  Cloud,
  Award,
};

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  iconName: string;
  image?: any;
}

const CertificateCard = ({ cert }: { cert: Certificate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const IconComponent = iconMap[cert.iconName] || Award;
  
  // Check if description is long enough to need truncation
  const needsTruncation = cert.description && cert.description.length > 100;

  return (
    <>
      <div 
        className="info-card p-8 border border-white/10 hover:border-white/20 transition-colors flex flex-col h-full cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-3 mb-3">
          <IconComponent className="w-6 h-6 text-white/50 flex-shrink-0" strokeWidth={1.5} />
          <h3 className="museo-headline text-white text-xl group-hover:text-white/90 transition-colors leading-tight">{cert.title}</h3>
        </div>
        {cert.issuer && <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>}
        
        {cert.description && (
          <div className="mt-3 mb-6 flex-grow flex flex-col items-start">
            <div
              className={`museo-body text-white/60 text-sm line-clamp-2`}
              dangerouslySetInnerHTML={{ __html: cert.description }}
            />
            {needsTruncation && (
              <span className="text-white/80 group-hover:text-white text-xs mt-3 underline underline-offset-4 transition-colors">
                Read more
              </span>
            )}
          </div>
        )}
        
        {/* Certificate Image Thumbnail */}
        {cert.image && (
          <div className="mt-auto pt-4 overflow-hidden rounded relative">
            <img 
              src={urlFor(cert.image).width(400).url()} 
              alt={cert.title}
              className="w-full h-24 sm:h-32 object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded border border-white/5"
            />
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md" 
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-[#111] border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:right-6 z-10 p-2 bg-black/40 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30 backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Image */}
            <div className="w-full md:w-3/5 bg-black/60 p-4 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative group/image">
              {cert.image ? (
                <img 
                  src={urlFor(cert.image).width(1200).url()} 
                  alt={cert.title}
                  className="w-full h-auto max-h-[70vh] md:max-h-[85vh] object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center text-white/30">
                  <IconComponent className="w-16 h-16 mb-4 opacity-50" strokeWidth={1} />
                  <span className="museo-label">No certificate image provided</span>
                </div>
              )}
            </div>

            {/* Right side: Details */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col max-h-[60vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#111] to-[#0a0a0a]">
              <IconComponent className="w-8 h-8 text-white/30 mb-6" strokeWidth={1.5} />
              <h3 className="museo-headline text-white text-2xl md:text-3xl mb-4 leading-tight">{cert.title}</h3>
              
              {cert.issuer && (
                <div className="flex items-center gap-2 mb-8 flex-wrap">
                  <span className="text-white/90 text-sm font-medium tracking-wide">{cert.issuer}</span>
                  {cert.date && (
                    <>
                      <span className="text-white/30">•</span>
                      <span className="text-white/50 text-sm">{cert.date}</span>
                    </>
                  )}
                </div>
              )}
              
              {cert.description && (
                <div
                  className="museo-body text-white/70 text-base leading-relaxed prose prose-invert prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: cert.description }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Visit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllCertsModalOpen, setIsAllCertsModalOpen] = useState(false);

  // Fetch certificates from Sanity
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // Query to fetch all certificates
        const query = '*[_type == "certificate"]';
        const data: Certificate[] = await sanityClient.fetch(query);
        
        // Sort by date descending (latest first). 
        // We do this in JS to properly handle string dates like "Jun 2026"
        const sortedData = data.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          
          const timeA = new Date(a.date).getTime();
          const timeB = new Date(b.date).getTime();
          
          // If the string is a valid date (e.g. "Jun 2026" or "2026"), sort by time
          if (!isNaN(timeA) && !isNaN(timeB)) {
            return timeB - timeA;
          }
          
          // Fallback to alphabetical sort if it's an unparseable string
          return b.date.localeCompare(a.date);
        });

        setCertificates(sortedData);
      } catch (error) {
        console.error("Failed to fetch certificates from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only attempt fetch if the Project ID is set
    if (sanityClient.config().projectId !== 'YOUR_PROJECT_ID') {
      fetchCertificates();
    } else {
      setIsLoading(false); // Stop loading if no project ID is provided yet
    }
  }, []);

  // Initialize animations once data is loaded
  useEffect(() => {
    if (isLoading) return;
    
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [isLoading, certificates]);

  if (!visitConfig.headline && certificates.length === 0 && !isLoading) return null;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <p className="museo-label text-white/50 mb-4">{visitConfig.label}</p>
        <h2
          className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-8"
          dangerouslySetInnerHTML={{ __html: visitConfig.headline }}
        />
        <p className="museo-body text-white/60 text-lg max-w-2xl">
          {visitConfig.description}
        </p>
      </div>

      {/* Info Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {isLoading ? (
          // Loading Skeletons
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-8 border border-white/5 animate-pulse bg-white/5 h-48 rounded-sm"></div>
          ))
        ) : certificates.length > 0 ? (
          certificates.slice(0, 4).map((cert) => (
            <CertificateCard key={cert._id} cert={cert} />
          ))
        ) : (
          <div className="col-span-full p-8 border border-white/10 text-white/50 text-center">
            {sanityClient.config().projectId === 'YOUR_PROJECT_ID' 
              ? 'Sanity CMS is not yet configured. Please connect your Project ID.' 
              : 'No certificates found. Add some in your Sanity Studio!'}
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      {(visitConfig.ctaText || certificates.length > 4) && (
        <div className="max-w-7xl mx-auto mt-16 flex flex-wrap justify-center gap-6">
          {certificates.length > 4 && (
            <button
              onClick={() => setIsAllCertsModalOpen(true)}
              data-cursor="hover"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white museo-label hover:bg-white/5 transition-colors"
            >
              See all certificates
            </button>
          )}

          {visitConfig.ctaText && (
            <a
              href="/Devv_CV.pdf"
              download="Devv_CV.pdf"
              data-cursor="hover"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-colors"
            >
              <Download className="w-5 h-5" />
              {visitConfig.ctaText}
            </a>
          )}
        </div>
      )}

      {/* All Certificates Modal Overlay */}
      {isAllCertsModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md overflow-hidden" 
          onClick={() => setIsAllCertsModalOpen(false)}
        >
          <div 
            className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden w-full max-w-7xl relative shadow-[0_0_50px_rgba(0,0,0,0.5)] h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] z-10 shrink-0">
              <div>
                <h2 className="museo-headline text-white text-3xl">All Certificates</h2>
                <p className="museo-body text-white/50 text-sm mt-2">Showing all {certificates.length} certificates</p>
              </div>
              <button 
                onClick={() => setIsAllCertsModalOpen(false)}
                className="p-2 bg-black/40 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Grid */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {certificates.map((cert) => (
                  <CertificateCard key={cert._id} cert={cert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Visit;

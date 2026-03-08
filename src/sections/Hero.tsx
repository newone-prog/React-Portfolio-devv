import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const mobileContent = mobileContentRef.current;
    const nav = navRef.current;
    const bottom = bottomRef.current;

    if (!section || !leftText || !rightText || !mobileContent || !nav || !bottom) return;

    // Set initial states
    gsap.set([leftText, rightText, mobileContent], { opacity: 0, y: 60 });
    gsap.set(nav, { opacity: 0, y: -20 });
    gsap.set(bottom, { opacity: 0 });

    // Entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.3,
    });

    tl.to([leftText, mobileContent], { opacity: 1, y: 0, duration: 1 })
      .to(rightText, { opacity: 1, y: 0, duration: 1 }, '-=0.85')
      .to(nav, { opacity: 1, y: 0, duration: 0.7 }, '-=0.7')
      .to(bottom, { opacity: 1, duration: 0.5 }, '-=0.3');

    // Scroll parallax — statue moves slower, text drifts outward
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(leftText, { y: p * 200, x: p * -60 });
        gsap.set(rightText, { y: p * 180, x: p * 60 });
        gsap.set(mobileContent, { y: p * 180 });
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#8c8c91]"
    >
      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 px-4 md:px-8 lg:px-16 py-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 will-change-transform"
      >
        <div className="museo-label text-white text-[13px] tracking-widest uppercase md:normal-case md:text-base md:text-white/70">{heroConfig.brandLeft} {heroConfig.brandRight}</div>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-8 mt-2 md:mt-0">
          {heroConfig.navLinks.map((link, i) => (
            <a key={i} href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="museo-label text-white md:text-white/70 hover:text-white transition-colors uppercase md:normal-case text-[9px] sm:text-[10px] md:text-base md:tracking-normal">{link.label}</a>
          ))}
        </div>
      </nav>

      {/* Main hero content - Mobile */}
      <div
        ref={mobileContentRef}
        className="md:hidden relative z-10 flex flex-col items-center justify-center h-full px-6 text-center will-change-transform gap-1 pb-16 pt-16"
      >
        <h1 className="museo-headline text-white text-[14vw] leading-[1]">
          {heroConfig.brandLeft.toUpperCase()}
        </h1>
        <h1 className="museo-headline text-white text-[14vw] leading-[1]">
          {heroConfig.brandRight.toUpperCase()}
        </h1>
        <p className="museo-label text-white text-[12px] uppercase mt-5 tracking-[0.2em]">
          {heroConfig.since.toUpperCase()}
        </p>
        <p className="museo-body text-white text-[13px] tracking-wide mt-2 leading-[1.6]">
          {heroConfig.tagline.split(' & ')[0]} &<br />
          {heroConfig.tagline.split(' & ')[1]}
        </p>
        {heroConfig.email && (
          <a
            href={`mailto:${heroConfig.email.replace(/[\[\]]/g, '')}`}
            className="museo-label text-white text-[13px] uppercase mt-3 tracking-[0.05em]"
          >
            {heroConfig.email.toUpperCase()}
          </a>
        )}
        <div className="flex items-center gap-3 mt-5">
          {heroConfig.socialLinks.map((link, i) => (
            <a key={i} href={link.href} className="museo-label text-white hover:text-white/80 transition-colors text-[13px] uppercase tracking-[0.05em]">
              {link.label.toUpperCase() === 'LINKEDIN' ? 'LINKDIN' : link.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Main hero content - Desktop */}
      <div className="hidden md:flex relative z-10 flex-col justify-center h-full px-12 w-full pt-0">
        <div className="flex flex-row items-start w-full gap-0">
          {/* Left text block */}
          <div
            ref={leftTextRef}
            className="flex flex-col items-end text-right flex-1 pr-6 lg:pr-12 will-change-transform"
          >
            <h1 className="museo-headline text-white text-[9vw] lg:text-[7vw] leading-[0.85]">
              {heroConfig.brandLeft}
            </h1>
            <p className="museo-body text-white/60 text-base max-w-[240px] mt-6">
              {heroConfig.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {heroConfig.socialLinks.map((link, i) => (
                <a key={i} href={link.href} className="museo-label text-white/40 hover:text-white transition-colors text-[10px]" data-cursor="hover">{link.label}</a>
              ))}
            </div>
          </div>

          {/* Right text block */}
          <div
            ref={rightTextRef}
            className="flex flex-col items-start text-left flex-1 pl-6 lg:pl-12 will-change-transform"
          >
            <h1 className="museo-headline text-white text-[9vw] lg:text-[7vw] leading-[0.85]">
              {heroConfig.brandRight}
            </h1>
            <p className="museo-label text-white/40 mt-6 text-[10px]">{heroConfig.since}</p>
            {heroConfig.email && (
              <a
                href={`mailto:${heroConfig.email.replace(/[\[\]]/g, '')}`}
                className="museo-label text-white/40 hover:text-white transition-colors text-[10px] mt-4"
                data-cursor="hover"
              >
                {heroConfig.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full z-20 px-8 lg:px-16 py-5 flex items-center justify-between border-t border-white/10"
      >
        <p className="museo-label text-white/30 text-[10px]">{heroConfig.scrollText}</p>
        <p className="museo-label text-white/30 text-[10px]">{heroConfig.copyrightText}</p>
      </div>
    </section >
  );
};

export default Hero;

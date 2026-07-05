import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { ArrowUpRight } from 'lucide-react';
import useLenis from '../hooks/useLenis';
import useCustomCursor from '../hooks/useCustomCursor';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize smooth scroll & custom cursor for this route
    useLenis();
    useCustomCursor();

    useEffect(() => {
        // Basic document setup
        document.title = "Contact | Devansh Mehrotra";
        gsap.set('body', { backgroundColor: '#000000' });

        const container = containerRef.current;
        if (!container) return;

        // Entrance Animation
        const elements = container.querySelectorAll('.reveal-contact');
        gsap.set(elements, { opacity: 0, y: 40 });

        gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
        });

        return () => {
            gsap.killTweensOf(elements);
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-black text-[#ff4d2e] px-8 lg:px-16 py-16 lg:py-24 font-sans select-none overflow-x-hidden">
            {/* Back Button */}
            <a
                href="/"
                data-cursor="hover"
                className="reveal-contact fixed top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-50 text-sm font-medium tracking-widest uppercase"
            >
                <ArrowUpRight className="w-4 h-4 rotate-[-135deg]" />
                Back Home
            </a>

            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center min-h-[80vh]">
                <form
                    action="mailto:devanshmehrotra2190@gmail.com"
                    method="post"
                    encType="text/plain"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-16 lg:pt-0 w-full"
                >
                    {/* Left Column - Headers and Fields */}
                    <div className="flex flex-col gap-12 w-full">
                        <h1 className="reveal-contact text-5xl md:text-6xl lg:text-7xl font-[900] uppercase leading-[0.9] tracking-tighter">
                            DEVANSH<br />MEHROTRA
                        </h1>

                        <div className="flex flex-col gap-10 w-full max-w-md lg:mt-4">
                            {/* Name Field */}
                            <div className="reveal-contact flex flex-col gap-3">
                                <label htmlFor="name" className="text-xl md:text-2xl font-[900] uppercase tracking-wide">
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full h-12 bg-[#4a4a4a] border-none outline-none px-4 text-white text-lg focus:ring-2 focus:ring-[#ff4d2e]/50 transition-all font-sans"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="reveal-contact flex flex-col gap-3">
                                <label htmlFor="email" className="text-xl md:text-2xl font-[900] uppercase tracking-wide">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full h-12 bg-[#4a4a4a] border-none outline-none px-4 text-white text-lg focus:ring-2 focus:ring-[#ff4d2e]/50 transition-all font-sans"
                                    required
                                />
                            </div>

                            {/* Subject Field */}
                            <div className="reveal-contact flex flex-col gap-3">
                                <label htmlFor="subject" className="text-xl md:text-2xl font-[900] uppercase tracking-wide">
                                    SUBJECT
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full h-12 bg-[#4a4a4a] border-none outline-none px-4 text-white text-lg focus:ring-2 focus:ring-[#ff4d2e]/50 transition-all font-sans"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-12 w-full lg:pt-2 h-full justify-between">
                        <h1 className="reveal-contact text-5xl md:text-6xl lg:text-7xl font-[900] uppercase leading-[0.9] tracking-tighter text-left lg:text-right">
                            CONTACT
                        </h1>

                        <div className="flex flex-col h-full lg:mt-4">
                            <div className="reveal-contact flex flex-col gap-3 flex-grow">
                                <label htmlFor="body" className="text-xl md:text-2xl font-[900] uppercase tracking-wide text-left">
                                    SEND TEXT
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    className="w-full h-48 lg:h-full min-h-[200px] bg-[#4a4a4a] border-none outline-none p-4 text-white text-lg resize-none focus:ring-2 focus:ring-[#ff4d2e]/50 transition-all font-sans"
                                    required
                                ></textarea>
                            </div>

                            <div className="reveal-contact flex items-center justify-end gap-4 mt-12 w-full lg:pr-12 pb-8 lg:pb-0">
                                <button
                                    type="submit"
                                    data-cursor="hover"
                                    className="text-2xl md:text-3xl font-[900] uppercase tracking-wide hover:text-white transition-colors"
                                >
                                    SEND
                                </button>
                                <div className="w-5 h-5 rounded-full bg-[#00d8b4] shadow-[0_0_15px_rgba(0,216,180,0.4)]"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Vercel Web Analytics */}
            <Analytics />
        </div>
    );
};

export default Contact;

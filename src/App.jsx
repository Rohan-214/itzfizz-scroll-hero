import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Car from './components/Car.jsx';
import StatCard from './components/StatCard.jsx';
import { stats } from './data/stats.js';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const headline = 'WELCOME ITZFIZZ';

export default function App() {
  const root = useRef(null);
  const section = useRef(null);
  const stage = useRef(null);
  const car = useRef(null);
  const trail = useRef(null);
  const letters = useRef([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const letterEls = letters.current.filter(Boolean);
    const statEls = gsap.utils.toArray('.stat-card', root.current);

    // Gentle entrance: the scroll sequence itself does not autoplay.
    gsap.fromTo('.eyebrow, .brand, .top-note',
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.1 },
    );
    gsap.fromTo('.scroll-cue',
      { y: 8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.8, ease: 'power2.out' },
    );
    gsap.fromTo(car.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power2.out' },
    );
    // Metric cards have a restrained one-by-one entrance on load. Their content remains
    // readable while the main car/headline interaction continues to follow scroll.
    gsap.fromTo(statEls,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12, delay: 0.45, ease: 'power2.out' },
    );

    if (prefersReducedMotion) {
      gsap.set(letterEls, { autoAlpha: 1, color: '#f2f3ed' });
      gsap.set(statEls, { autoAlpha: 1, y: 0 });
      gsap.set(trail.current, { scaleX: 1, transformOrigin: 'left center' });
      return;
    }

    // The sticky stage stays in view while the user scrolls through the long section.
    // Scrub ties the car's position to scroll progress instead of running a timed animation.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.65,
        pin: stage.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    });

    timeline.fromTo(car.current,
      { x: 0, rotate: -1.5 },
      { x: () => window.innerWidth - car.current.getBoundingClientRect().width - window.innerWidth * 0.04, rotate: 1.5, ease: 'none', duration: 1 },
      0,
    );
    timeline.fromTo(trail.current,
      { scaleX: 0.03 },
      { scaleX: 1, ease: 'none', transformOrigin: 'left center', duration: 1 },
      0,
    );

    // Each letter is revealed in sequence as the car travels along the road.
    letterEls.forEach((letter, index) => {
      const progress = 0.08 + (index / Math.max(letterEls.length - 1, 1)) * 0.79;
      timeline.to(letter, {
        autoAlpha: 1,
        color: '#f2f3ed',
        duration: 0.025,
        ease: 'none',
      }, progress);
    });

    return () => timeline.scrollTrigger?.kill();
  }, { scope: root, dependencies: [] });

  return (
    <main ref={root} className="site-shell">
      <section ref={section} className="hero-scroll-section" aria-label="ITZFIZZ scroll animation">
        <div ref={stage} className="hero-stage">
          <header className="site-header">
            <a className="brand" href="#home" aria-label="ITZFIZZ home">
              <span className="brand-mark">i<span>f</span></span>
              <span className="brand-name">ITZFIZZ<span className="brand-period">.</span></span>
            </a>
            <div className="top-note font-mono">MOTION THAT MOVES YOU <span>↗</span></div>
            <div className="header-index font-mono">EXPERIENCE / 001</div>
          </header>

          <div id="home" className="hero-copy">
            <p className="eyebrow font-mono"><span className="live-dot" /> THE FUTURE IS IN MOTION</p>
            <h1 className="hero-title" aria-label="Welcome ITZFIZZ">
              {headline.split('').map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  ref={(element) => { letters.current[index] = element; }}
                  className={`hero-letter ${char === ' ' ? 'hero-letter--space' : ''}`}
                  aria-hidden="true"
                >{char === ' ' ? '\u00a0' : char}</span>
              ))}
            </h1>
            <p className="hero-subtitle">We don't follow the road.<br className="mobile-break" /> We make every mile matter.</p>
          </div>

          <div className="stat-layer" aria-label="Impact statistics">
            {stats.map((stat, index) => <StatCard key={stat.title} stat={stat} index={index} />)}
          </div>

          <div className="road-band" aria-hidden="true">
            <div className="road-grid" />
            <div className="road-centerline" />
            <div ref={trail} className="road-trail" />
            <div className="road-start-mark" />
            <div className="road-end-mark" />
            <div ref={car} className="car-wrap"><Car /></div>
          </div>

          <div className="stage-footer">
            <span className="font-mono footer-caption">DESIGNED TO KEEP YOU MOVING</span>
            <span className="font-mono scroll-cue"><span className="scroll-cue__line" /> SCROLL TO DRIVE</span>
            <span className="font-mono footer-count">01 — 04</span>
          </div>
          <div className="corner-cross corner-cross--left" aria-hidden="true">+</div>
          <div className="corner-cross corner-cross--right" aria-hidden="true">+</div>
        </div>
      </section>
      <footer className="page-end">
        <span className="font-mono">YOU'VE REACHED THE FINISH LINE.</span>
        <a href="#home">BACK TO START ↑</a>
      </footer>
    </main>
  );
}

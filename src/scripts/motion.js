/**
 * Motion layer — progressive enhancement only.
 * The page is fully readable without any of this.
 * GSAP ScrollTrigger + Lenis + a lerped trailing cursor.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const NAV_OFFSET = 80;

/* ---- trailing cursor dot ---- */
if (finePointer && !reduced) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  let mx = -100;
  let my = -100;
  let cx = -100;
  let cy = -100;
  let shown = false;
  let raf = 0;

  const loop = () => {
    if (document.visibilityState === 'hidden') {
      raf = 0;
      return;
    }
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    dot.style.left = `${cx}px`;
    dot.style.top = `${cy}px`;
    raf = requestAnimationFrame(loop);
  };

  const ensureLoop = () => {
    if (!raf && document.visibilityState !== 'hidden') raf = requestAnimationFrame(loop);
  };

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!shown) {
      dot.style.opacity = '1';
      shown = true;
    }
    ensureLoop();
  });
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    shown = false;
  });
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    dot.classList.toggle('big', !!target.closest('a, button, input, textarea'));
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else if (shown) {
      ensureLoop();
    }
  });
}

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gs');

  /* ---- Lenis smooth scroll, wired to ScrollTrigger ---- */
  let lenis;
  try {
    lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      anchors: { offset: NAV_OFFSET },
    });
    document.documentElement.classList.add('lenis');
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } catch {
    /* native scroll fallback */
  }

  /* ---- layered hero parallax ---- */
  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.l-clouds-back', { xPercent: -8, ease: 'none', scrollTrigger: heroST });
  gsap.to('.l-clouds-front', { xPercent: -19, ease: 'none', scrollTrigger: heroST });
  gsap.to('.l-ridge', {
    yPercent: -9,
    scale: 1.1,
    transformOrigin: '50% 100%',
    ease: 'none',
    scrollTrigger: heroST,
  });
  // Keep headline readable — fade only slightly while drifting up
  gsap.to('[data-hero]', {
    yPercent: -30,
    opacity: 0.45,
    ease: 'none',
    scrollTrigger: heroST,
  });
  gsap.to('.hero-eyebrow, .hero-foot', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '42% top', scrub: true },
  });

  /* ---- stats parallax drift ---- */
  gsap.utils.toArray('.stat').forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: i % 2 ? 90 : 40 },
      {
        y: i % 2 ? 10 : -20,
        ease: 'none',
        scrollTrigger: { trigger: '.stats', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* ---- stats numerals: dim until scrolled into focus, then full red ---- */
  gsap.utils.toArray('.stat .num').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0.28 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'top 42%', scrub: true },
      },
    );
  });

  /* ---- showcase: persistent slabs that morph between scenes ---- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 881px)', () => {
    const stage = document.querySelector('[data-stage]');
    if (!(stage instanceof HTMLElement)) return;

    const scenes = gsap.utils.toArray('[data-scene]');
    const railBtns = gsap.utils.toArray('.rail button');
    const liveRegion = document.querySelector('[data-scene-live]');
    const created = [];

    const mkSlab = () => {
      const d = document.createElement('div');
      d.className = 'mslab';
      stage.appendChild(d);
      created.push(d);
      return d;
    };
    const A = mkSlab();
    const B = mkSlab();

    const S = [
      {
        a: {
          top: '38%',
          xPercent: -64,
          yPercent: -50,
          width: '30vw',
          height: '10vw',
          rotation: 0,
          borderRadius: '0vw',
          clipPath: 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)',
        },
        b: {
          top: '58%',
          xPercent: -28,
          yPercent: -50,
          width: '24vw',
          height: '10vw',
          rotation: 0,
          borderRadius: '0vw',
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        },
      },
      {
        a: {
          top: '42%',
          xPercent: -115,
          yPercent: -50,
          width: '15vw',
          height: '15vw',
          rotation: 0,
          borderRadius: '15vw',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
        b: {
          top: '56%',
          xPercent: -8,
          yPercent: -38,
          width: '26vw',
          height: '11vw',
          rotation: -8,
          borderRadius: '0.4vw',
          clipPath: 'polygon(3% 0%, 100% 6%, 97% 100%, 0% 94%)',
        },
      },
      {
        a: {
          top: '33%',
          xPercent: -50,
          yPercent: -50,
          width: '31vw',
          height: '9vw',
          rotation: 4,
          borderRadius: '0vw',
          clipPath: 'polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)',
        },
        b: {
          top: '67%',
          xPercent: -50,
          yPercent: -50,
          width: '31vw',
          height: '9vw',
          rotation: -3,
          borderRadius: '0vw',
          clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
        },
      },
      {
        a: {
          top: '44%',
          xPercent: -96,
          yPercent: -40,
          width: '22vw',
          height: '11vw',
          rotation: -3,
          borderRadius: '0vw',
          clipPath: 'polygon(0% 0%, 100% 0%, 84% 100%, 16% 100%)',
        },
        b: {
          top: '52%',
          xPercent: 4,
          yPercent: -60,
          width: '19vw',
          height: '12vw',
          rotation: 6,
          borderRadius: '1.6vw',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
      },
      {
        a: {
          top: '40%',
          xPercent: -85,
          yPercent: -55,
          width: '17vw',
          height: '20vw',
          rotation: 0,
          borderRadius: '8vw 8vw 0 0',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
        b: {
          top: '58%',
          xPercent: 2,
          yPercent: -14,
          width: '27vw',
          height: '10vw',
          rotation: -4,
          borderRadius: '0vw',
          clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
        },
      },
    ];

    gsap.set(A, { ...S[0].a, scale: 1.4, rotation: (S[0].a.rotation || 0) - 16 });
    gsap.set(B, { ...S[0].b, scale: 1.4, rotation: (S[0].b.rotation || 0) + 16 });
    gsap.set([A, B], { transformOrigin: '50% 50%' });

    const contentFade = (s) => s.querySelectorAll('.ghost, .bot');
    const contentShift = (s) => s.querySelectorAll('.scene-apps, .scene-data');
    scenes.forEach((s, i) => {
      if (i > 0) {
        gsap.set(contentFade(s), { opacity: 0 });
        gsap.set(contentShift(s), { opacity: 0, y: 26 });
      }
    });
    scenes[0]?.classList.add('live');

    const setActiveScene = (idx) => {
      railBtns.forEach((b, k) => {
        const on = k === idx;
        b.classList.toggle('on', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      scenes.forEach((s, k) => s.classList.toggle('live', k === idx));
      const activeBtn = railBtns[idx];
      if (liveRegion && activeBtn) {
        liveRegion.textContent = `Showing ${activeBtn.textContent?.trim() ?? ''}`;
      }
    };
    setActiveScene(0);

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    tl.to(A, { ...S[0].a, scale: 1, rotation: S[0].a.rotation || 0, duration: 0.16 }, 0).to(
      B,
      { ...S[0].b, scale: 1, rotation: S[0].b.rotation || 0, duration: 0.16 },
      0,
    );

    for (let i = 1; i < scenes.length; i++) {
      tl.to(A, { duration: 0.75, scale: 1.05, ...S[i].a }, i - 0.55)
        .to(A, { duration: 0.2, scale: 1 }, i - 0.55 + 0.75)
        .to(B, { duration: 0.75, scale: 1.05, ...S[i].b }, i - 0.55)
        .to(B, { duration: 0.2, scale: 1 }, i - 0.55 + 0.75)
        .to(contentFade(scenes[i - 1]), { opacity: 0, duration: 0.4, stagger: 0.025 }, i - 0.55)
        .to(contentShift(scenes[i - 1]), { opacity: 0, y: -24, duration: 0.4, stagger: 0.025 }, i - 0.55)
        .to(contentFade(scenes[i]), { opacity: 1, duration: 0.5, stagger: 0.06 }, i - 0.15)
        .to(contentShift(scenes[i]), { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, i - 0.15);
    }
    tl.to({}, { duration: 0.5 });

    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: `+=${scenes.length * 160}%`,
      pin: true,
      scrub: 0.9,
      animation: tl,
      onUpdate(self) {
        const idx = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
        setActiveScene(idx);
      },
    });

    const onRailClick = (b) => {
      const frac = (parseInt(b.dataset.go, 10) + 0.5) / scenes.length;
      const y = st.start + (st.end - st.start) * frac;
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    };

    railBtns.forEach((b) => {
      b.addEventListener('click', () => onRailClick(b));
    });

    // Cleanup when dropping below desktop breakpoint
    return () => {
      st.kill();
      tl.kill();
      created.forEach((el) => el.remove());
      scenes.forEach((s) => {
        s.classList.remove('live');
        gsap.set(contentFade(s), { clearProps: 'opacity' });
        gsap.set(contentShift(s), { clearProps: 'opacity,y' });
      });
      railBtns.forEach((b) => {
        b.classList.remove('on');
        b.removeAttribute('aria-selected');
        b.tabIndex = 0;
      });
    };
  });

  /* ---- editorial reveals: transform only, content stays visible ---- */
  gsap.utils
    .toArray('.statement h2, .about-cols > *, .row, .xp, .m-item, .pull, .contact h2, .contact-grid > *')
    .forEach((el) => {
      gsap.from(el, {
        y: 34,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      });
    });
}

/// approch section code  start // */


// Image URLs
    const approachSlides = [
      "https://images.unsplash.com/photo-1649443992089-8bf1fc3c42f4?q=80&w=1170&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1723672927511-03f69242a054?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=600&auto=format&fit=crop&q=60"
    ];

    let approachCurrentSlide = 0;
    const approachSlideEl = document.getElementById('approach-slide');
    const approachDots = document.querySelectorAll('.approach-dot');

    function showApproachSlide(index) {
      approachSlideEl.style.backgroundImage = `url('${approachSlides[index]}')`;
      approachDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextApproachSlide() {
      approachCurrentSlide = (approachCurrentSlide + 1) % approachSlides.length;
      showApproachSlide(approachCurrentSlide);
    }

    // Auto Slide
    let approachAutoSlide = setInterval(nextApproachSlide, 3000);
    let approachIsPlaying = true;

    const playPauseBtn = document.getElementById('approachPlayPauseBtn');
    const playIcon = document.getElementById('approachPlayIcon');
    const pauseIcon = document.getElementById('approachPauseIcon');

    playPauseBtn.addEventListener('click', () => {
      if (approachIsPlaying) {
        clearInterval(approachAutoSlide);
        approachIsPlaying = false;
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      } else {
        approachAutoSlide = setInterval(nextApproachSlide, 3000);
        approachIsPlaying = true;
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }
    });

    // Init
    showApproachSlide(approachCurrentSlide);

    /// approach section code  end // */


    /// header code start///

     // Scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile toggle
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');

    menuBtn.addEventListener('click', () => {
      mobileOverlay.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
      mobileOverlay.classList.remove('open');
    });


    /// header code end///

    /* /// according images changing section // */


     const accordionItems = document.querySelectorAll('.accordion-progress-item');
  const accordionBg = document.getElementById('accordion-progress-bg');
  const accordionImages = {
    'why-clients': 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800',
    'strategy-project': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    'talk-strategy': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
  };

  let accordionIndex = 0;
  let accordionTimer;
  const accordionDuration = 4000;

  function activateAccordionItem(index){
    accordionItems.forEach(item=>{
      item.classList.remove('active');
      const line = item.querySelector('.accordion-progress-line');
      line.style.transition = 'none';
      line.style.width = '0';
    });

    const current = accordionItems[index];
    current.classList.add('active');
    const target = current.getAttribute('data-target');
    accordionBg.style.backgroundImage = `url('${accordionImages[target]}')`;

    const line = current.querySelector('.accordion-progress-line');
    void line.offsetWidth;
    line.style.transition = `width ${accordionDuration}ms linear`;
    line.style.width = '100%';

    clearTimeout(accordionTimer);
    accordionTimer = setTimeout(()=>{
      accordionIndex = (index+1) % accordionItems.length;
      activateAccordionItem(accordionIndex);
    }, accordionDuration);
  }

  accordionItems.forEach((item,i)=>{
    item.querySelector('.accordion-progress-header').addEventListener('click', ()=>{
      if(item.classList.contains('active')) return;
      accordionIndex = i;
      activateAccordionItem(i);
    });
  });

  activateAccordionItem(0);


  //// service section code start ///

   function showService(index) {
    document.querySelectorAll('#services-section .tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    document.querySelectorAll('#services-section .service-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  //// service section code end ///

///  testimonail code//

  // JavaScript for sliding functionality
        function slideTestimonials(direction) {
            const slider = document.querySelector('.testimonials-section-klm');
            const cardWidth = document.querySelector('.testimonial-card-nop').offsetWidth + 20;
            const visibleWidth = slider.offsetWidth;
            const maxScroll = slider.scrollWidth - visibleWidth;
            let currentScroll = slider.scrollLeft;

            let cardsToShow = 3;
            if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                cardsToShow = 2;
            } else if (window.innerWidth <= 768) {
                cardsToShow = 1;
            }

            const scrollAmount = cardWidth * cardsToShow;

            if (direction === 'next') {
                currentScroll += scrollAmount;
                if (currentScroll > maxScroll) {
                    currentScroll = 0;
                }
            } else {
                currentScroll -= scrollAmount;
                if (currentScroll < 0) {
                    currentScroll = maxScroll;
                }
            }

            slider.scrollTo({
                left: currentScroll,
                behavior: 'smooth'
            });
        }



  //text animation code//

  (function () {
  const GSAP_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

  // Load GSAP if it's not already loaded
  function loadGsap(cb) {
    if (window.gsap) return cb();
    const s = document.createElement('script');
    s.src = GSAP_CDN;
    s.onload = cb;
    s.onerror = () => { console.error('Failed to load GSAP'); cb(); };
    document.head.appendChild(s);
  }

  // Replace text nodes inside an element with span-per-character
  function splitTextToChars(rootEl) {
    if (!rootEl || rootEl.dataset.gsapSplit === '1') return;
    // Walk text nodes inside the element (keeps element structure like <br>, <span> etc.)
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      // skip empty/whitespace-only nodes
      if (node.nodeValue && node.nodeValue.trim().length > 0) nodes.push(node);
    }

    nodes.forEach(textNode => {
      const parent = textNode.parentNode;
      const frag = document.createDocumentFragment();
      // split into characters and wrap each into span.gsap-char
      textNode.nodeValue.split('').forEach(ch => {
        const span = document.createElement('span');
        span.className = 'gsap-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        frag.appendChild(span);
      });
      parent.replaceChild(frag, textNode);
    });

    rootEl.dataset.gsapSplit = '1';
  }

  // Animate characters when element enters viewport
  function animateHeadingChars(el) {
    // avoid animating twice
    if (el.dataset.gsapAnimated === '1') return;
    el.dataset.gsapAnimated = '1';
    const chars = el.querySelectorAll('.gsap-char');
    if (!chars.length) return;
    // animate using GSAP (y -> 0, opacity -> 1)
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.63,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      overwrite: true
    });
  }

  // Main init: split headings and set up observer
  function init() {
    const headings = Array.from(document.querySelectorAll('h1,h2'));
    if (!headings.length) return;

    headings.forEach(h => {
      splitTextToChars(h);
    });

    // IntersectionObserver to animate when in view
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateHeadingChars(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    headings.forEach(h => {
      // if heading is already in view, animate immediately
      // (check bounding rect as backup for very large headings)
      const rect = h.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // small timeout so GSAP is ready
        requestAnimationFrame(() => animateHeadingChars(h));
      } else {
        io.observe(h);
      }
    });
  }

  // ensure DOM loaded before starting
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadGsap(init));
  } else {
    loadGsap(init);
  }
})();



/// reveal section code start///
  gsap.registerPlugin(ScrollTrigger, SplitText);

const heading = document.getElementById("animated-heading");
const split = new SplitText(heading, { type: "chars" });
const chars = split.chars;

// Set initial state: top-right (↘ direction)
gsap.set(chars, {
  xPercent: 100,
  yPercent: -100,
  rotate: 15,
  opacity: 0,
});

// Animate diagonally downward
gsap.to(chars, {
  xPercent: 0,
  yPercent: 0,
  rotate: 0,
  opacity: 1,
  ease: "back.out(2)",
  stagger: 0.15,
  scrollTrigger: {
    trigger: heading,
    start: "top 80%",
    end: "+=300",
    scrub: true,
    markers: false,
  },
});

// Horizontal scroll effect (unchanged)
gsap.fromTo(heading, {
  x: 100,
}, {
  x: -600,
  ease: "none",
  scrollTrigger: {
    trigger: heading,
    start: "top 80%",
    end: "+=1000",
    scrub: true,
  },
});

//// footer code start ////
 // Smooth underline animation with GSAP
  document.querySelectorAll(".footer-links a, .social-links a").forEach(link => {
    link.style.setProperty("--scale", 0);

    link.addEventListener("mouseenter", () => {
      gsap.to(link, { duration: 0.5, ease: "power3.out", "--scale": 1 });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, { duration: 0.5, ease: "power3.inOut", "--scale": 0 });
    });
  });

  // Accordion Toggle for Mobile
  document.querySelectorAll(".footer-heading").forEach(heading => {
    heading.addEventListener("click", () => {
      const target = heading.nextElementSibling;
      target.classList.toggle("open");
      heading.classList.toggle("active");
    });
  });


  /// footer code end ////
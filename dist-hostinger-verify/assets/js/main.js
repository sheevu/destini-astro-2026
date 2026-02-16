(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  const currentPage = document.body.getAttribute("data-page");
  if (currentPage) {
    const currentLink = document.querySelector(`.site-nav a[data-nav='${currentPage}']`);
    if (currentLink) {
      currentLink.classList.add("active");
    }
  }

  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const wrapper = button.closest(".faq-item");
      if (!wrapper) return;
      wrapper.classList.toggle("open");
      const expanded = wrapper.classList.contains("open");
      button.setAttribute("aria-expanded", String(expanded));
      const symbol = button.querySelector(".faq-symbol");
      if (symbol) {
        symbol.textContent = expanded ? "-" : "+";
      }
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("show");
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const topic = document.getElementById("topic").value;
      const message = document.getElementById("message").value.trim();

      const rawBody = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        "Topic: " + topic,
        "",
        "Message:",
        message
      ].join("\n");

      const subject = encodeURIComponent("Destini Numbers Inquiry - " + topic);
      const body = encodeURIComponent(rawBody);
      window.location.href = "mailto:destininumbers37@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  const hero = document.querySelector(".home-hero");
  if (hero && window.matchMedia("(min-width: 981px)").matches) {
    const parallaxTargets = hero.querySelectorAll("[data-parallax]");
    hero.addEventListener("mousemove", function (event) {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      parallaxTargets.forEach(function (target) {
        const depth = Number(target.getAttribute("data-parallax")) || 8;
        target.style.transform = "translate(" + x * depth + "px," + y * depth + "px)";
      });
    });
  }

  const chatbotWidget = document.getElementById("chatbot-widget");
  if (chatbotWidget) {
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const close = document.getElementById("chatbot-close");
    const quickButtons = chatbotWidget.querySelectorAll("[data-chatbot-intent]");
    const replyNode = document.getElementById("chatbot-reply");
    const openWhatsApp = document.getElementById("chatbot-open-whatsapp");
    const formLink = "https://forms.gle/34orCT2JitYgCnbM9";

    function respond(intent) {
      if (!replyNode) return;
      let message = "I can help with services, store items, report interpretation, and bookings.";
      if (intent === "services") {
        message = "For services: Career Alignment, Business Numerology, Personal Destiny Reading, and premium packages are available.";
      } else if (intent === "store") {
        message = "For store: crystals, gemstones, rudraksha (1-14 Mukhi), and puja kits are available with guidance.";
      } else if (intent === "reports") {
        message = "For reports: share your generated Life Path, Compatibility, or House Number result and get personalized guidance.";
      } else if (intent === "booking") {
        message = "For booking: you can connect on WhatsApp directly and select the best consultation format.";
      }

      replyNode.innerHTML =
        message +
        " For callback support, please fill this form: " +
        '<a class="chatbot-form-link" href="' +
        formLink +
        '" target="_blank" rel="noopener">Callback Form</a>.';

      if (openWhatsApp) {
        const text = encodeURIComponent(message + " I have also submitted the callback form.");
        openWhatsApp.href = "https://wa.me/917269031175?text=" + text;
      }
    }

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        const isHidden = panel.hasAttribute("hidden");
        if (isHidden) {
          panel.removeAttribute("hidden");
          toggle.setAttribute("aria-expanded", "true");
          respond("services");
        } else {
          panel.setAttribute("hidden", "");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (close && panel && toggle) {
      close.addEventListener("click", function () {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    }

    quickButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const intent = button.getAttribute("data-chatbot-intent");
        respond(intent);
      });
    });
  }

  const sliderPrevButtons = document.querySelectorAll("[data-slider-prev]");
  const sliderNextButtons = document.querySelectorAll("[data-slider-next]");

  function scrollSlider(targetId, direction) {
    const track = document.getElementById(targetId);
    if (!track) return;
    const firstCard = track.querySelector(".slider-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 14 : 300;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  sliderPrevButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-slider-prev");
      scrollSlider(targetId, -1);
    });
  });

  sliderNextButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-slider-next");
      scrollSlider(targetId, 1);
    });
  });

  const sliderTracks = document.querySelectorAll("[data-slider-track]");
  sliderTracks.forEach(function (track) {
    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        track.scrollBy({ left: 280, behavior: "smooth" });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        track.scrollBy({ left: -280, behavior: "smooth" });
      }
    });
  });
})();

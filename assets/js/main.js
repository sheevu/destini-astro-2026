(function () {
  function runWhenIdle(task) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(task, { timeout: 1200 });
    } else {
      window.setTimeout(task, 120);
    }
  }

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

  const moonSunPredictions = {
    Aries: {
      moon: "Calm emotional fire before impulsive leaps.",
      sun: "Lead with clarity and keep promises."
    },
    Taurus: {
      moon: "Honor comfort but stay open to new ideas.",
      sun: "Anchor resources and protect boundaries."
    },
    Gemini: {
      moon: "Share feelings; curiosity supports the people around you.",
      sun: "Clarify ideas before scattering energy."
    },
    Cancer: {
      moon: "Protect your circle and trust intuition.",
      sun: "Lay emotional foundations for steady impact."
    },
    Leo: {
      moon: "Balance stage energy with gentle listening.",
      sun: "Shine with generosity while honoring rest."
    },
    Virgo: {
      moon: "Organize feelings with supportive rituals.",
      sun: "Craft service with practical detail."
    },
    Libra: {
      moon: "Seek private harmony before public compromise.",
      sun: "Weigh partnerships using fairness."
    },
    Scorpio: {
      moon: "Transform emotions with gentle trust.",
      sun: "Channel intensity into purposeful commitments."
    },
    Sagittarius: {
      moon: "Match optimism with grounded wisdom.",
      sun: "Plan adventures with disciplined timing."
    },
    Capricorn: {
      moon: "Let vulnerability build steady trust.",
      sun: "Advance goals while honoring healthy limits."
    },
    Aquarius: {
      moon: "Share unusual ideas without losing your grounding.",
      sun: "Lead teams with innovation and empathy."
    },
    Pisces: {
      moon: "Honor dreams while listening to practical needs.",
      sun: "Serve others with compassion and clear boundaries."
    }
  };

  function formatMoonSunNotes() {
    const moonLines = [];
    const sunLines = [];
    Object.entries(moonSunPredictions).forEach(function ([sign, notes]) {
      moonLines.push(sign + ": " + notes.moon);
      sunLines.push(sign + ": " + notes.sun);
    });
    const html =
      "<strong>Moon Sign Notes</strong><br>" +
      moonLines.join("<br>") +
      "<br><strong>Sun Sign Notes</strong><br>" +
      sunLines.join("<br>");
    const text = "Moon signs: " + moonLines.join(" | ") + ". Sun signs: " + sunLines.join(" | ") + ".";
    return { html: html, text: text };
  }

  runWhenIdle(function () {
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
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const contactFormNote = document.getElementById("contact-form-note");

    function setContactNote(text, isError) {
      if (!contactFormNote) return;
      contactFormNote.textContent = text;
      contactFormNote.style.color = isError ? "#b42318" : "";
    }

    function openMailFallback(name, phone, email, topic, message) {
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
    }

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const topic = document.getElementById("topic").value;
      const message = document.getElementById("message").value.trim();
      const submitButton = contactForm.querySelector("button[type='submit']");
      const serviceIdField = document.getElementById("service-id");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }

      const payload = {
        name: name,
        phone: phone,
        email: email,
        topic: topic,
        message: message
      };

      if (serviceIdField && serviceIdField.value) {
        const numericServiceId = Number(serviceIdField.value);
        if (!Number.isNaN(numericServiceId) && numericServiceId > 0) {
          payload.service_id = numericServiceId;
        }
      }

      try {
        const response = await fetch("api/submit-contact.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || "Unable to submit inquiry.");
        }

        contactForm.reset();
        setContactNote("Your inquiry has been submitted successfully. Our team will contact you shortly.", false);
      } catch (error) {
        setContactNote("Server setup is incomplete, so your email app is opening as fallback.", true);
        openMailFallback(name, phone, email, topic, message);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Inquiry";
        }
      }
    });
  }

  runWhenIdle(function () {
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
  });

  runWhenIdle(function () {
    const chatbotWidget = document.getElementById("chatbot-widget");
    if (!chatbotWidget) return;
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const close = document.getElementById("chatbot-close");
    const quickContainer = chatbotWidget.querySelector(".chatbot-quick");
    if (quickContainer && !quickContainer.querySelector("[data-chatbot-intent='moon-sun']")) {
      const moonButton = document.createElement("button");
      moonButton.type = "button";
      moonButton.dataset.chatbotIntent = "moon-sun";
      moonButton.textContent = "Moon/Sun Insights";
      quickContainer.appendChild(moonButton);
    }
    const quickButtons = chatbotWidget.querySelectorAll("[data-chatbot-intent]");
    const replyNode = document.getElementById("chatbot-reply");
    const openWhatsApp = document.getElementById("chatbot-open-whatsapp");
    const formLink = "https://forms.gle/34orCT2JitYgCnbM9";

    function respond(intent) {
      if (!replyNode) return;
      let messageText = "I can help with services, store items, report interpretation, and bookings.";
      let messageHtml = messageText;
      if (intent === "services") {
        messageText = "For services: Career Alignment, Business Numerology, Personal Destiny Reading, and premium packages are available.";
        messageHtml = messageText;
      } else if (intent === "store") {
        messageText = "For store: crystals, gemstones, rudraksha (1-14 Mukhi), and puja kits are available with guidance.";
        messageHtml = messageText;
      } else if (intent === "reports") {
        messageText = "For reports: share your generated Life Path, Compatibility, or House Number result and get personalized guidance.";
        messageHtml = messageText;
      } else if (intent === "booking") {
        messageText = "For booking: you can connect on WhatsApp directly and select the best consultation format.";
        messageHtml = messageText;
      } else if (intent === "moon-sun") {
        const notes = formatMoonSunNotes();
        messageText = notes.text;
        messageHtml = notes.html;
      }

      replyNode.innerHTML =
        messageHtml +
        " For callback support, please fill this form: " +
        '<a class="chatbot-form-link" href="' +
        formLink +
        '" target="_blank" rel="noopener">Callback Form</a>.';

      if (openWhatsApp) {
        const text = encodeURIComponent(messageText + " I have also submitted the callback form.");
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
  });

  runWhenIdle(function () {
    const alignmentForms = document.querySelectorAll(".alignment-form");
    if (!alignmentForms.length) return;

    alignmentForms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        submitAlignmentForm(form);
      });
    });

    async function submitAlignmentForm(form) {
      const statusNode = form.querySelector(".form-note");
      const submitButton = form.querySelector("button[type='submit']");
      const originalButtonText = submitButton ? submitButton.textContent.trim() : "Submit";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Generating Report...";
      }

      const formData = new FormData(form);
      const name = (formData.get("name") || "").trim();
      const email = (formData.get("email") || "").trim();
      const phone = ((formData.get("phone") || "").trim()).slice(0, 20);
      const topic = form.dataset.topic || "Free Alignment Report";
      const message = (formData.get("message") || "").trim() || "Requesting the Free Alignment Report.";
      const reportType = (formData.get("report_type") || "").trim();
      const dob = (formData.get("dob") || "").trim();
      const birthTime = (formData.get("birth_time") || "").trim();
      const birthPlace = (formData.get("birth_place") || "").trim();

      // Advanced Vedic Numerology Calculations
      function sumDigits(numStr) {
        return numStr.split("").reduce((sum, d) => sum + parseInt(d, 10), 0);
      }
      function reduceToSingleDigit(num) {
        let val = Number(num);
        while (val > 9) val = sumDigits(String(val));
        return val;
      }
      
      let moolank = "";
      let bhagyank = "";
      let friendly = "";
      let enemy = "";
      let remedies = "";
      let basicAttrs = "";

      if (dob && /^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        const parts = dob.split("-");
        const day = parts[2];
        const fullDateStr = parts.join("");
        
        moolank = reduceToSingleDigit(day);
        bhagyank = reduceToSingleDigit(fullDateStr);
        
        const numerologyData = {
          1: { attrs: "Independent, ambitious, leadership-oriented.", friendly: "1, 2, 3, 9", enemy: "8", remedies: "Wear Ruby/Sunstone, chant Surya mantra." },
          2: { attrs: "Diplomatic, cooperative, emotionally aware.", friendly: "1, 3, 5", enemy: "4, 8, 9", remedies: "Wear Moonstone, chant Chandra mantra." },
          3: { attrs: "Creative communicator, expressive energy.", friendly: "1, 2, 3, 5, 9", enemy: "6", remedies: "Wear Yellow Sapphire/Citrine, chant Guru mantra." },
          4: { attrs: "Builder mindset, disciplined and structured.", friendly: "1, 5, 6, 7, 8", enemy: "2, 9", remedies: "Wear Hessonite, practice grounding routines." },
          5: { attrs: "Adaptive, freedom seeking, networking.", friendly: "1, 2, 3, 5, 6", enemy: "None", remedies: "Wear Emerald/Green Aventurine, chant Budh mantra." },
          6: { attrs: "Responsible, nurturing, service driven.", friendly: "1, 5, 6, 7", enemy: "3", remedies: "Wear Diamond/Clear Quartz, chant Shukra mantra." },
          7: { attrs: "Analytical, spiritual seeker, researcher.", friendly: "1, 4, 5, 6, 7", enemy: "8, 9", remedies: "Wear Cat's Eye, engage in regular meditation." },
          8: { attrs: "Power, wealth, authority vibration.", friendly: "3, 4, 5, 6, 8", enemy: "1, 2", remedies: "Wear Blue Sapphire/Amethyst, practice patience and charity." },
          9: { attrs: "Humanitarian, compassionate finisher.", friendly: "1, 2, 3, 5, 9", enemy: "4, 7", remedies: "Wear Red Coral/Carnelian, chant Mangal mantra." }
        };

        if(numerologyData[moolank]) {
          basicAttrs = numerologyData[moolank].attrs;
          friendly = numerologyData[moolank].friendly;
          enemy = numerologyData[moolank].enemy;
          remedies = numerologyData[moolank].remedies;
        }
      }

      // Name Number (Pythagorean)
      let nameNumber = "";
      if (name) {
        const pythagoreanMap = { a:1, j:1, s:1, b:2, k:2, t:2, c:3, l:3, u:3, d:4, m:4, v:4, e:5, n:5, w:5, f:6, o:6, x:6, g:7, p:7, y:7, h:8, q:8, z:8, i:9, r:9 };
        const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
        let nameSum = 0;
        for(let i=0; i<cleanName.length; i++) {
          if(pythagoreanMap[cleanName[i]]) nameSum += pythagoreanMap[cleanName[i]];
        }
        nameNumber = reduceToSingleDigit(nameSum);
      }

      const payload = {
        name: name,
        email: email,
        phone: phone,
        topic: topic,
        message: message
      };

      if (reportType) payload.report_type = reportType;
      if (dob) payload.dob = dob;
      if (birthTime) payload.birth_time = birthTime;
      if (birthPlace) payload.birth_place = birthPlace;

      try {
        // Send to backend (silently fails if API not setup, but continues to WhatsApp)
        fetch("api/submit-contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(() => {});

        // Build WhatsApp Report
        let waMessage = `*Free Alignment Report* ✨\n\n`;
        waMessage += `*Name:* ${name}\n`;
        if (nameNumber) waMessage += `*Name Number:* ${nameNumber}\n`;
        if (dob) {
          waMessage += `*DOB:* ${dob}\n`;
          waMessage += `*Moolank (Driver):* ${moolank}\n`;
          waMessage += `*Bhagyank (Conductor):* ${bhagyank}\n`;
          waMessage += `\n*Basic Attributes:* ${basicAttrs}\n`;
          waMessage += `*Friendly Numbers:* ${friendly}\n`;
          waMessage += `*Enemy Numbers:* ${enemy}\n`;
          waMessage += `\n*Remedies & Action:* ${remedies}\n`;
        }
        waMessage += `\n_Generated via Destini Numbers_`;
        
        form.reset();
        setStatus("Report Generated! Redirecting to WhatsApp...", false);
        
        setTimeout(() => {
          window.open("https://wa.me/917269031175?text=" + encodeURIComponent(waMessage), "_blank");
          setStatus("Report opened in WhatsApp. You can close this message.", false);
        }, 500);

      } catch (error) {
        setStatus("Unable to generate the report. Please message us on WhatsApp.", true);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }

      function setStatus(text, isError) {
        if (!statusNode) return;
        statusNode.textContent = text;
        statusNode.style.color = isError ? "#b42318" : "";
      }
    }
  });

  function scrollSlider(targetId, direction) {
    const track = document.getElementById(targetId);
    if (!track) return;
    const firstCard = track.querySelector(".slider-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 14 : 300;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  runWhenIdle(function () {
    const sliderPrevButtons = document.querySelectorAll("[data-slider-prev]");
    const sliderNextButtons = document.querySelectorAll("[data-slider-next]");

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
  });
})();

(function () {
  const lifePathMeanings = {
    1: "Independent, ambitious, and leadership oriented. Best when initiating bold action.",
    2: "Diplomatic, cooperative, and emotionally aware. Growth comes through partnership.",
    3: "Creative communicator with expressive energy. Thrive through visibility and ideas.",
    4: "Builder mindset with discipline and structure. Strong for long-term stability.",
    5: "Adaptive and freedom seeking. Progress appears through change, travel, and experimentation.",
    6: "Responsible, nurturing, and service driven. Aligned with family, care, and harmony.",
    7: "Analytical and spiritual seeker. Flourishes in research, wisdom, and inner work.",
    8: "Power, wealth, and authority vibration. Strong for business, influence, and scaling.",
    9: "Humanitarian and compassionate finisher. Meant for impact and larger purpose.",
    11: "Master intuitive messenger with high sensitivity and inspiration.",
    22: "Master builder capable of turning big vision into practical systems.",
    33: "Master healer and teacher focused on upliftment through service."
  };

  function onlyDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  function reduceNumber(num, keepMasters) {
    let value = Number(num);
    while (value > 9) {
      if (keepMasters && (value === 11 || value === 22 || value === 33)) {
        break;
      }
      value = String(value)
        .split("")
        .reduce(function (sum, digit) {
          return sum + Number(digit);
        }, 0);
    }
    return value;
  }

  function baseNumber(num) {
    if (num === 11) return 2;
    if (num === 22) return 4;
    if (num === 33) return 6;
    return num;
  }

  function parseDobDigits(dobString) {
    if (!dobString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dobString)) {
      return dobString.replace(/-/g, "");
    }
    return onlyDigits(dobString);
  }

  function calcLifePath(dobString) {
    const digits = parseDobDigits(dobString);
    if (digits.length < 8) {
      throw new Error("Please enter a valid date of birth.");
    }

    const total = digits.split("").reduce(function (sum, digit) {
      return sum + Number(digit);
    }, 0);

    const reduced = reduceNumber(total, true);
    return {
      number: reduced,
      base: baseNumber(reduced),
      meaning: lifePathMeanings[reduced] || lifePathMeanings[baseNumber(reduced)]
    };
  }

  function calcCompatibility(dob1, dob2) {
    const first = calcLifePath(dob1);
    const second = calcLifePath(dob2);
    const diff = Math.abs(baseNumber(first.number) - baseNumber(second.number));
    const score = Math.max(35, 100 - diff * 10);
    let band = "Growth-Focused";

    if (score >= 80) band = "High Harmony";
    else if (score >= 60) band = "Balanced Potential";

    return {
      first: first.number,
      second: second.number,
      score: score,
      band: band,
      insight:
        "Compatibility improves with aligned communication, clear role expectations, and practical remedies tailored to both charts."
    };
  }

  function calcHouseNumber(houseNumberString) {
    const digits = onlyDigits(houseNumberString);
    if (!digits.length) {
      throw new Error("Please enter a valid house or flat number.");
    }

    const total = digits.split("").reduce(function (sum, digit) {
      return sum + Number(digit);
    }, 0);

    const reduced = reduceNumber(total, true);
    const mapping = {
      1: "Independent home energy. Supports leadership and fresh starts.",
      2: "Soft and cooperative energy. Supports relationships and peace.",
      3: "Social, creative, and expressive household vibration.",
      4: "Stable and practical home field for disciplined growth.",
      5: "Dynamic and changing energy. Supports movement and networking.",
      6: "Family-centered and nurturing space with care-oriented energy.",
      7: "Reflective and spiritual home vibe, ideal for study and healing.",
      8: "Strong prosperity and authority vibration for ambition and business.",
      9: "Compassionate and expansive energy that attracts service and closure.",
      11: "Intuitive doorway for spiritual awareness and inspiration.",
      22: "Powerful builder field for long-term legacy and material growth.",
      33: "Healing and teaching energy focused on upliftment."
    };

    return {
      number: reduced,
      meaning: mapping[reduced] || mapping[baseNumber(reduced)]
    };
  }

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  function showReport(title, lines) {
    const box = document.getElementById("report-box");
    const titleNode = document.getElementById("report-title");
    const bodyNode = document.getElementById("report-content");

    if (!box || !titleNode || !bodyNode) return;

    titleNode.textContent = title;
    bodyNode.innerHTML = lines
      .map(function (line) {
        return '<div class="result-line"><strong>' + line.label + "</strong>" + line.value + "</div>";
      })
      .join("");

    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".tool-section");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const target = tab.getAttribute("data-tool");
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        sections.forEach(function (sec) {
          sec.classList.remove("active");
        });
        tab.classList.add("active");
        const active = document.getElementById(target);
        if (active) active.classList.add("active");
      });
    });
  }

  function initForms() {
    const lifeForm = document.getElementById("life-path-form");
    const compatibilityForm = document.getElementById("compatibility-form");
    const houseForm = document.getElementById("house-form");
    const printButton = document.getElementById("print-report");
    const whatsappButton = document.getElementById("send-whatsapp");

    if (lifeForm) {
      lifeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        try {
          const dob = document.getElementById("dob").value;
          const result = calcLifePath(dob);
          showReport("Career-Life Alignment Report", [
            { label: "Life Path Number", value: String(result.number) },
            { label: "Core Interpretation", value: result.meaning },
            {
              label: "Action Guidance",
              value:
                "Use this number to select aligned career direction, business timing, and practical remedies in consultation."
            }
          ]);
        } catch (error) {
          alert(error.message);
        }
      });
    }

    if (compatibilityForm) {
      compatibilityForm.addEventListener("submit", function (event) {
        event.preventDefault();
        try {
          const dob1 = document.getElementById("dob-1").value;
          const dob2 = document.getElementById("dob-2").value;
          const result = calcCompatibility(dob1, dob2);
          showReport("Compatibility Snapshot", [
            { label: "First Life Path", value: String(result.first) },
            { label: "Second Life Path", value: String(result.second) },
            { label: "Compatibility Score", value: result.score + "% - " + result.band },
            { label: "Insight", value: result.insight }
          ]);
        } catch (error) {
          alert(error.message);
        }
      });
    }

    if (houseForm) {
      houseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        try {
          const value = document.getElementById("house-number").value;
          const result = calcHouseNumber(value);
          showReport("House Number Energy Report", [
            { label: "House Number Vibration", value: String(result.number) },
            { label: "Meaning", value: result.meaning },
            {
              label: "Practical Suggestion",
              value: "Align colors, rituals, and daily routines with this number's vibration for better outcomes."
            }
          ]);
        } catch (error) {
          alert(error.message);
        }
      });
    }

    if (printButton) {
      printButton.addEventListener("click", function () {
        window.print();
      });
    }

    if (whatsappButton) {
      whatsappButton.addEventListener("click", function () {
        const title = document.getElementById("report-title").textContent || "Numerology Report";
        const lines = Array.from(document.querySelectorAll("#report-content .result-line")).map(function (line) {
          return line.textContent.trim();
        });
        const message = encodeURIComponent(
          "Hello Destini Numbers, I generated a report: " + title + "\n\n" + lines.join("\n") + "\n\nPlease guide me with a detailed consultation."
        );
        window.open("https://wa.me/917269031175?text=" + message, "_blank");
      });
    }
  }

  function renderReport(data) {
    if (!data || !data.title || !Array.isArray(data.lines)) {
      return;
    }
    showReport(data.title, data.lines);
  }

  window.calcLifePath = calcLifePath;
  window.calcCompatibility = calcCompatibility;
  window.calcHouseNumber = calcHouseNumber;
  window.renderReport = renderReport;

  initTabs();
  initForms();
})();

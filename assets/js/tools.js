(function () {
  const lifePathMeanings = {
    1: {
      en: "Independent, ambitious, and leadership oriented. Best when initiating bold action.",
      hi: "स्वतंत्र और नेतृत्व प्रधान ऊर्जा। नए काम शुरू करने में सफलता मिलती है।"
    },
    2: {
      en: "Diplomatic, cooperative, and emotionally aware. Growth comes through partnership.",
      hi: "सहयोगी और संतुलित ऊर्जा। साझेदारी और तालमेल से प्रगति होती है।"
    },
    3: {
      en: "Creative communicator with expressive energy. Thrive through visibility and ideas.",
      hi: "रचनात्मक और अभिव्यक्तिशील ऊर्जा। विचारों और संचार से विकास होता है।"
    },
    4: {
      en: "Builder mindset with discipline and structure. Strong for long-term stability.",
      hi: "अनुशासन और संरचना वाली ऊर्जा। स्थिरता और दीर्घकालिक निर्माण के लिए श्रेष्ठ।"
    },
    5: {
      en: "Adaptive and freedom seeking. Progress appears through change and experimentation.",
      hi: "परिवर्तनशील और स्वतंत्र ऊर्जा। बदलाव और नए प्रयोगों से लाभ मिलता है।"
    },
    6: {
      en: "Responsible, nurturing, and service driven. Aligned with family and harmony.",
      hi: "जिम्मेदार और पोषण देने वाली ऊर्जा। परिवार और सामंजस्य में शक्ति मिलती है।"
    },
    7: {
      en: "Analytical and spiritual seeker. Flourishes in research, wisdom, and inner work.",
      hi: "विश्लेषणात्मक और आध्यात्मिक ऊर्जा। अध्ययन, शोध और आत्मचिंतन से उन्नति।"
    },
    8: {
      en: "Power, wealth, and authority vibration. Strong for business and scaling.",
      hi: "शक्ति, धन और अधिकार की ऊर्जा। व्यवसाय और विस्तार के लिए प्रबल।"
    },
    9: {
      en: "Humanitarian and compassionate finisher. Meant for impact and larger purpose.",
      hi: "मानवीय और करुणामय ऊर्जा। समाजहित और बड़े उद्देश्य से जुड़ाव।"
    },
    11: {
      en: "Master intuitive messenger with high sensitivity and inspiration.",
      hi: "मास्टर इंट्यूटिव ऊर्जा। प्रेरणा, संवेदनशीलता और आध्यात्मिक संदेश की क्षमता।"
    },
    22: {
      en: "Master builder capable of turning big vision into practical systems.",
      hi: "मास्टर बिल्डर ऊर्जा। बड़े विजन को व्यावहारिक रूप देने की क्षमता।"
    },
    33: {
      en: "Master healer and teacher focused on upliftment through service.",
      hi: "मास्टर हीलर और शिक्षक ऊर्जा। सेवा के माध्यम से उत्थान और मार्गदर्शन।"
    }
  };

  const numberAttributes = {
    1: { day: "Sunday | रविवार", color: "Gold & Saffron | सुनहरा और केसरिया", mantra: "Om Hreem Suryaaya Namah | ॐ ह्रीं सूर्याय नमः" },
    2: { day: "Monday | सोमवार", color: "White & Silver | सफेद और चांदी", mantra: "Om Som Somaya Namah | ॐ सोम सोमाय नमः" },
    3: { day: "Thursday | गुरुवार", color: "Yellow | पीला", mantra: "Om Gurave Namah | ॐ गुरवे नमः" },
    4: { day: "Saturday | शनिवार", color: "Earth Brown | मिट्टी रंग", mantra: "Om Rahave Namah | ॐ राहवे नमः" },
    5: { day: "Wednesday | बुधवार", color: "Green | हरा", mantra: "Om Bum Budhaya Namah | ॐ बुं बुधाय नमः" },
    6: { day: "Friday | शुक्रवार", color: "Rose & Cream | गुलाबी और क्रीम", mantra: "Om Shum Shukraya Namah | ॐ शुं शुक्राय नमः" },
    7: { day: "Monday / Thursday | सोमवार / गुरुवार", color: "Sea Green | सी ग्रीन", mantra: "Om Ketave Namah | ॐ केतवे नमः" },
    8: { day: "Saturday | शनिवार", color: "Navy & Indigo | नेवी और इंडिगो", mantra: "Om Sham Shanicharaya Namah | ॐ शं शनैश्चराय नमः" },
    9: { day: "Tuesday | मंगलवार", color: "Red | लाल", mantra: "Om Angarakaya Namah | ॐ अंगारकाय नमः" },
    11: { day: "Monday / Friday | सोमवार / शुक्रवार", color: "Pearl White | मोती सफेद", mantra: "Om Aim Hreem Kleem | ॐ ऐं ह्रीं क्लीं" },
    22: { day: "Thursday / Saturday | गुरुवार / शनिवार", color: "Deep Yellow | गहरा पीला", mantra: "Om Gam Ganapataye Namah | ॐ गं गणपतये नमः" },
    33: { day: "Friday / Thursday | शुक्रवार / गुरुवार", color: "Rose Gold | रोज़ गोल्ड", mantra: "Om Shreem Hreem Namah | ॐ श्रीं ह्रीं नमः" }
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
      throw new Error("Please enter a valid date of birth. | कृपया सही जन्म तिथि दर्ज करें।");
    }

    const total = digits.split("").reduce(function (sum, digit) {
      return sum + Number(digit);
    }, 0);

    const reduced = reduceNumber(total, true);
    const meaning = lifePathMeanings[reduced] || lifePathMeanings[baseNumber(reduced)];

    return {
      number: reduced,
      base: baseNumber(reduced),
      meaning: meaning
    };
  }

  function calcCompatibility(dob1, dob2) {
    const first = calcLifePath(dob1);
    const second = calcLifePath(dob2);
    const diff = Math.abs(baseNumber(first.number) - baseNumber(second.number));
    const score = Math.max(35, 100 - diff * 10);
    let band = "Growth-Focused | विकास-केंद्रित";

    if (score >= 80) band = "High Harmony | उच्च सामंजस्य";
    else if (score >= 60) band = "Balanced Potential | संतुलित संभावना";

    return {
      first: first.number,
      second: second.number,
      score: score,
      band: band,
      insightEn:
        "Compatibility improves with aligned communication, clear role expectations, and practical remedies tailored to both charts.",
      insightHi:
        "संबंध में तालमेल बेहतर होता है जब संवाद स्पष्ट हो, भूमिकाएं तय हों, और दोनों की कुंडली अनुसार उपाय अपनाए जाएं।"
    };
  }

  function calcHouseNumber(houseNumberString) {
    const digits = onlyDigits(houseNumberString);
    if (!digits.length) {
      throw new Error("Please enter a valid house or flat number. | कृपया सही घर या फ्लैट नंबर दर्ज करें।");
    }

    const total = digits.split("").reduce(function (sum, digit) {
      return sum + Number(digit);
    }, 0);

    const reduced = reduceNumber(total, true);
    const mapping = {
      1: {
        en: "Independent home energy. Supports leadership and fresh starts.",
        hi: "स्वतंत्र गृह ऊर्जा। नेतृत्व और नई शुरुआत के लिए अनुकूल।"
      },
      2: {
        en: "Soft and cooperative energy. Supports relationships and peace.",
        hi: "मृदु और सहयोगी ऊर्जा। रिश्तों और शांति के लिए अनुकूल।"
      },
      3: {
        en: "Social, creative, and expressive household vibration.",
        hi: "सामाजिक, रचनात्मक और अभिव्यक्तिशील घरेलू ऊर्जा।"
      },
      4: {
        en: "Stable and practical home field for disciplined growth.",
        hi: "स्थिर और व्यावहारिक गृह ऊर्जा, अनुशासित प्रगति के लिए अच्छी।"
      },
      5: {
        en: "Dynamic and changing energy. Supports movement and networking.",
        hi: "गतिशील ऊर्जा। बदलाव, नेटवर्किंग और नई गतिविधियों को बढ़ावा देती है।"
      },
      6: {
        en: "Family-centered and nurturing space with care-oriented energy.",
        hi: "परिवार केंद्रित और पोषण देने वाला वातावरण।"
      },
      7: {
        en: "Reflective and spiritual home vibe, ideal for study and healing.",
        hi: "आध्यात्मिक और चिंतनशील ऊर्जा, अध्ययन और हीलिंग के लिए श्रेष्ठ।"
      },
      8: {
        en: "Strong prosperity and authority vibration for ambition and business.",
        hi: "समृद्धि और अधिकार की प्रबल ऊर्जा, महत्वाकांक्षा व व्यापार हेतु अनुकूल।"
      },
      9: {
        en: "Compassionate and expansive energy that attracts service and closure.",
        hi: "करुणामय और विस्तृत ऊर्जा, सेवा और पूर्णता की ओर ले जाती है।"
      },
      11: {
        en: "Intuitive doorway for spiritual awareness and inspiration.",
        hi: "आध्यात्मिक जागरूकता और प्रेरणा का सूक्ष्म द्वार।"
      },
      22: {
        en: "Powerful builder field for long-term legacy and material growth.",
        hi: "दीर्घकालिक निर्माण और भौतिक उन्नति के लिए सशक्त ऊर्जा।"
      },
      33: {
        en: "Healing and teaching energy focused on upliftment.",
        hi: "हीलिंग और शिक्षण की ऊर्जा, उत्थान पर केंद्रित।"
      }
    };

    return {
      number: reduced,
      meaning: mapping[reduced] || mapping[baseNumber(reduced)]
    };
  }

  function createLine(item, index) {
    const animationDelay = (index * 65).toString();
    return (
      '<div class="result-line" style="animation-delay:' +
      animationDelay +
      'ms"><strong>' +
      item.label +
      "</strong>" +
      item.value +
      (item.valueHi ? '<span class="result-hi">' + item.valueHi + "</span>" : "") +
      "</div>"
    );
  }

  function showReport(report) {
    const box = document.getElementById("report-box");
    const titleNode = document.getElementById("report-title");
    const subtitleNode = document.getElementById("report-subtitle");
    const bodyNode = document.getElementById("report-content");

    if (!box || !titleNode || !bodyNode || !report) return;

    titleNode.textContent = report.title;
    if (subtitleNode && report.subtitle) {
      subtitleNode.textContent = report.subtitle;
    }

    bodyNode.innerHTML = report.lines
      .map(function (line, index) {
        return createLine(line, index);
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

  function setButtonLoading(button, isLoading, loadingLabel) {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalLabel = button.textContent;
      button.textContent = loadingLabel;
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalLabel || button.textContent;
      button.disabled = false;
    }
  }

  function initFormShortcuts() {
    const lifeDemoButton = document.getElementById("fill-life-demo");
    const swapButton = document.getElementById("swap-compatibility-dates");
    const houseDemoButton = document.getElementById("fill-house-demo");

    if (lifeDemoButton) {
      lifeDemoButton.addEventListener("click", function () {
        const dob = document.getElementById("dob");
        if (dob) dob.value = "1991-10-28";
      });
    }

    if (swapButton) {
      swapButton.addEventListener("click", function () {
        const first = document.getElementById("dob-1");
        const second = document.getElementById("dob-2");
        if (!first || !second) return;
        const temp = first.value;
        first.value = second.value;
        second.value = temp;
      });
    }

    if (houseDemoButton) {
      houseDemoButton.addEventListener("click", function () {
        const field = document.getElementById("house-number");
        if (field) field.value = "B-203";
      });
    }
  }

  function initForms() {
    const lifeForm = document.getElementById("life-path-form");
    const compatibilityForm = document.getElementById("compatibility-form");
    const houseForm = document.getElementById("house-form");
    const printButton = document.getElementById("print-report");
    const whatsappButton = document.getElementById("send-whatsapp");

    initFormShortcuts();

    if (lifeForm) {
      lifeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const submitButton = lifeForm.querySelector("button[type='submit']");
        setButtonLoading(submitButton, true, "Calculating... | गणना हो रही है...");
        try {
          const dob = document.getElementById("dob").value;
          const result = calcLifePath(dob);
          const profile = numberAttributes[result.number] || numberAttributes[result.base] || numberAttributes[1];
          showReport({
            title: "Career-Life Alignment Report | करियर-लाइफ अलाइनमेंट रिपोर्ट",
            subtitle:
              "Free insight from your date of birth. This is a starter snapshot for guidance. | आपकी जन्म तिथि पर आधारित प्रारंभिक मार्गदर्शन रिपोर्ट।",
            lines: [
              { label: "Life Path Number | लाइफ पाथ नंबर", value: String(result.number) },
              { label: "Core Interpretation | मूल अर्थ", value: result.meaning.en, valueHi: result.meaning.hi },
              { label: "Auspicious Day | शुभ दिन", value: profile.day },
              { label: "Power Color | शुभ रंग", value: profile.color },
              { label: "Daily Sankalp Mantra | दैनिक संकल्प मंत्र", value: profile.mantra },
              {
                label: "Action Guidance | कार्य मार्गदर्शन",
                value: "Use this number to align career direction, business timing, and consultation remedies.",
                valueHi: "इस नंबर का उपयोग करियर दिशा, बिज़नेस टाइमिंग और उपायों के चयन के लिए करें।"
              }
            ]
          });
        } catch (error) {
          alert(error.message);
        } finally {
          setButtonLoading(submitButton, false);
        }
      });
    }

    if (compatibilityForm) {
      compatibilityForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const submitButton = compatibilityForm.querySelector("button[type='submit']");
        setButtonLoading(submitButton, true, "Calculating... | गणना हो रही है...");
        try {
          const dob1 = document.getElementById("dob-1").value;
          const dob2 = document.getElementById("dob-2").value;
          const result = calcCompatibility(dob1, dob2);
          showReport({
            title: "Compatibility Snapshot | अनुकूलता स्नैपशॉट",
            subtitle:
              "Understand harmony level and next practical step. | सामंजस्य स्तर और अगले व्यावहारिक कदम समझें।",
            lines: [
              { label: "First Life Path | पहला लाइफ पाथ", value: String(result.first) },
              { label: "Second Life Path | दूसरा लाइफ पाथ", value: String(result.second) },
              { label: "Compatibility Score | अनुकूलता स्कोर", value: result.score + "% - " + result.band },
              { label: "Insight | मुख्य संकेत", value: result.insightEn, valueHi: result.insightHi },
              {
                label: "Remedy Focus | उपाय केंद्र",
                value: "Synchronize communication timing, weekly intention ritual, and role clarity.",
                valueHi: "संवाद का सही समय, साप्ताहिक संकल्प और भूमिकाओं की स्पष्टता अपनाएं।"
              }
            ]
          });
        } catch (error) {
          alert(error.message);
        } finally {
          setButtonLoading(submitButton, false);
        }
      });
    }

    if (houseForm) {
      houseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const submitButton = houseForm.querySelector("button[type='submit']");
        setButtonLoading(submitButton, true, "Calculating... | गणना हो रही है...");
        try {
          const value = document.getElementById("house-number").value;
          const result = calcHouseNumber(value);
          const profile = numberAttributes[result.number] || numberAttributes[baseNumber(result.number)] || numberAttributes[1];
          showReport({
            title: "House Energy Report | गृह ऊर्जा रिपोर्ट",
            subtitle:
              "Check your home's energetic vibration and balancing suggestion. | अपने घर की ऊर्जा और संतुलन सुझाव देखें।",
            lines: [
              { label: "House Vibration | गृह कंपन", value: String(result.number) },
              { label: "Meaning | अर्थ", value: result.meaning.en, valueHi: result.meaning.hi },
              { label: "Harmony Color | संतुलन रंग", value: profile.color },
              { label: "Space Mantra | गृह मंत्र", value: profile.mantra },
              {
                label: "Practical Suggestion | व्यावहारिक सुझाव",
                value: "Align colors, prayer zone, and daily routine with this number's vibration.",
                valueHi: "रंग, पूजा स्थान और दिनचर्या को इस नंबर की ऊर्जा के अनुरूप रखें।"
              }
            ]
          });
        } catch (error) {
          alert(error.message);
        } finally {
          setButtonLoading(submitButton, false);
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
        const subtitle = document.getElementById("report-subtitle").textContent || "";
        const lines = Array.from(document.querySelectorAll("#report-content .result-line")).map(function (line) {
          return line.textContent.trim();
        });
        const message = encodeURIComponent(
          "Hello Destini Numbers, I generated a report: " +
            title +
            "\n\n" +
            subtitle +
            "\n\n" +
            lines.join("\n") +
            "\n\nPlease guide me with a detailed consultation. | कृपया विस्तृत मार्गदर्शन दें।"
        );
        window.open("https://wa.me/917269031175?text=" + message, "_blank");
      });
    }
  }

  function renderReport(data) {
    if (!data || !data.title || !Array.isArray(data.lines)) {
      return;
    }
    showReport(data);
  }

  window.calcLifePath = calcLifePath;
  window.calcCompatibility = calcCompatibility;
  window.calcHouseNumber = calcHouseNumber;
  window.renderReport = renderReport;

  initTabs();
  initForms();
})();

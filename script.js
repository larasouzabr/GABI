document.addEventListener("DOMContentLoaded", async () => {
  const projectIntro = document.getElementById("project-intro");
  const categoryGrid = document.getElementById("category-grid");
  const guidelinesContent = document.getElementById("guidelines-content");
  const guidelineTitle = document.getElementById("guideline-title");
  const guidelineDetails = document.getElementById("guideline-details");
  const backButton = document.getElementById("back-button");
  const cards = document.querySelectorAll(".card");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const sidebar = document.getElementById("sidebar");
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const langPtButton = document.getElementById("lang-pt");
  const langEnButton = document.getElementById("lang-en");

  let currentCategory = null;

  const categoryColors = {
    "tamanho-layout": "#3498db",
    "elementos-visuais": "#e74c3c",
    "navegacao-interacao": "#2ecc71",
    "feedback-erros": "#f1c40f",
    "seguranca-confianca": "#9b59b6",
    "aprendizagem-suporte": "#e67e22",
    "funcionalidades-conteudo": "#1abc9c",
    "recomendacoes-gerais": "#e84393",
  };

async function initializeI18next() {
    try {
      const [pt_translation, en_translation] = await Promise.all([
        fetch("locales/pt.json").then((res) => res.json()),
        fetch("locales/en.json").then((res) => res.json()),
      ]);

      await i18next.init({
        lng: localStorage.getItem("language") || "pt",
        fallbackLng: "pt",
        debug: false,
        resources: { pt: pt_translation, en: en_translation },
        returnObjects: true,
      });
    } catch (error) {
      console.error("Falha ao inicializar o i18next:", error);
      const isNetwork = error instanceof TypeError;
      document.body.innerHTML = `
        <div class="load-error">
          <h1>Erro ao carregar o conteúdo</h1>
          <p>${isNetwork
            ? "Não foi possível carregar os arquivos de tradução. Verifique sua conexão ou se está abrindo o arquivo via servidor (não direto pelo sistema de arquivos)."
            : "Os arquivos de tradução estão malformados. Verifique os arquivos <code>locales/pt.json</code> e <code>locales/en.json</code>."
          }</p>
          <p style="font-size:0.85rem;color:#718096">Detalhes: ${error.message}</p>
        </div>`;
    }
  }

function updateStaticContent() {
    document.querySelector(".skip-link").textContent = i18next.t("skip_link");
    document.querySelector(".nav-title").textContent = i18next.t("nav_title");
    document.querySelector("#project-intro h1").textContent = i18next.t("intro_h1");
    document.querySelector("#project-intro p").textContent = i18next.t("intro_p");
    document.querySelector(".main-content h2").textContent = i18next.t("guidelines_h2");
    document.querySelector(".site-footer h3").textContent = i18next.t("footer_h3");
    document.querySelector(".award-badge").textContent = i18next.t("award_badge");
    document.querySelector(".award-conference").textContent = i18next.t("award_conference");
    document.querySelectorAll("[data-institution='usp']").forEach((el) => el.textContent = i18next.t("institution_usp"));
    document.querySelectorAll("[data-institution='ufc']").forEach((el) => el.textContent = i18next.t("institution_ufc"));
    backButton.innerHTML = i18next.t("back_button");

    cards.forEach((card) => {
      card.querySelector("span").textContent = i18next.t(`categories.${card.dataset.category}`);
    });

    regenerateNav();

    const categoryGridEl = document.getElementById("category-grid");
    if (categoryGridEl) categoryGridEl.setAttribute("aria-label", i18next.t("guidelines_h2"));

    langPtButton.classList.toggle("active", i18next.language === "pt");
    langEnButton.classList.toggle("active", i18next.language === "en");

    if (currentCategory) showGuidelines(currentCategory);
  }

  function regenerateNav() {
    const navLinksContainer = document.querySelector(".main-nav");
    navLinksContainer.querySelectorAll("a").forEach((link) => link.remove());

    const categories = i18next.t("categories");
    const navLabel = i18next.t("nav_link_label");
    for (const key in categories) {
      const link = document.createElement("a");
      link.href = `#${key}`;
      link.textContent = categories[key];
      link.setAttribute("aria-label", `${navLabel}: ${categories[key]}`);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showGuidelines(key);
        if (sidebar) sidebar.classList.remove("is-open");
      });
      navLinksContainer.appendChild(link);
    }
  }

  async function switchLanguage(lang) {
    await i18next.changeLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    updateStaticContent();
  }

function renderDoDont(item) {
    const el = document.createElement("div");
    el.className = "do-dont-container";
    el.innerHTML = `
      <div class="do-column">
        <h3 class="do-dont-header"><i class="ph-bold ph-check-circle" aria-hidden="true"></i> ${i18next.t("do_text")}</h3>
        <img src="${item.do.image}" alt="Exemplo de 'faça'">
        <p class="do-dont-caption">${item.do.caption}</p>
      </div>
      <div class="dont-column">
        <h3 class="do-dont-header"><i class="ph-bold ph-x-circle" aria-hidden="true"></i> ${i18next.t("dont_text")}</h3>
        <img src="${item.dont.image}" alt="Exemplo de 'não faça'">
        <p class="do-dont-caption">${item.dont.caption}</p>
      </div>`;
    return el;
  }

  function renderLargeModeDemo(item, index) {
    const demoTextId = `demo-text-${index}`;
    const toggleButtonId = `toggle-mode-button-${index}`;
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-text-aa" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="demo-controls">
        <button id="${toggleButtonId}" class="feedback-action-button">${i18next.t("demos.large_mode.toggle_on")}</button>
      </div>
      <div id="${demoTextId}" class="demo-text-area">${item.demo_text}</div>`;

    setTimeout(() => {
      const demoText = document.getElementById(demoTextId);
      const toggleButton = document.getElementById(toggleButtonId);
      toggleButton.addEventListener("click", () => {
        demoText.classList.toggle("large-mode");
        toggleButton.textContent = demoText.classList.contains("large-mode")
          ? i18next.t("demos.large_mode.toggle_off")
          : i18next.t("demos.large_mode.toggle_on");
      });
    }, 0);
    return el;
  }

  function renderTapSizeDemo(item) {
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-hand-tapping" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="tap-size-demo-container">
        <div class="tap-column">
          <h3 class="do-dont-header dont-column"><i class="ph-bold ph-x-circle" aria-hidden="true"></i> ${i18next.t("dont_text")}</h3>
          <div class="tap-button-area">
            <button class="tap-button bad-size">${i18next.t("demos.general.option1")}</button>
            <button class="tap-button bad-size">${i18next.t("demos.general.option2")}</button>
            <button class="tap-button bad-size">${i18next.t("demos.general.option3")}</button>
          </div>
        </div>
        <div class="tap-column">
          <h3 class="do-dont-header do-column"><i class="ph-bold ph-check-circle" aria-hidden="true"></i> ${i18next.t("do_text")}</h3>
          <div class="tap-button-area">
            <button class="tap-button good-size">${i18next.t("demos.general.option1")}</button>
            <button class="tap-button good-size">${i18next.t("demos.general.option2")}</button>
            <button class="tap-button good-size">${i18next.t("demos.general.option3")}</button>
          </div>
        </div>
      </div>`;
    return el;
  }

  function renderContrastDemo(item, index) {
    const fontId = `font-slider-${index}`;
    const bgColorId = `bg-color-${index}`;
    const textColorId = `text-color-${index}`;
    const demoAreaId = `contrast-demo-area-${index}`;
    const ratioId = `contrast-ratio-${index}`;
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-circle-half" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="contrast-controls">
        <div class="control-group">
          <label for="${fontId}">${i18next.t("demos.contrast.font_size")}</label>
          <input type="range" id="${fontId}" min="12" max="24" value="16" step="1" aria-valuetext="16px">
        </div>
        <div class="control-group">
          <label for="${bgColorId}">${i18next.t("demos.contrast.bg_color")}</label>
          <input type="color" id="${bgColorId}" value="#2d3748">
        </div>
        <div class="control-group">
          <label for="${textColorId}">${i18next.t("demos.contrast.text_color")}</label>
          <input type="color" id="${textColorId}" value="#e2e8f0">
        </div>
      </div>
      <div class="demo-text-area" id="${demoAreaId}" style="background-color: #2d3748; color: #e2e8f0; font-size: 16px;">${item.demo_text}</div>
      <div class="contrast-ratio-display" id="${ratioId}">${i18next.t("demos.contrast.calculating")}</div>`;

    setTimeout(() => {
      const fontSlider = document.getElementById(fontId);
      const bgColorPicker = document.getElementById(bgColorId);
      const textColorPicker = document.getElementById(textColorId);
      const demoArea = document.getElementById(demoAreaId);
      const ratioDisplay = document.getElementById(ratioId);

      function getLuminance(hex) {
        const rgb = parseInt(hex.substring(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return [r, g, b].map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
      }

      function getWcagLevel(ratio) {
        if (ratio >= 7) return { level: i18next.t("demos.contrast.status_aaa"), rec: i18next.t("demos.contrast.recommendation_aaa") };
        if (ratio >= 4.5) return { level: i18next.t("demos.contrast.status_aa"), rec: i18next.t("demos.contrast.recommendation_aa") };
        if (ratio >= 3) return { level: i18next.t("demos.contrast.status_aa_large"), rec: i18next.t("demos.contrast.recommendation_aa_large") };
        return { level: i18next.t("demos.contrast.status_fail"), rec: i18next.t("demos.contrast.recommendation_fail") };
      }

      function updateDemo() {
        demoArea.style.fontSize = `${fontSlider.value}px`;
        demoArea.style.backgroundColor = bgColorPicker.value;
        demoArea.style.color = textColorPicker.value;

        const lum1 = getLuminance(bgColorPicker.value);
        const lum2 = getLuminance(textColorPicker.value);
        const ratio = lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
        const { level, rec } = getWcagLevel(ratio);

        ratioDisplay.innerHTML = `${i18next.t("demos.contrast.ratio_prefix")} <strong>${ratio.toFixed(2)}:1</strong> (${i18next.t("demos.contrast.level_prefix")} ${level})<br><small>${rec}</small>`;
      }

      fontSlider.addEventListener("input", () => {
        fontSlider.setAttribute("aria-valuetext", `${fontSlider.value}px`);
        updateDemo();
      });
      bgColorPicker.addEventListener("input", updateDemo);
      textColorPicker.addEventListener("input", updateDemo);
      updateDemo();
    }, 0);
    return el;
  }

  function renderFeedbackDemo(item, index) {
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-bell-ringing" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="feedback-demo-container">
        <div class="feedback-demo-controls">
          <span>${i18next.t("demos.feedback.title")}</span>
          <div class="radio-group">
            <input type="radio" id="fb-toast-${index}" name="feedback-type-${index}" value="toast" checked>
            <label for="fb-toast-${index}"><span class="custom-radio"></span>${i18next.t("demos.feedback.notification")}</label>
          </div>
          <div class="radio-group">
            <input type="radio" id="fb-vibrate-${index}" name="feedback-type-${index}" value="vibrate">
            <label for="fb-vibrate-${index}"><span class="custom-radio"></span>${i18next.t("demos.feedback.vibration")}</label>
          </div>
        </div>
        <button class="feedback-action-button">${i18next.t("demos.feedback.action_button")}</button>
        <div class="feedback-toast" role="status" aria-live="polite" aria-atomic="true">${i18next.t("demos.feedback.success_message")}</div>
      </div>`;

    setTimeout(() => {
      const actionButton = el.querySelector(".feedback-action-button");
      const toast = el.querySelector(".feedback-toast");
      const radioButtons = el.querySelectorAll(`input[name="feedback-type-${index}"]`);

      actionButton.addEventListener("click", () => {
        const selected = [...radioButtons].find((r) => r.checked)?.value;
        actionButton.classList.remove("shake");
        toast.classList.remove("show");

        if (selected === "toast") {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 3000);
        } else if (selected === "vibrate") {
          void actionButton.offsetWidth;
          actionButton.classList.add("shake");
        }
      });
    }, 0);
    return el;
  }

  function renderPasswordDemo(item, index) {
    const inputId = `password-input-${index}`;
    const toggleId = `password-toggle-${index}`;
    const iconId = `password-icon-${index}`;
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-key" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="password-demo-container">
        <label for="${inputId}" class="sr-only">${i18next.t("demos.password.label")}</label>
        <div class="password-input-wrapper">
          <input type="password" id="${inputId}" value="${i18next.t("demos.password.example_value")}" placeholder="${i18next.t("demos.password.placeholder")}">
          <button id="${toggleId}" class="password-toggle-button" aria-label="${i18next.t("demos.password.show")}">
            <i id="${iconId}" class="ph ph-eye"></i>
          </button>
        </div>
      </div>`;

    setTimeout(() => {
      const passwordInput = document.getElementById(inputId);
      const toggleButton = document.getElementById(toggleId);
      const toggleIcon = document.getElementById(iconId);

      toggleButton.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        toggleButton.setAttribute("aria-label", i18next.t(isPassword ? "demos.password.hide" : "demos.password.show"));
        toggleIcon.className = isPassword ? "ph ph-eye-slash" : "ph ph-eye";
      });
    }, 0);
    return el;
  }

  function renderWalkthroughDemo(item) {
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-steps" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="walkthrough-container">
        <div class="walkthrough-fake-screen">
          <div id="wt-saldo" class="fake-element">${i18next.t("demos.walkthrough.balance")}</div>
          <button id="wt-pagar" class="fake-element">${i18next.t("demos.walkthrough.pay_bills")}</button>
          <button id="wt-extrato" class="fake-element">${i18next.t("demos.walkthrough.view_statement")}</button>
          <i id="wt-ajuda" class="ph ph-question fake-element"></i>
        </div>
        <div class="walkthrough-overlay">
          <div class="walkthrough-highlighter"></div>
          <div class="walkthrough-tooltip" aria-live="polite" aria-atomic="true">
            <p class="walkthrough-text"></p>
            <div class="walkthrough-nav">
              <button class="walkthrough-prev">&larr; ${i18next.t("demos.walkthrough.previous")}</button>
              <span class="walkthrough-progress"></span>
              <button class="walkthrough-next">${i18next.t("demos.walkthrough.next")} &rarr;</button>
            </div>
          </div>
        </div>
      </div>`;

    setTimeout(() => {
      const steps = item.steps;
      let currentStep = 0;
      const prevBtn = el.querySelector(".walkthrough-prev");
      const nextBtn = el.querySelector(".walkthrough-next");
      const progressSpan = el.querySelector(".walkthrough-progress");
      const tooltipText = el.querySelector(".walkthrough-text");
      const highlighter = el.querySelector(".walkthrough-highlighter");
      const tooltip = el.querySelector(".walkthrough-tooltip");

      function goToStep(stepIndex) {
        const step = steps[stepIndex];
        tooltipText.textContent = step.text;
        progressSpan.textContent = `${stepIndex + 1} de ${steps.length}`;
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === steps.length - 1
          ? i18next.t("demos.walkthrough.finish")
          : `${i18next.t("demos.walkthrough.next")} →`;

        if (step.target === "self") {
          highlighter.style.display = "none";
          tooltip.style.cssText = "top:50%;left:50%;transform:translate(-50%,-50%)";
        } else {
          const targetElement = el.querySelector(step.target);
          if (targetElement) {
            highlighter.style.display = "block";
            const targetRect = targetElement.getBoundingClientRect();
            const containerRect = el.querySelector(".walkthrough-container").getBoundingClientRect();
            highlighter.style.width = `${targetRect.width + 20}px`;
            highlighter.style.height = `${targetRect.height + 20}px`;
            highlighter.style.top = `${targetRect.top - containerRect.top - 10}px`;
            highlighter.style.left = `${targetRect.left - containerRect.left - 10}px`;
            tooltip.style.cssText = `top:${targetRect.bottom - containerRect.top + 15}px;left:50%;transform:translateX(-50%)`;
          }
        }
      }

      nextBtn.addEventListener("click", () => { if (currentStep < steps.length - 1) goToStep(++currentStep); });
      prevBtn.addEventListener("click", () => { if (currentStep > 0) goToStep(--currentStep); });
      goToStep(0);
    }, 0);
    return el;
  }

  function renderAutocompleteDemo(item, index) {
    const inputId = `autocomplete-input-${index}`;
    const suggestionsId = `autocomplete-suggestions-${index}`;
    const el = document.createElement("div");
    el.className = "interactive-demo";
    el.innerHTML = `
      <h3><i class="ph-bold ph-text-t" aria-hidden="true"></i> ${item.title}</h3>
      <p>${item.description}</p>
      <div class="autocomplete-container">
        <label for="${inputId}" class="sr-only">${i18next.t("demos.autocomplete.label")}</label>
        <input type="text" id="${inputId}" class="autocomplete-input"
          placeholder="${i18next.t("demos.autocomplete.placeholder")}"
          role="combobox" aria-autocomplete="list" aria-expanded="false"
          aria-controls="${suggestionsId}" aria-activedescendant="" autocomplete="off">
        <ul class="autocomplete-suggestions" id="${suggestionsId}" role="listbox"></ul>
      </div>`;

    setTimeout(() => {
      const input = document.getElementById(inputId);
      const suggestionsList = document.getElementById(suggestionsId);
      const sampleData = [1, 2, 3, 4, 5].map((n) => i18next.t(`demos.autocomplete.sample${n}`));
      let activeIndex = -1;

      function closeSuggestions() {
        suggestionsList.style.display = "none";
        input.setAttribute("aria-expanded", "false");
        input.setAttribute("aria-activedescendant", "");
        activeIndex = -1;
      }

      function selectItem(value) {
        input.value = value;
        closeSuggestions();
        input.focus();
      }

      function setActiveItem(idx) {
        suggestionsList.querySelectorAll("li").forEach((li, i) => {
          const isActive = i === idx;
          li.setAttribute("aria-selected", isActive);
          li.classList.toggle("is-active", isActive);
          if (isActive) input.setAttribute("aria-activedescendant", li.id);
        });
        activeIndex = idx;
      }

      input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        suggestionsList.innerHTML = "";
        activeIndex = -1;
        if (!query) { closeSuggestions(); return; }

        const filtered = sampleData.filter((d) => d.toLowerCase().includes(query));
        if (filtered.length) {
          filtered.forEach((value, i) => {
            const li = document.createElement("li");
            li.id = `${suggestionsId}-option-${i}`;
            li.setAttribute("role", "option");
            li.setAttribute("aria-selected", "false");
            li.textContent = value;
            li.addEventListener("click", () => selectItem(value));
            suggestionsList.appendChild(li);
          });
          suggestionsList.style.display = "block";
          input.setAttribute("aria-expanded", "true");
        } else {
          closeSuggestions();
        }
      });

      input.addEventListener("keydown", (e) => {
        const items = suggestionsList.querySelectorAll("li");
        if (!items.length) return;
        if (e.key === "ArrowDown") { e.preventDefault(); setActiveItem(Math.min(activeIndex + 1, items.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActiveItem(Math.max(activeIndex - 1, 0)); }
        else if (e.key === "Enter" && activeIndex >= 0) { e.preventDefault(); selectItem(items[activeIndex].textContent); }
        else if (e.key === "Escape") closeSuggestions();
      });

      document.addEventListener("click", (e) => { if (!el.contains(e.target)) closeSuggestions(); });
    }, 0);
    return el;
  }

  function renderDefault(item) {
    const el = document.createElement("div");
    el.className = "guideline-item";
    const formattedText = (item.text || "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    el.innerHTML = `<i class="ph ${item.icon || "ph-bold ph-caret-right"}" aria-hidden="true"></i><p>${formattedText}</p>`;
    return el;
  }

  const demoRenderers = {
    "do-dont": renderDoDont,
    "interactive-demo": renderLargeModeDemo,
    "interactive-tap-size-demo": renderTapSizeDemo,
    "interactive-contrast-demo": renderContrastDemo,
    "interactive-feedback-demo": renderFeedbackDemo,
    "interactive-password-demo": renderPasswordDemo,
    "interactive-walkthrough-demo": renderWalkthroughDemo,
    "interactive-autocomplete-demo": renderAutocompleteDemo,
  };

function showGuidelines(category) {
    currentCategory = category;
    htmlElement.style.setProperty("--accent-color", categoryColors[category] || "#4fd1c5");

    const data = i18next.t(`guidelines.${category}`);
    if (!data || !data.details) {
      console.error(`Dados da diretriz não encontrados para: ${category}`);
      return;
    }

    guidelineTitle.textContent = data.title;
    guidelineDetails.innerHTML = "";

    data.details.forEach((item, index) => {
      const renderer = demoRenderers[item.type] || renderDefault;
      const element = renderer(item, index);
      if (element) guidelineDetails.appendChild(element);
    });

    projectIntro.style.display = "none";
    categoryGrid.style.display = "none";
    guidelinesContent.style.display = "block";
    guidelinesContent.classList.remove("view-fade-in");
    void guidelinesContent.offsetWidth;
    guidelinesContent.classList.add("view-fade-in");
    window.scrollTo(0, 0);
    guidelineTitle.setAttribute("tabindex", "-1");
    guidelineTitle.focus();
  }

  function showGrid() {
    currentCategory = null;
    htmlElement.style.removeProperty("--accent-color");
    guidelinesContent.style.display = "none";
    projectIntro.style.display = "block";
    categoryGrid.style.display = "grid";
    categoryGrid.classList.remove("view-fade-in");
    void categoryGrid.offsetWidth;
    categoryGrid.classList.add("view-fade-in");
    window.scrollTo(0, 0);
  }

async function main() {
    await initializeI18next();

    langPtButton.addEventListener("click", () => switchLanguage("pt"));
    langEnButton.addEventListener("click", () => switchLanguage("en"));

    cards.forEach((card) => {
      card.addEventListener("click", () => showGuidelines(card.dataset.category));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showGuidelines(card.dataset.category);
        }
      });
    });

    backButton.addEventListener("click", showGrid);

    if (menuToggle && menuClose && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
      });
      menuClose.addEventListener("click", () => {
        sidebar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    }

    if (themeToggle) {
      const applySavedTheme = () => {
        const isLight = (localStorage.getItem("theme") || "light") === "light";
        if (isLight) htmlElement.setAttribute("data-theme", "light");
        else htmlElement.removeAttribute("data-theme");
        themeToggle.checked = isLight;
      };

      themeToggle.addEventListener("change", () => {
        const isLight = themeToggle.checked;
        if (isLight) htmlElement.setAttribute("data-theme", "light");
        else htmlElement.removeAttribute("data-theme");
        localStorage.setItem("theme", isLight ? "light" : "dark");
      });

      applySavedTheme();
    }

    updateStaticContent();

    document.querySelectorAll(".profile-picture").forEach((img) => {
      img.addEventListener("error", () => { img.style.display = "none"; });
    });
  }

  main();
});

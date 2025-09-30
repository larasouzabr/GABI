document.addEventListener("DOMContentLoaded", async () => {
  // =========================================================================
  //  1. SELEÇÃO DE ELEMENTOS DO DOM E CONFIGURAÇÕES
  // =========================================================================
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

  // Objeto que mapeia a categoria à sua cor correspondente do card
  const categoryColors = {
    "tamanho-layout": "#3498db",
    "elementos-visuais": "#e74c3c",
    "navegacao-interacao": "#2ecc71",
    "feedback-erros": "#f1c40f",
    "seguranca-confianca": "#9b59b6",
    "aprendizagem-suporte": "#e67e22",
    "funcionalidades-conteudo": "#1abc9c",
    "recomendacoes-gerais": "#3d4c5f", // <<< COR ALTERADA AQUI
  };

  // =========================================================================
  //  2. CONFIGURAÇÃO DO i18next
  // =========================================================================
  async function initializeI18next() {
    try {
      const pt_translation = await fetch("locales/pt.json").then((res) =>
        res.json()
      );
      const en_translation = await fetch("locales/en.json").then((res) =>
        res.json()
      );

      await i18next.init({
        lng: localStorage.getItem("language") || "pt",
        fallbackLng: "pt",
        debug: false,
        resources: {
          pt: pt_translation,
          en: en_translation,
        },
        returnObjects: true,
      });
    } catch (error) {
      console.error("Falha ao inicializar o i18next:", error);
      document.body.innerHTML = `<h1>Erro ao carregar arquivos de tradução. Verifique o console (F12).</h1>`;
    }
  }

  // =========================================================================
  //  3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO
  // =========================================================================

  function updateStaticContent() {
    document.querySelector(".nav-title").textContent = i18next.t("nav_title");
    document.querySelector("#project-intro h1").textContent =
      i18next.t("intro_h1");
    document.querySelector("#project-intro p").textContent =
      i18next.t("intro_p");
    document.querySelector(".main-content h2").textContent =
      i18next.t("guidelines_h2");
    document.querySelector(".site-footer h3").textContent =
      i18next.t("footer_h3");
    backButton.innerHTML = i18next.t("back_button");

    cards.forEach((card) => {
      const categoryKey = card.dataset.category;
      card.querySelector("span").textContent = i18next.t(
        `categories.${categoryKey}`
      );
    });

    const navLinksContainer = document.querySelector(".main-nav");
    navLinksContainer.querySelectorAll("a").forEach((link) => link.remove());

    const categories = i18next.t("categories");
    for (const key in categories) {
      const link = document.createElement("a");
      link.href = `#${key}`;
      link.textContent = categories[key];
      navLinksContainer.appendChild(link);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showGuidelines(key);
        if (sidebar) sidebar.classList.remove("is-open");
      });
    }

    langPtButton.classList.toggle("active", i18next.language === "pt");
    langEnButton.classList.toggle("active", i18next.language === "en");

    if (currentCategory) {
      showGuidelines(currentCategory);
    }
  }

  async function switchLanguage(lang) {
    await i18next.changeLanguage(lang);
    localStorage.setItem("language", lang);
    updateStaticContent();
  }

  function showGuidelines(category) {
    currentCategory = category;

    // ATUALIZAÇÃO: Define a cor de destaque baseada na categoria
    const color = categoryColors[category] || "#4fd1c5"; // Usa uma cor padrão se não encontrar
    htmlElement.style.setProperty("--accent-color", color);

    const data = i18next.t(`guidelines.${category}`);

    if (!data || !data.details) {
      console.error(`Dados da diretriz não encontrados para: ${category}`);
      return;
    }

    guidelineTitle.textContent = data.title;
    guidelineDetails.innerHTML = "";

    data.details.forEach((item, index) => {
      let element;

      switch (item.type) {
        case "do-dont":
          element = document.createElement("div");
          element.className = "do-dont-container";
          element.innerHTML = `
            <div class="do-column">
              <h3 class="do-dont-header"><i class="ph-bold ph-check-circle"></i> ${i18next.t(
                "do_text"
              )}</h3>
              <img src="${item.do.image}" alt="Exemplo de 'faça'">
              <p class="do-dont-caption">${item.do.caption}</p>
            </div>
            <div class="dont-column">
              <h3 class="do-dont-header"><i class="ph-bold ph-x-circle"></i> ${i18next.t(
                "dont_text"
              )}</h3>
              <img src="${item.dont.image}" alt="Exemplo de 'não faça'">
              <p class="do-dont-caption">${item.dont.caption}</p>
            </div>`;
          break;

        case "interactive-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          const demoTextId = `demo-text-${index}`;
          const toggleButtonId = `toggle-mode-button-${index}`;

          element.innerHTML = `
                <h4><i class="ph-bold ph-text-aa"></i> ${item.title}</h4>
                <p>${item.description}</p>
                <div class="demo-controls">
                    <button id="${toggleButtonId}" class="feedback-action-button">${i18next.t(
            "demos.large_mode.toggle_on"
          )}</button>
                </div>
                <div id="${demoTextId}" class="demo-text-area">
                    ${item.demo_text}
                </div>
            `;

          setTimeout(() => {
            const demoText = document.getElementById(demoTextId);
            const toggleButton = document.getElementById(toggleButtonId);

            toggleButton.addEventListener("click", () => {
              demoText.classList.toggle("large-mode");
              const isActive = demoText.classList.contains("large-mode");
              toggleButton.textContent = isActive
                ? i18next.t("demos.large_mode.toggle_off")
                : i18next.t("demos.large_mode.toggle_on");
            });
          }, 0);
          break;

        case "interactive-tap-size-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";

          element.innerHTML = `
              <h4><i class="ph-bold ph-hand-tapping"></i> ${item.title}</h4>
              <p>${item.description}</p>
              <div class="tap-size-demo-container">
                  <div class="tap-column">
                      <h3 class="do-dont-header dont-column"><i class="ph-bold ph-x-circle"></i> ${i18next.t(
                        "dont_text"
                      )}</h3>
                      <div class="tap-button-area">
                          <button class="tap-button bad-size">${i18next.t(
                            "demos.general.option1"
                          )}</button>
                          <button class="tap-button bad-size">${i18next.t(
                            "demos.general.option2"
                          )}</button>
                          <button class="tap-button bad-size">${i18next.t(
                            "demos.general.option3"
                          )}</button>
                      </div>
                  </div>
                  <div class="tap-column">
                      <h3 class="do-dont-header do-column"><i class="ph-bold ph-check-circle"></i> ${i18next.t(
                        "do_text"
                      )}</h3>
                      <div class="tap-button-area">
                          <button class="tap-button good-size">${i18next.t(
                            "demos.general.option1"
                          )}</button>
                          <button class="tap-button good-size">${i18next.t(
                            "demos.general.option2"
                          )}</button>
                          <button class="tap-button good-size">${i18next.t(
                            "demos.general.option3"
                          )}</button>
                      </div>
                  </div>
              </div>
            `;
          break;

        case "interactive-contrast-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          const fontId = `font-slider-${index}`;
          const bgColorId = `bg-color-${index}`;
          const textColorId = `text-color-${index}`;
          const demoAreaId = `contrast-demo-area-${index}`;
          const ratioId = `contrast-ratio-${index}`;

          element.innerHTML = `
                <h4><i class="ph-bold ph-circle-half"></i> ${item.title}</h4>
                <p>${item.description}</p>
                <div class="contrast-controls">
                    <div class="control-group">
                        <label for="${fontId}">${i18next.t(
            "demos.contrast.font_size"
          )}</label>
                        <input type="range" id="${fontId}" min="12" max="24" value="16" step="1">
                    </div>
                    <div class="control-group">
                        <label for="${bgColorId}">${i18next.t(
            "demos.contrast.bg_color"
          )}</label>
                        <input type="color" id="${bgColorId}" value="#2d3748">
                    </div>
                    <div class="control-group">
                        <label for="${textColorId}">${i18next.t(
            "demos.contrast.text_color"
          )}</label>
                        <input type="color" id="${textColorId}" value="#e2e8f0">
                    </div>
                </div>
                <div class="demo-text-area" id="${demoAreaId}" style="background-color: #2d3748; color: #e2e8f0; font-size: 16px;">
                    ${item.demo_text}
                </div>
                <div class="contrast-ratio-display" id="${ratioId}">
                    ${i18next.t("demos.contrast.calculating")}
                </div>
            `;

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
              const a = [r, g, b].map((v) => {
                v /= 255;
                return v <= 0.03928
                  ? v / 12.92
                  : Math.pow((v + 0.055) / 1.055, 2.4);
              });
              return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
            }

            function updateDemo() {
              demoArea.style.fontSize = `${fontSlider.value}px`;
              demoArea.style.backgroundColor = bgColorPicker.value;
              demoArea.style.color = textColorPicker.value;

              const lum1 = getLuminance(bgColorPicker.value);
              const lum2 = getLuminance(textColorPicker.value);
              const ratio =
                lum1 > lum2
                  ? (lum1 + 0.05) / (lum2 + 0.05)
                  : (lum2 + 0.05) / (lum1 + 0.05);

              let level = i18next.t("demos.contrast.status_fail");
              let recommendation = i18next.t(
                "demos.contrast.recommendation_fail"
              );

              if (ratio >= 7) {
                level = i18next.t("demos.contrast.status_aaa");
                recommendation = i18next.t("demos.contrast.recommendation_aaa");
              } else if (ratio >= 4.5) {
                level = i18next.t("demos.contrast.status_aa");
                recommendation = i18next.t("demos.contrast.recommendation_aa");
              } else if (ratio >= 3) {
                level = i18next.t("demos.contrast.status_aa_large");
                recommendation = i18next.t(
                  "demos.contrast.recommendation_aa_large"
                );
              }

              ratioDisplay.innerHTML = `
              ${i18next.t("demos.contrast.ratio_prefix")} 
              <strong>${ratio.toFixed(2)}:1</strong> 
              (${i18next.t("demos.contrast.level_prefix")} ${level})
              <br><small>${recommendation}</small>`;
            }

            fontSlider.addEventListener("input", updateDemo);
            bgColorPicker.addEventListener("input", updateDemo);
            textColorPicker.addEventListener("input", updateDemo);

            updateDemo();
          }, 0);
          break;
        case "interactive-feedback-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";

          element.innerHTML = `
          <h4><i class="ph-bold ph-bell-ringing"></i> ${item.title}</h4>
          <p>${item.description}</p>
          <div class="feedback-demo-container">
              <div class="feedback-demo-controls">
                  <span>${i18next.t("demos.feedback.title")}</span>
                  <div class="radio-group">
                      <input type="radio" id="fb-toast-${index}" name="feedback-type-${index}" value="toast" checked>
                      <label for="fb-toast-${index}"><span class="custom-radio"></span>${i18next.t(
            "demos.feedback.notification"
          )}</label>
                  </div>
                  <div class="radio-group">
                      <input type="radio" id="fb-vibrate-${index}" name="feedback-type-${index}" value="vibrate">
                      <label for="fb-vibrate-${index}"><span class="custom-radio"></span>${i18next.t(
            "demos.feedback.vibration"
          )}</label>
                  </div>
              </div>
              <button class="feedback-action-button">${i18next.t(
                "demos.feedback.action_button"
              )}</button>
              <div class="feedback-toast">${i18next.t(
                "demos.feedback.success_message"
              )}</div>
          </div>`;

          setTimeout(() => {
            const actionButton = element.querySelector(
              ".feedback-action-button"
            );
            const toast = element.querySelector(".feedback-toast");
            const radioButtons = element.querySelectorAll(
              `input[name="feedback-type-${index}"]`
            );

            actionButton.addEventListener("click", () => {
              let selectedValue;
              radioButtons.forEach((radio) => {
                if (radio.checked) {
                  selectedValue = radio.value;
                }
              });

              actionButton.classList.remove("shake");
              toast.classList.remove("show");

              if (selectedValue === "toast") {
                toast.classList.add("show");
                setTimeout(() => {
                  toast.classList.remove("show");
                }, 3000);
              } else if (selectedValue === "vibrate") {
                void actionButton.offsetWidth;
                actionButton.classList.add("shake");
              }
            });
          }, 0);
          break;
        case "interactive-password-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          const inputId = `password-input-${index}`;
          const toggleId = `password-toggle-${index}`;
          const iconId = `password-icon-${index}`;

          element.innerHTML = `
                <h4><i class="ph-bold ph-key"></i> ${item.title}</h4>
                <p>${item.description}</p>
                <div class="password-demo-container">
                    <label for="${inputId}" class="sr-only">${i18next.t(
            "demos.password.label"
          )}</label>
                    <div class="password-input-wrapper">
                        <input type="password" id="${inputId}" value="${i18next.t(
            "demos.password.example_value"
          )}" placeholder="${i18next.t("demos.password.placeholder")}">
                        <button id="${toggleId}" class="password-toggle-button" aria-label="${i18next.t(
            "demos.password.show"
          )}">
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
              if (isPassword) {
                passwordInput.type = "text";
                toggleButton.setAttribute(
                  "aria-label",
                  i18next.t("demos.password.hide")
                );
                toggleIcon.className = "ph ph-eye-slash";
              } else {
                passwordInput.type = "password";
                toggleButton.setAttribute(
                  "aria-label",
                  i18next.t("demos.password.show")
                );
                toggleIcon.className = "ph ph-eye";
              }
            });
          }, 0);
          break;
        case "interactive-walkthrough-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";

          element.innerHTML = `
                <h4><i class="ph-bold ph-steps"></i> ${item.title}</h4>
                <p>${item.description}</p>
                <div class="walkthrough-container">
                    <div class="walkthrough-fake-screen">
                        <div id="wt-saldo" class="fake-element">${i18next.t(
                          "demos.walkthrough.balance"
                        )}</div>
                        <button id="wt-pagar" class="fake-element">${i18next.t(
                          "demos.walkthrough.pay_bills"
                        )}</button>
                        <button id="wt-extrato" class="fake-element">${i18next.t(
                          "demos.walkthrough.view_statement"
                        )}</button>
                        <i id="wt-ajuda" class="ph ph-question fake-element"></i>
                    </div>
                    <div class="walkthrough-overlay">
                        <div class="walkthrough-highlighter"></div>
                        <div class="walkthrough-tooltip">
                            <p class="walkthrough-text"></p>
                            <div class="walkthrough-nav">
                                <button class="walkthrough-prev">&larr; ${i18next.t(
                                  "demos.walkthrough.previous"
                                )}</button>
                                <span class="walkthrough-progress"></span>
                                <button class="walkthrough-next">${i18next.t(
                                  "demos.walkthrough.next"
                                )} &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>`;

          setTimeout(() => {
            const steps = item.steps;
            let currentStep = 0;

            const prevBtn = element.querySelector(".walkthrough-prev");
            const nextBtn = element.querySelector(".walkthrough-next");
            const progressSpan = element.querySelector(".walkthrough-progress");
            const tooltipText = element.querySelector(".walkthrough-text");
            const highlighter = element.querySelector(
              ".walkthrough-highlighter"
            );
            const tooltip = element.querySelector(".walkthrough-tooltip");

            function goToStep(stepIndex) {
              const step = steps[stepIndex];
              tooltipText.textContent = step.text;
              progressSpan.textContent = `${stepIndex + 1} de ${steps.length}`;

              prevBtn.disabled = stepIndex === 0;
              nextBtn.textContent =
                stepIndex === steps.length - 1
                  ? i18next.t("demos.walkthrough.finish")
                  : `${i18next.t("demos.walkthrough.next")} →`;

              if (step.target === "self") {
                highlighter.style.display = "none";
                tooltip.style.top = "50%";
                tooltip.style.left = "50%";
                tooltip.style.transform = "translate(-50%, -50%)";
              } else {
                const targetElement = element.querySelector(step.target);
                if (targetElement) {
                  highlighter.style.display = "block";
                  const targetRect = targetElement.getBoundingClientRect();
                  const containerRect = element
                    .querySelector(".walkthrough-container")
                    .getBoundingClientRect();

                  highlighter.style.width = `${targetRect.width + 20}px`;
                  highlighter.style.height = `${targetRect.height + 20}px`;
                  highlighter.style.top = `${
                    targetRect.top - containerRect.top - 10
                  }px`;
                  highlighter.style.left = `${
                    targetRect.left - containerRect.left - 10
                  }px`;

                  tooltip.style.top = `${
                    targetRect.bottom - containerRect.top + 15
                  }px`;
                  tooltip.style.left = "50%";
                  tooltip.style.transform = "translateX(-50%)";
                }
              }
            }

            nextBtn.addEventListener("click", () => {
              if (currentStep < steps.length - 1) {
                currentStep++;
                goToStep(currentStep);
              }
            });

            prevBtn.addEventListener("click", () => {
              if (currentStep > 0) {
                currentStep--;
                goToStep(currentStep);
              }
            });

            goToStep(0);
          }, 0);
          break;

        case "interactive-autocomplete-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          const inputId2 = `autocomplete-input-${index}`;
          const suggestionsId = `autocomplete-suggestions-${index}`;

          element.innerHTML = `
                  <h4><i class="ph-bold ph-text-t"></i> ${item.title}</h4>
                  <p>${item.description}</p>
                  <div class="autocomplete-container">
                      <label for="${inputId2}" class="sr-only">${i18next.t(
            "demos.autocomplete.label"
          )}</label>
                      <input type="text" id="${inputId2}" class="autocomplete-input" placeholder="${i18next.t(
            "demos.autocomplete.placeholder"
          )}">
                      <ul class="autocomplete-suggestions" id="${suggestionsId}"></ul>
                  </div>`;

          setTimeout(() => {
            const input = document.getElementById(inputId2);
            const suggestionsList = document.getElementById(suggestionsId);
            const sampleData = [
              i18next.t("demos.autocomplete.sample1"),
              i18next.t("demos.autocomplete.sample2"),
              i18next.t("demos.autocomplete.sample3"),
              i18next.t("demos.autocomplete.sample4"),
              i18next.t("demos.autocomplete.sample5"),
            ];

            input.addEventListener("input", () => {
              const query = input.value.toLowerCase();
              suggestionsList.innerHTML = "";
              if (query.length === 0) {
                suggestionsList.style.display = "none";
                return;
              }

              const filteredData = sampleData.filter((item) =>
                item.toLowerCase().includes(query)
              );

              if (filteredData.length > 0) {
                filteredData.forEach((item) => {
                  const li = document.createElement("li");
                  li.textContent = item;
                  li.addEventListener("click", () => {
                    input.value = item;
                    suggestionsList.style.display = "none";
                  });
                  suggestionsList.appendChild(li);
                });
                suggestionsList.style.display = "block";
              } else {
                suggestionsList.style.display = "none";
              }
            });

            document.addEventListener("click", (e) => {
              if (!element.contains(e.target)) {
                suggestionsList.style.display = "none";
              }
            });
          }, 0);
          break;

        default:
          element = document.createElement("div");
          element.className = "guideline-item";
          const textContent = item.text || "";
          const formattedText = textContent.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
          );
          element.innerHTML = `
            <i class="ph ${item.icon || "ph-bold ph-caret-right"}"></i>
            <p>${formattedText}</p>`;
          break;
      }

      if (element) {
        guidelineDetails.appendChild(element);
      }
    });

    projectIntro.style.display = "none";
    categoryGrid.style.display = "none";
    guidelinesContent.style.display = "block";
    window.scrollTo(0, 0);
  }

  function showGrid() {
    currentCategory = null;

    // ATUALIZAÇÃO: Remove a cor customizada para voltar ao padrão do tema
    htmlElement.style.removeProperty("--accent-color");

    guidelinesContent.style.display = "none";
    projectIntro.style.display = "block";
    categoryGrid.style.display = "grid";
    window.scrollTo(0, 0);
  }

  // =========================================================================
  //  4. INICIALIZAÇÃO E EVENT LISTENERS
  // =========================================================================

  async function main() {
    await initializeI18next();

    langPtButton.addEventListener("click", () => switchLanguage("pt"));
    langEnButton.addEventListener("click", () => switchLanguage("en"));

    cards.forEach((card) => {
      card.addEventListener("click", () =>
        showGuidelines(card.dataset.category)
      );
    });

    backButton.addEventListener("click", showGrid);

    if (menuToggle && menuClose && sidebar) {
      menuToggle.addEventListener("click", () =>
        sidebar.classList.add("is-open")
      );
      menuClose.addEventListener("click", () =>
        sidebar.classList.remove("is-open")
      );
    }

    if (themeToggle) {
      const applySavedTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
          htmlElement.setAttribute("data-theme", "light");
          themeToggle.checked = true;
        } else {
          htmlElement.removeAttribute("data-theme");
          themeToggle.checked = false;
        }
      };
      const toggleTheme = () => {
        if (themeToggle.checked) {
          htmlElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        } else {
          htmlElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "dark");
        }
      };
      themeToggle.addEventListener("change", toggleTheme);
      applySavedTheme();
    }

    updateStaticContent();
  }

  main();
});

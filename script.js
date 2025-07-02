// Aguarda o HTML ser completamente carregado antes de executar qualquer código
document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  //  1. SELEÇÃO DE ELEMENTOS DO DOM
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
  const navLinks = document.querySelectorAll(".main-nav a"); // ========================================================================= //  2. DADOS DAS DIRETRIZES (NOVA ESTRUTURA ENRIQUECIDA) // =========================================================================

  const guidelinesData = {
    "tamanho-layout": {
      title: "1. Tamanho e Layout da Interface",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-device-tablet",
          text: "Telas **maiores melhoram significativamente a eficiência** da interação e reduzem erros de operação. Interfaces de 6,0 polegadas, por exemplo, demonstraram uma redução no tempo de conclusão da tarefa e uma taxa de erro menor em comparação com telas menores.",
        },
        {
          type: "default",
          icon: "ph-bold ph-grid-four",
          text: "Layouts combinados podem melhorar a eficiência da interação. Para interfaces de 4,5 polegadas, o layout de nove células é mais útil, enquanto para interfaces maiores, o layout combinado é preferível.",
        },
        {
          type: "do-dont",
          do: {
            image: "img/do-interface.png",
            caption: "Use menos elementos para focar a atenção do usuário.",
          },
          dont: {
            image: "img/dont-interface.png", 
            caption: "Evite excesso de informações que competem entre si.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-target",
          text: "Priorize a **parte central da tela para ações principais**, já que os idosos tendem a focar mais nessa área e podem ter dificuldade em identificar menus superiores e inferiores.",
        },
        {
          type: "interactive-demo",
          title: 'Crie um "Modo Grande"',
          description:
            "Ajuste a interface para usuários com limitações visuais. Este modo aplicaria as recomendações de design e aumentaria o tamanho dos elementos da tela, sendo mais eficaz do que apenas o aumento da fonte pelo sistema operacional.",
          demo_text:
            'Este parágrafo serve como exemplo. Ao ativar o "Modo Grande", você notará que a leitura se torna mais confortável, com fontes maiores e mais espaçadas, facilitando a visualização para quem mais precisa.',
        },
      ],
    },
    "elementos-visuais": {
      title: "2. Elementos Visuais",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-paint-brush",
          text: "Ícones devem ser otimizados e projetados para transmitir informações de forma **clara, compreensível e intuitiva**, com mínima distância semântica entre o ícone e seu significado.",
        },
        {
          type: "default",
          icon: "ph-bold ph-text-aa",
          text: "A legibilidade do Texto é crucial. Fontes pequenas e cores com contraste insuficiente são barreiras significativas. Recomenda-se o uso de **fontes maiores para cabeçalhos** e cores com **alto contraste**.",
        },
        {
          type: "default",
          icon: "ph-bold ph-graph",
          text: "Gráficos e Animações: Embora possam ser úteis, os gráficos para resumir dados devem ser testados rigorosamente com usuários. Ofereça a opção de **desativar a visualização de gráficos** ou resumos.",
        },
      ],
    },
    "navegacao-interacao": {
      title: "3. Navegação e Interação",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-compass",
          text: "Os elementos de navegação devem ser **autoexplicativos, consistentes e facilmente identificáveis**. A funcionalidade do aplicativo deve ser limitada a um núcleo de funcionalidades essenciais.",
        },
        {
          type: "default",
          icon: "ph-bold ph-button",
          text: "Botões e Controles devem ter dimensões adequadas. A altura e a largura dos elementos de interação devem ser de no mínimo 12 mm, com uma área sensível ao toque de pelo menos 15x15 mm.",
        },
        {
          type: "default",
          icon: "ph-bold ph-ruler",
          text: "Garanta **espaço suficiente (mínimo de 6 mm)** entre os elementos interativos para evitar toques acidentais.",
        },
      ],
    },
    "feedback-erros": {
      title: "4. Feedback e Tratamento de Erros",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-speaker-high",
          text: "Forneça **feedback visível e sonoro claro** e inequívoco (com opções de configuração para o usuário) após cada ação ou evento do sistema.",
        },
        {
          type: "default",
          icon: "ph-bold ph-arrows-clockwise",
          text: 'O sistema deve permitir **reverter ações facilmente ("desfazer")**. Forneça mensagens de erro em linguagem clara e compreensível.',
        },
      ],
    },
    "seguranca-confianca": {
      title: "5. Segurança, Confiança e Risco",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-lock",
          text: "A **confiança é um fator crucial** para a adoção de pagamentos móveis pelos idosos. É essencial melhorar a qualidade do serviço, a segurança, a confiabilidade e a proteção da privacidade.",
        },
        {
          type: "default",
          icon: "ph-bold ph-eye",
          text: 'Campos de senha devem incluir uma opção para **revelar a senha em texto simples** (funcionalidade de "mostrar/esconder").',
        },
      ],
    },
    "aprendizagem-suporte": {
      title: "6. Aprendizagem e Suporte",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-presentation-chart",
          text: "O **treinamento operacional situacional (prático)** demonstrou ser mais eficaz do que o treinamento oral, resultando em maior precisão e confiança.",
        },
        {
          type: "default",
          icon: "ph-bold ph-microphone",
          text: "Utilize **narração de áudio** para as ações realizadas no aplicativo. O feedback multimodal com sinais auditivos é benéfico para idosos.",
        },
        {
          type: "default",
          icon: "ph-bold ph-user-list",
          text: "Adapte o design para diferentes faixas etárias dentro da população idosa, criando múltiplas versões da interface do usuário com complexidade variada.",
        },
      ],
    },
    "funcionalidades-conteudo": {
      title: "7. Funcionalidades e Conteúdo",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-gear-six",
          text: "Permita que os usuários **controlem as informações exibidas** e como. O sistema deve aprender as solicitações frequentes dos usuários e permitir acesso rápido.",
        },
        {
          type: "default",
          icon: "ph-bold ph-bell",
          text: "Notifique os usuários sobre pagamentos pendentes de forma eficaz (ex: com cores ou pop-ups) e de maneira **não irritante** (ex: sem bipes).",
        },
      ],
    },
    "recomendacoes-gerais": {
      title: "8. Recomendações Gerais de Design",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-users",
          text: "É fundamental **incorporar as necessidades específicas dos idosos** desde as fases iniciais do desenvolvimento de aplicativos.",
        },
        {
          type: "default",
          icon: "ph-bold ph-identification-badge",
          text: 'Evite o rótulo **"especificamente para idosos"**, pois isso pode afastar esse público. Um design fácil de usar beneficia todos os usuários.',
        },
      ],
    },
  }; // ========================================================================= //  3. FUNÇÃO PRINCIPAL DE NAVEGAÇÃO (REFEITA) // =========================================================================

  function showGuidelines(category) {
    if (!guidelinesData[category]) return;
    const data = guidelinesData[category];
    guidelineTitle.textContent = data.title;
    guidelineDetails.innerHTML = ""; // Limpa o conteúdo anterior

    // Processa cada item da diretriz
    data.details.forEach((item, index) => {
      let element;
      switch (item.type) {
        // --- CASO 1: EXEMPLO "FAÇA E NÃO FAÇA" ---
        case "do-dont":
          element = document.createElement("div");
          element.className = "do-dont-container";
          element.innerHTML = `
              <div class="do-column">
                <h3 class="do-dont-header"><i class="ph-bold ph-check-circle"></i> Faça</h3>
                <img src="${item.do.image}" alt="Exemplo de 'faça'">
                <p class="do-dont-caption">${item.do.caption}</p>
              </div>
              <div class="dont-column">
                <h3 class="do-dont-header"><i class="ph-bold ph-x-circle"></i> Não Faça</h3>
                <img src="${item.dont.image}" alt="Exemplo de 'não faça'">
                <p class="do-dont-caption">${item.dont.caption}</p>
              </div>
            `;
          break;

        // --- CASO 2: DEMO INTERATIVA ---
        case "interactive-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          // ID único para o switch e o texto, para não haver conflito
          const demoId = `demo-toggle-${index}`;
          const textId = `demo-text-${index}`;

          element.innerHTML = `
                  <h4><i class="ph-bold ph-magic-wand"></i> ${item.title}</h4>
                  <p>${item.description}</p>
                  <div class="demo-controls">
                      <span>Modo Normal</span>
                      <label class="theme-switcher" for="${demoId}">
                        <input type="checkbox" id="${demoId}">
                        <span class="slider"></span>
                      </label>
                      <span>Modo Grande</span>
                  </div>
                  <div class="demo-text-area" id="${textId}">
                      ${item.demo_text}
                  </div>
              `;
          // Adiciona o event listener APÓS criar o elemento
          setTimeout(() => {
            const demoToggle = document.getElementById(demoId);
            const demoText = document.getElementById(textId);
            if (demoToggle && demoText) {
              demoToggle.addEventListener("change", () => {
                demoText.classList.toggle("large-mode", demoToggle.checked);
              });
            }
          }, 0);
          break;

        // --- CASO 3: DIRETRIZ PADRÃO COM ÍCONE ---
        default:
          element = document.createElement("div");
          element.className = "guideline-item";
          const formattedText = item.text.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
          );
          element.innerHTML = `
              <i class="ph ${item.icon || "ph-bold ph-caret-right"}"></i>
              <p>${formattedText}</p>
            `;
          break;
      }
      guidelineDetails.appendChild(element);
    }); // Alterna a visibilidade das seções

    categoryGrid.style.display = "none";
    projectIntro.style.display = "none";
    guidelinesContent.style.display = "block";
    window.scrollTo(0, 0);
  }

  function showGrid() {
    guidelinesContent.style.display = "none";
    projectIntro.style.display = "block";
    categoryGrid.style.display = "grid";
    window.scrollTo(0, 0);
  } // ========================================================================= //  4. EVENT LISTENERS (AQUI FICA TODA A INTERATIVIDADE) // ========================================================================= // --- Para os CARDS de categoria ---

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      showGuidelines(category);
    });
  }); // --- Para o BOTÃO de voltar ---

  backButton.addEventListener("click", showGrid); // --- LÓGICA CORRIGIDA PARA OS LINKS DA NAVBAR ---

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href"); // Apenas para links que começam com '#'

      if (href && href.startsWith("#")) {
        event.preventDefault();
        const category = href.substring(1);
        showGuidelines(category);
        if (sidebar) {
          sidebar.classList.remove("is-open");
        }
      }
    });
  }); // --- Para o MENU HAMBÚRGUER ---

  if (menuToggle && menuClose && sidebar) {
    menuToggle.addEventListener("click", () =>
      sidebar.classList.add("is-open")
    );
    menuClose.addEventListener("click", () =>
      sidebar.classList.remove("is-open")
    );
  } // --- Para o SELETOR DE TEMA ---

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
});

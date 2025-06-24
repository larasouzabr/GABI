// Aguarda o HTML ser completamente carregado antes de executar qualquer código
document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  //  1. SELEÇÃO DE ELEMENTOS DO DOM
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
  const navLinks = document.querySelectorAll(".main-nav a");

  // =========================================================================
  //  2. DADOS DAS DIRETRIZES (conteúdo de cada categoria)
  // =========================================================================
  const guidelinesData = {
    "tamanho-layout": {
      title: "1. Tamanho e Layout da Interface (Screen Size & Layout)",

      details: [
        "Telas maiores melhoram significativamente a eficiência da interação e reduzem erros de operação para usuários idosos. Interfaces de 6,0 polegadas, por exemplo, demonstraram uma redução no tempo de conclusão da tarefa e uma taxa de erro menor em comparação com telas menores. Elas também levam a uma aquisição de informações mais eficiente, com menos pontos e tempo de fixação do olhar do usuário.",

        "Layouts combinados podem melhorar a eficiência da interação e reduzir erros, facilitando o acesso a informações e oferecendo um efeito interativo superior. No entanto, para interfaces de 4,5 polegadas, o layout de nove células é mais útil, enquanto para interfaces de 5,5 e 6,0 polegadas, o layout combinado é preferível.",

        "Reduzir a quantidade de elementos visuais por tela é crucial, pois muitos elementos, especialmente aqueles com menos destaque, podem passar despercebidos.",

        "Priorizar a parte central da tela para ações principais, já que os idosos tendem a focar mais nessa área e podem ter dificuldade em identificar menus superiores e inferiores.",

        'Crie um "modo grande" (semelhante a um tema claro/escuro) para ajustar a interface para usuários com limitações visuais. Este modo aplicaria as recomendações de design e aumentaria o tamanho dos elementos da tela, o que é mais eficaz do que apenas o aumento da fonte pelo sistema operacional, que pode causar distorções. Este modo poderia ser habilitado por padrão para usuários acima de 60 anos, com uma opção para desativá-lo.',
      ],
    },

    "elementos-visuais": {
      title: "2. Elementos Visuais (Textos, Ícones, Cores, Gráficos)",

      details: [
        "Otimização de Ícones e Elementos Gráficos: Ícones devem ser otimizados e projetados para transmitir informações de forma clara, compreensível e intuitiva, com mínima distância semântica entre o ícone e seu significado. A padronização, a cor e a forma são fatores-chave para o entendimento dos ícones.",

        "Evite ícones abstratos e muito pequenos, que são frequentemente difíceis para idosos entenderem. Testar ícones com usuários é essencial para garantir seu mapeamento adequado.",

        "Ícones devem ter um significado semanticamente próximo, ser familiares, rotulados e concretos, representando objetos do mundo real. Considere permitir que os usuários escolham ícones de um conjunto de opções.",

        "Legibilidade do Texto: Fontes pequenas e cores com contraste insuficiente são barreiras significativas. Recomenda-se o uso de fontes maiores para cabeçalhos e cores com alto contraste. Preferencialmente, utilize as fontes padrão do sistema operacional e, se usar uma fonte personalizada, garanta um tamanho mínimo de 12pt.",

        "Evite combinações de cores complementares (como vermelho/verde) e assegure contraste suficiente. Distinga créditos e débitos com cores associadas culturalmente (ex: verde para créditos e vermelho para débitos).",

        "Organização e Apresentação do Conteúdo: Apresente informações importantes de forma destacada (ex: valores totais de transações). Separe visualmente diferentes tipos de atividades financeiras, como renda e despesa.",

        "Gráficos e Animações: Embora possam ser úteis, os gráficos para resumir dados devem ser testados rigorosamente com usuários, pois podem desacelerar a interação. Ofereça a opção de desativar a visualização de gráficos ou resumos. Evite elementos puramente cosméticos ou animações piscantes.",
      ],
    },

    "navegacao-interacao": {
      title: "3. Navegação e Interação",

      details: [
        "Navegação Clara e Intuitiva: Os elementos de navegação devem ser autoexplicativos, consistentes e facilmente identificáveis. Informações claras sobre o item de menu atual ajudam na navegação. A funcionalidade do aplicativo deve ser limitada a um núcleo de funcionalidades essenciais.",

        "Estrutura da Navegação: Minimize o número de elementos de navegação. Se a rolagem da tela for necessária, utilize indicativos visuais (como partes de botões ou ícones) para mostrar que há mais conteúdo disponível.",

        "Botões e Controles: Devem ter dimensões adequadas. A altura e a largura dos elementos de interação devem ser de no mínimo 12 mm, com uma área sensível ao toque de pelo menos 15x15 mm.",

        "Espaçamento: Garanta espaço suficiente (mínimo de 6 mm) entre os elementos interativos para evitar toques acidentais.",

        'Eventos de Toque: Substitua botões de "próximo" por eventos de deslizar (swipe) para tarefas passo a passo, o que ajuda os idosos a entender a sequência e o progresso.',

        "Evite menus de rolagem (scrolling menus), pois os idosos geralmente não os apreciam e podem confundir a barra de rolagem com o fim da página.",

        "Distinga claramente elementos clicáveis de não clicáveis.",

        "Campos de Entrada de Dados: Inclua dicas de ferramentas (tooltips) ao lado dos campos de entrada para informar o tipo de dado solicitado.",

        "Zoom: Ofereça uma função de zoom (in-built zoom-in e zoom-out) que possa ser controlada por gestos manuais.",
      ],
    },

    "feedback-erros": {
      title: "4. Feedback e Tratamento de Erros",

      details: [
        "Feedback Claro: Forneça feedback visível e sonoro claro e inequívoco (com opções de configuração para o usuário) após cada ação ou evento do sistema.",

        "Vibração: Adicione feedback de vibração para mudanças de status específicas ou inesperadas para atrair a atenção do usuário.",

        "Indicação de Progresso: Quando uma ação está em andamento (ex: carregando um resumo, enviando um extrato), indique claramente o progresso para evitar que o usuário tente a mesma ação novamente.",

        'Recuperação de Erros: O sistema deve permitir reverter ações facilmente ("desfazer"). Forneça mensagens de erro em linguagem clara e compreensível, descrevendo o problema de forma precisa e sugerindo uma solução.',

        "Suporte na Recuperação: Embora as mensagens de erro possam não ser um desafio principal para alguns idosos, outros estudos apontam que mecanismos de recuperação de erros baseados em toque são difíceis devido a problemas motores.",
      ],
    },

    "seguranca-confianca": {
      title: "5. Segurança, Confiança e Risco",

      details: [
        "Construir Confiança e Reduzir o Risco: A confiança é um fator crucial para a adoção de pagamentos móveis pelos idosos, e a percepção de risco impacta negativamente essa adoção. É essencial melhorar a qualidade do serviço, a segurança, a confiabilidade e a proteção da privacidade dos sistemas de pagamento móvel.",

        "Transparência da Informação: Inclua mensagens informativas sobre a segurança dos dados transmitidos e orientações para evitar o compartilhamento de dados com pessoas não confiáveis.",

        'Formalizar o Suporte de Terceiros: Reconhecer e formalizar o papel de "procuradores não oficiais" (pessoas próximas que auxiliam os idosos) no suporte às atividades bancárias. Isso poderia envolver permitir que essas pessoas acessem contas (com verificação de procuração), mas com certas funcionalidades "acinzentadas" ou restritas, para que o idoso mantenha o controle financeiro. Essa formalização pode reduzir riscos e a probabilidade de um terceiro comprometer as finanças do idoso.',

        'Privacidade de Senhas: Campos de senha devem incluir uma opção para revelar a senha em texto simples (funcionalidade de "mostrar/esconder").',

        "Gerenciamento de Risco: Desenvolvedores de plataformas de pagamento móvel devem adotar medidas cuidadosas de controle de risco, mitigando riscos associados a sistemas de pagamento, riscos financeiros e riscos de informações pessoais.",
      ],
    },

    "aprendizagem-suporte": {
      title: "6. Aprendizagem e Suporte",

      details: [
        "Treinamento e Orientação: O treinamento é fundamental para o entendimento de ícones e interfaces. O treinamento operacional situacional (prático) demonstrou ser mais eficaz do que o treinamento oral, resultando em maior precisão, confiança e tempo de resposta mais longo.",

        "Suporte no Aplicativo: Ajude os usuários a entender como as funções operam, minimizando a necessidade de buscar ajuda externa.",

        'Recursos de Aprendizagem "Scaffolded": Ofereça instruções passo a passo com estados "pré-ação" e "pós-ação" para cada etapa importante. Isso ajuda os idosos a saber onde estão no processo, o que esperar e para onde se dirigir em seguida.',

        "Walkthroughs Estruturados: Implemente orientações passo a passo estruturadas para tarefas bancárias específicas (ex: pagar contas), onde a plataforma de banco digital guia as interações de forma clara, indicando o progresso da tarefa.",

        "Áudio e Multimodalidade: Utilize narração de áudio para as ações realizadas no aplicativo. O feedback multimodal com sinais auditivos é benéfico para idosos, especialmente em tarefas móveis.",

        'Assistentes Inteligentes Interativos: Permita que os idosos façam perguntas quando confusos para compensar a baixa "percepção da informação" (quando não sabem o que fazer) e o suporte insuficiente para recuperação de erros. Assistentes de voz inteligentes (VUIs) mostram-se promissores.',

        "Personalização da Aprendizagem: Adapte o design para diferentes faixas etárias dentro da população idosa, criando múltiplas versões da interface do usuário com complexidade variada (design de interface multi-camadas). A interface mais apropriada deve ser entregue em cada etapa, com base nas interações dos usuários.",

        "Experiência de Suporte: O suporte presencial é o mais valioso para incutir confiança nos idosos ao usar plataformas de banco digital. Contudo, as plataformas devem ser flexíveis para diferentes modos de suporte (presencial, remoto e semi-suportado).",
      ],
    },

    "funcionalidades-conteudo": {
      title: "7. Funcionalidades e Conteúdo",

      details: [
        "Personalização: Permita que os usuários controlem as informações exibidas e como. O sistema deve aprender as solicitações frequentes dos usuários e permitir acesso rápido a essas informações.",

        'Consistência de Dados: O design deve garantir consistência entre os diferentes extratos de conta do cliente, apresentando uma "imagem coesa" que conecta os componentes entre os extratos.',

        "Alertas e Notificações: Notifique os usuários sobre pagamentos pendentes de forma eficaz (ex: com cores ou pop-ups) e de maneira não irritante (ex: sem bipes).",

        "Automação: Utilize a conclusão automática para evitar digitação desnecessária e reduzir erros.",

        "Design Skeuomórfico: Aplique o design skeuomórfico a elementos da interface (ex: recibos) para trazer familiaridade aos idosos, especialmente àqueles que estão começando a usar o banco digital.",
      ],
    },

    "recomendacoes-gerais": {
      title: "8. Recomendações Gerais de Design",

      details: [
        "Priorizar as Necessidades dos Idosos: É fundamental incorporar as necessidades específicas dos idosos desde as fases iniciais do desenvolvimento de aplicativos. O design deve ser claro, fácil de entender, legível e seguro.",

        'Evitar Rotulagem Exclusiva: Evite o rótulo "especificamente para idosos", pois isso pode afastar esse público. Um design fácil de usar beneficia todos os usuários.',

        "Design Centrado no Usuário: Adoção de conceitos de design centrados no usuário idoso é crucial. Trabalhe com usuários idosos para projetar conteúdo de serviço de tecnologia de pagamento móvel que atenda às suas necessidades individuais.",

        "Eficiência: Otimize os fluxos de interação para reduzir o tempo de espera em bancos físicos.",

        "Qualidade da Informação e do Serviço: Os sistemas de pagamento devem fornecer informações e serviços de alta qualidade aos usuários, com foco em informações completas sobre o produto e capacidade de resposta confiável.",
      ],
    },
  };

  // =========================================================================
  //  3. FUNÇÕES PRINCIPAIS DE NAVEGAÇÃO
  // =========================================================================
  function showGuidelines(category) {
    if (!guidelinesData[category]) return;
    const data = guidelinesData[category];
    guidelineTitle.textContent = data.title;
    guidelineDetails.innerHTML = "";
    const ul = document.createElement("ul");
    data.details.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    guidelineDetails.appendChild(ul);
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
  }

  // =========================================================================
  //  4. EVENT LISTENERS (AQUI FICA TODA A INTERATIVIDADE)
  // =========================================================================

  // --- Para os CARDS de categoria ---
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      showGuidelines(category);
    });
  });

  // --- Para o BOTÃO de voltar ---
  backButton.addEventListener("click", showGrid);

  // --- LÓGICA CORRIGIDA PARA OS LINKS DA NAVBAR ---
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      // Apenas para links que começam com '#'
      if (href && href.startsWith("#")) {
        // 1. Previne o comportamento padrão de "pular" para a âncora
        event.preventDefault();

        // 2. Extrai o nome da categoria do link (ex: '#tamanho-layout' -> 'tamanho-layout')
        const category = href.substring(1);

        // 3. Chama a função para mostrar a diretriz correta
        showGuidelines(category);

        // 4. Fecha a sidebar (caso esteja no modo mobile)
        if (sidebar) {
          sidebar.classList.remove("is-open");
        }
      }
    });
  });

  // --- Para o MENU HAMBÚRGUER ---
  if (menuToggle && menuClose && sidebar) {
    menuToggle.addEventListener("click", () =>
      sidebar.classList.add("is-open")
    );
    menuClose.addEventListener("click", () =>
      sidebar.classList.remove("is-open")
    );
  }

  // --- Para o SELETOR DE TEMA ---
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

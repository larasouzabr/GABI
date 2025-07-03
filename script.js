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
  //  2. DADOS DAS DIRETRIZES
  // =========================================================================
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
          text: "<strong>Otimização de Ícones:</strong> Ícones devem ser otimizados e projetados para transmitir informações de forma clara, compreensível e intuitiva, com mínima distância semântica entre o ícone e seu significado. **A padronização, a cor e a forma** são fatores-chave para o entendimento dos ícones.",
        },
        {
          type: "default",
          icon: "ph-bold ph-strategy",
          text: "<strong>Boas Práticas para Ícones:</strong> Ícones devem ter um significado semanticamente próximo, ser **familiares, rotulados e concretos**, representando objetos do mundo real. Evite ícones abstratos e muito pequenos, que são difíceis para idosos entenderem. Considere permitir que os usuários escolham ícones de um conjunto de opções e sempre teste-os para garantir o mapeamento adequado.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Ícone+Concreto\\ne+Rotulado", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Use ícones concretos, familiares e sempre que possível, acompanhados de um rótulo de texto claro.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Ícone+Abstrato\\ne+Sem+Rótulo", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Evite ícones abstratos ou muito estilizados, que podem não ser compreendidos universalmente pelo público 60+.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-text-aa",
          text: "<strong>Legibilidade do Texto:</strong> Fontes pequenas e cores com contraste insuficiente são barreiras significativas. Recomenda-se o uso de **fontes maiores para cabeçalhos** e cores com **alto contraste**. Preferencialmente, utilize as fontes padrão do sistema operacional e, se usar uma fonte personalizada, garanta um tamanho mínimo de 12pt.",
        },
        {
          type: "interactive-contrast-demo",
          title: "Teste de Legibilidade Interativo",
          description:
            "Use os controles abaixo para ver como o tamanho da fonte e o contraste de cores afetam a facilidade de leitura na prática.",
          demo_text:
            "A tecnologia pode ser uma grande aliada na terceira idade, promovendo independência e conexão. Garantir que as interfaces digitais sejam acessíveis é um passo fundamental para a inclusão.",
        },
        {
          type: "default",
          icon: "ph-bold ph-palette",
          text: "<strong>Uso de Cores:</strong> Evite combinações de cores complementares (como vermelho/verde) e assegure contraste suficiente. Distinga créditos e débitos com cores associadas culturalmente (ex: **verde para créditos e vermelho para débitos**).",
        },
        {
          type: "default",
          icon: "ph-bold ph-eye",
          text: "<strong>Organização e Apresentação do Conteúdo:</strong> Apresente informações importantes de forma **destacada** (ex: valores totais de transações). Separe visualmente diferentes tipos de atividades financeiras, como renda e despesa.",
        },
        {
          type: "default",
          icon: "ph-bold ph-video",
          text: "<strong>Gráficos e Animações:</strong> Embora possam ser úteis, os gráficos para resumir dados devem ser testados rigorosamente com usuários. Ofereça a opção de **desativar a visualização de gráficos** ou resumos. Evite elementos puramente cosméticos ou animações piscantes.",
        },
      ],
    },
    "navegacao-interacao": {
      title: "3. Navegação e Interação",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-compass",
          text: "<strong>Navegação Clara e Intuitiva:</strong> Os elementos de navegação devem ser **autoexplicativos, consistentes e facilmente identificáveis**. A funcionalidade do aplicativo deve ser limitada a um núcleo de funcionalidades essenciais para evitar sobrecarga.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Navegação+Simples\\n(Máx+5+itens)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Menus com poucas opções essenciais são mais fáceis de navegar e memorizar.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Navegação+Complexa\\n(Muitos+itens)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Evite excesso de menus e submenus, que podem confundir e sobrecarregar o usuário.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-git-commit",
          text: "<strong>Distinção de Elementos:</strong> É fundamental **distinguir claramente elementos clicáveis de não clicáveis** através de cor, forma e sombreamento, para que o usuário saiba exatamente onde pode interagir.",
        },
        {
          type: "interactive-tap-size-demo",
          title: "Teste de Área de Toque",
          description:
            "A precisão motora pode diminuir com a idade. Botões grandes e bem espaçados previnem toques acidentais e frustração. Tente clicar nos botões abaixo para sentir a diferença.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Gesto+de+Deslizar\\n(Swipe)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Para tarefas sequenciais (como um passo a passo), o gesto de deslizar (swipe) é intuitivo e ajuda a entender o progresso.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Botão+'Próximo'", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Pequenos botões de 'Próximo' podem ser difíceis de acertar e quebram a fluidez da tarefa.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-info",
          text: "<strong>Dicas em Campos de Entrada:</strong> Inclua **dicas de ferramentas (tooltips)** ou textos de ajuda claros ao lado dos campos de formulário para informar o tipo de dado solicitado e o formato esperado (Ex: DD/MM/AAAA).",
        },
        {
          type: "default",
          icon: "ph-bold ph-magnifying-glass-plus",
          text: "<strong>Função de Zoom:</strong> Sempre ofereça uma **função de zoom nativa no aplicativo**, que possa ser controlada por gestos de pinça, permitindo que os usuários ajustem o conteúdo para sua necessidade visual.",
        },
      ],
    },
    "feedback-erros": {
      title: "4. Feedback e Tratamento de Erros",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-chat-circle-dots",
          text: "Um bom feedback informa ao usuário o que está acontecendo e o orienta sobre o que fazer. Para o público 60+, essa comunicação clara é essencial para construir confiança e reduzir a ansiedade durante o uso do aplicativo.",
        },
        {
          type: "interactive-feedback-demo",
          title: "Demonstração de Tipos de Feedback",
          description:
            "Após uma ação, o sistema precisa responder. Veja abaixo diferentes formas de fornecer feedback ao usuário. Escolha um tipo de feedback e clique no botão para ver o resultado.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Barra+de+Progresso\\nClara", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Sempre indique que uma ação está em andamento com um indicador de progresso, como uma barra ou um spinner.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Tela+Congelada\\nSem+Feedback", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Nunca deixe a tela estática após uma ação. A ausência de feedback faz o usuário pensar que o app travou.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-arrows-clockwise",
          text: "<strong>Recuperação de Erros:</strong> O sistema deve sempre permitir **reverter uma ação facilmente** através de um botão 'Desfazer'. Isso dá segurança para o usuário explorar sem medo de cometer erros permanentes.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Mensagem+Clara\\ne+Solução", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Mensagem de erro: 'Ops! A senha precisa ter 8 dígitos. Por favor, tente novamente.'",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Mensagem+Técnica\\nSem+Ajuda", // SUBSTITUA PELA SUA IMAGEM
            caption: "Mensagem de erro: 'Erro #AU401: Falha na autenticação.'",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-warning-circle",
          text: "<strong>Suporte na Recuperação:</strong> Lembre-se que mecanismos para fechar janelas de erro ou acionar um 'desfazer' também precisam de **botões grandes e fáceis de tocar**, respeitando as diretrizes de tamanho e espaçamento.",
        },
      ],
    },
    "seguranca-confianca": {
      title: "5. Segurança, Confiança e Risco",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-shield-check",
          text: "<strong>Construir Confiança e Reduzir o Risco:</strong> A confiança é um fator crucial para a adoção de pagamentos móveis pelos idosos. É essencial melhorar a **qualidade do serviço, a segurança, a confiabilidade e a proteção da privacidade** dos sistemas.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Conexão+Segura", 
            caption:
              "Inclua mensagens e ícones que reforcem a segurança, como 'Conexão Segura' ou um cadeado visível.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Sem+Indicador+de+Segurança", 
            caption:
              "A ausência de indicadores de segurança pode gerar desconfiança e medo de prosseguir com a operação.",
          },
        },
        {
          type: "interactive-password-demo",
          title: "Privacidade e Visibilidade de Senhas",
          description:
            "Digitar senhas pode ser difícil, e erros são comuns. Oferecer um botão para mostrar/esconder a senha digitada reduz a frustração e aumenta a confiança do usuário. Clique no ícone de olho para testar.",
        },
        {
          type: "default",
          icon: "ph-bold ph-users-three",
          text: '<strong>Formalizar o Suporte de Terceiros:</strong> Reconheça o papel de "procuradores" (familiares, amigos) criando um "Modo Ajudante". Esse modo daria acesso limitado à conta (ex: apenas para consulta), restringindo ações críticas como transferências ou exclusão, mantendo o controle financeiro com o titular idoso.',
        },
        {
          type: "default",
          icon: "ph-bold ph-lifebuoy",
          text: "<strong>Gerenciamento de Risco:</strong> Desenvolvedores devem adotar medidas cuidadosas de controle de risco, mitigando perigos associados a sistemas, finanças e informações pessoais, e sendo transparentes sobre essas medidas.",
        },
      ],
    },
    "aprendizagem-suporte": {
      title: "6. Aprendizagem e Suporte",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-student",
          text: "<strong>Treinamento e Orientação:</strong> O treinamento é fundamental para a confiança. O **treinamento prático e contextual ('situacional')** dentro do próprio aplicativo é muito mais eficaz do que manuais ou explicações verbais.",
        },
        {
          type: "interactive-walkthrough-demo",
          title: "Demonstração de um Guia Passo a Passo",
          description:
            'A aprendizagem "scaffolded" (em andaimes) e os "walkthroughs" estruturados guiam o usuário em sua primeira interação com uma tarefa, como pagar uma conta. Use os botões "Anterior" e "Próximo" para navegar pelo tutorial simulado abaixo.',
          steps: [
            {
              target: "#wt-saldo",
              text: "Passo 1: Este é o seu saldo disponível. É sempre bom verificá-lo antes de qualquer operação.",
            },
            {
              target: "#wt-pagar",
              text: "Passo 2: Para pagar uma conta, clique no botão 'Pagar Contas'. Vamos começar por aqui.",
            },
            {
              target: "#wt-extrato",
              text: "Passo 3: Se precisar ver suas transações passadas, o botão 'Ver Extrato' te levará para o histórico.",
            },
            {
              target: "#wt-ajuda",
              text: "Passo 4: Se tiver qualquer dúvida, o botão de 'Ajuda' está sempre visível no canto da tela.",
            },
            {
              target: "self",
              text: "Tutorial concluído! Guias como este ajudam o usuário a aprender fazendo, de forma segura e contextual.",
            },
          ],
        },
        {
          type: "default",
          icon: "ph-bold ph-microphone",
          text: "<strong>Áudio e Multimodalidade:</strong> Utilize narração de áudio para as ações realizadas e para ler informações importantes. O feedback com sinais auditivos é muito benéfico, especialmente para quem tem dificuldades visuais.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Assistente+Virtual\\nFácil+de+Acessar", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Ofereça um assistente virtual (VUI) ou um botão de ajuda sempre visível para tirar dúvidas rápidas.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Ajuda+Escondida\\nem+Menus", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Não esconda a seção de ajuda em menus complexos. O suporte precisa ser encontrado sem esforço.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-users-four",
          text: "<strong>Personalização e Suporte Humano:</strong> Adapte a complexidade da interface ao nível do usuário (iniciante/avançado). Acima de tudo, lembre-se que o **suporte presencial ou por telefone** ainda é o mais valioso para construir confiança.",
        },
      ],
    },
    "funcionalidades-conteudo": {
      title: "7. Funcionalidades e Conteúdo",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-user-focus",
          text: "<strong>Personalização:</strong> Permita que os usuários controlem as informações exibidas. O sistema deve **aprender as solicitações frequentes** dos usuários e permitir acesso rápido a essas informações, como criar atalhos para as operações mais usadas.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Dashboard+com\\nAtalhos+Pessoais", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Uma tela inicial com atalhos personalizados economiza tempo e cliques.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Dashboard+Genérico\\npara+Todos", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Uma tela genérica força o usuário a procurar as mesmas funções repetidamente.",
          },
        },
        {
          type: "interactive-autocomplete-demo",
          title: "Automação com Preenchimento Automático",
          description:
            "A digitação é uma fonte comum de erros e esforço. Utilize a função de autocompletar para sugerir contatos ou informações já salvas, minimizando a necessidade de digitar. Comece a digitar um nome no campo abaixo (ex: 'Maria').",
        },
        {
          type: "default",
          icon: "ph-bold ph-stack-simple",
          text: "<strong>Consistência de Dados:</strong> O design deve garantir consistência entre os diferentes extratos e seções do aplicativo, apresentando uma **'imagem coesa'** que conecta os componentes. O mesmo dado deve ter sempre a mesma aparência.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Recibo+Skeuomórfico\\n(Familiar)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Um recibo digital que imita um recibo de papel é instantaneamente familiar e fácil de entender.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Recibo+com+Dados\\nNão+Formatados", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Dados apresentados de forma crua, sem formatação familiar, podem causar confusão e desconfiança.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-bell",
          text: "<strong>Alertas e Notificações:</strong> Notifique os usuários sobre pagamentos pendentes de forma **eficaz (clara e visível), mas não irritante (sem bipes ou pop-ups que bloqueiam a tela)**. Um banner sutil no topo da tela é uma ótima abordagem.",
        },
      ],
    },
    "recomendacoes-gerais": {
      title: "8. Recomendações Gerais de Design",
      details: [
        {
          type: "default",
          icon: "ph-bold ph-hand-heart",
          text: "<strong>Priorizar as Necessidades dos Idosos:</strong> É fundamental incorporar as necessidades específicas do público 60+ desde as fases iniciais do desenvolvimento. O design deve ter como pilares ser **claro, fácil de entender, legível e seguro**.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=App+Fácil+para+Todos", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Posicione o produto como 'fácil de usar para todos'. Um bom design inclusivo beneficia cada usuário, independentemente da idade.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=App+da+Terceira+Idade", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Evite o rótulo 'especificamente para idosos', pois isso pode criar estigmas e afastar esse público.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-users-four",
          text: "<strong>Design Centrado no Usuário:</strong> Adoção de conceitos de design centrado no usuário idoso é crucial. **Trabalhe com usuários idosos** para projetar e testar o conteúdo e as funcionalidades, garantindo que a solução atenda às suas necessidades reais.",
        },
        {
          type: "do-dont",
          do: {
            image:
              "https://placehold.co/400x300/2ecc71/ffffff?text=Fluxo+Otimizado\\n(4+Passos)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Otimize os fluxos de interação para que tarefas comuns sejam concluídas no menor número de passos possível.",
          },
          dont: {
            image:
              "https://placehold.co/400x300/e74c3c/ffffff?text=Fluxo+Longo\\n(7+Passos)", // SUBSTITUA PELA SUA IMAGEM
            caption:
              "Processos longos e com muitas etapas aumentam a chance de erro e a frustração do usuário.",
          },
        },
        {
          type: "default",
          icon: "ph-bold ph-seal-check",
          text: "<strong>Qualidade da Informação e do Serviço:</strong> Os sistemas devem fornecer informações e serviços de alta qualidade, com foco em dados completos sobre o produto e uma capacidade de resposta confiável e consistente.",
        },
      ],
    },
  };

  // =========================================================================
  //  3. FUNÇÃO PRINCIPAL DE NAVEGAÇÃO (NÃO PRECISA DE MUDANÇA)
  // =========================================================================
  function showGuidelines(category) {
    if (!guidelinesData[category]) return;
    const data = guidelinesData[category];
    guidelineTitle.textContent = data.title;
    guidelineDetails.innerHTML = ""; // Limpa o conteúdo anterior

    // Processa cada item da diretriz
    data.details.forEach((item, index) => {
      let element;
      switch (item.type) {
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

        case "interactive-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
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
        // --- NOVO CASO: DEMO DE TAMANHO DE BOTÕES ---
        case "interactive-tap-size-demo":
          element = document.createElement("div");
          element.className = "interactive-demo";
          const feedbackId = `tap-feedback-${index}`;

          element.innerHTML = `
        <h4><i class="ph-bold ph-hand-tapping"></i> ${item.title}</h4>
        <p>${item.description}</p>
        <div class="tap-size-demo-container">
            <div class="tap-column">
                <h3 class="do-dont-header"><i class="ph-bold ph-check-circle"></i> Recomendado</h3>
                <div class="tap-button-area">
                    <button class="tap-button good-size">Salvar</button>
                    <button class="tap-button good-size">Cancelar</button>
                    <button class="tap-button good-size">Ver Detalhes</button>
                </div>
            </div>
             <div class="tap-column">
                <h3 class="do-dont-header"><i class="ph-bold ph-x-circle"></i> Não Recomendado</h3>
                 <div class="tap-button-area">
                    <button class="tap-button bad-size">Salvar</button>
                    <button class="tap-button bad-size">Cancelar</button>
                    <button class="tap-button bad-size">Detalhes</button>
                </div>
            </div>
        </div>
        <div class="tap-feedback" id="${feedbackId}"></div>
    `;

          setTimeout(() => {
            const buttons = element.querySelectorAll(".tap-button");
            const feedbackArea = element.querySelector(`#${feedbackId}`);

            buttons.forEach((button) => {
              button.addEventListener("click", () => {
                feedbackArea.textContent = "Ação registrada com sucesso!";
                feedbackArea.style.opacity = "1";
                setTimeout(() => {
                  feedbackArea.style.opacity = "0";
                }, 2000);
              });
            });
          }, 0);
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
                        <label for="${fontId}">Tamanho da Fonte</label>
                        <input type="range" id="${fontId}" min="12" max="24" value="16" step="1">
                    </div>
                    <div class="control-group">
                        <label for="${bgColorId}">Cor do Fundo</label>
                        <input type="color" id="${bgColorId}" value="#2d3748">
                    </div>
                    <div class="control-group">
                        <label for="${textColorId}">Cor do Texto</label>
                        <input type="color" id="${textColorId}" value="#e2e8f0">
                    </div>
                </div>
                <div class="demo-text-area" id="${demoAreaId}" style="background-color: #2d3748; color: #e2e8f0; font-size: 16px;">
                    ${item.demo_text}
                </div>
                <div class="contrast-ratio-display" id="${ratioId}">
                    Taxa de Contraste: Calculando...
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

              let level = "Falha";
              let recommendation = "Contraste muito baixo.";
              if (ratio >= 3) {
                level = "AA (Texto Grande)";
                recommendation = "Aceitável para textos grandes.";
              }
              if (ratio >= 4.5) {
                level = "AA";
                recommendation = "Bom contraste para leitura normal.";
              }
              if (ratio >= 7) {
                level = "AAA";
                recommendation = "Contraste excelente, ideal para todos.";
              }

              ratioDisplay.innerHTML = `Taxa de Contraste: <strong>${ratio.toFixed(
                2
              )}:1</strong> (Nível WCAG: ${level})<br><small>${recommendation}</small>`;
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
                  <span>Tipo de Feedback:</span>
                  
               <div class="radio-group">
    <input type="radio" id="fb-toast-${index}" name="feedback-type-${index}" value="toast" checked>
    <label for="fb-toast-${index}">
        <span class="custom-radio"></span>
        Notificação
    </label>
</div>

<div class="radio-group">
    <input type="radio" id="fb-vibrate-${index}" name="feedback-type-${index}" value="vibrate">
    <label for="fb-vibrate-${index}">
        <span class="custom-radio"></span>
        Vibração (Simul.)
    </label>
</div>

              </div>
              <button class="feedback-action-button">Confirmar Ação</button>
              <div class="feedback-toast">Ação confirmada com sucesso!</div>
          </div>
      `;

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
                    <label for="${inputId}" class="sr-only">Campo de Senha</label>
                    <div class="password-input-wrapper">
                        <input type="password" id="${inputId}" value="senha-exemplo" placeholder="Digite sua senha">
                        <button id="${toggleId}" class="password-toggle-button" aria-label="Mostrar senha">
                            <i id="${iconId}" class="ph ph-eye"></i>
                        </button>
                    </div>
                </div>
            `;

          setTimeout(() => {
            const passwordInput = document.getElementById(inputId);
            const toggleButton = document.getElementById(toggleId);
            const toggleIcon = document.getElementById(iconId);

            toggleButton.addEventListener("click", () => {
              const isPassword = passwordInput.type === "password";
              if (isPassword) {
                passwordInput.type = "text";
                toggleButton.setAttribute("aria-label", "Esconder senha");
                toggleIcon.className = "ph ph-eye-slash";
              } else {
                passwordInput.type = "password";
                toggleButton.setAttribute("aria-label", "Mostrar senha");
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
                        <div id="wt-saldo" class="fake-element">Meu Saldo: R$ 1.234,56</div>
                        <button id="wt-pagar" class="fake-element">Pagar Contas</button>
                        <button id="wt-extrato" class="fake-element">Ver Extrato</button>
                        <i id="wt-ajuda" class="ph ph-question fake-element"></i>
                    </div>
                    <div class="walkthrough-overlay">
                        <div class="walkthrough-highlighter"></div>
                        <div class="walkthrough-tooltip">
                            <p class="walkthrough-text"></p>
                            <div class="walkthrough-nav">
                                <button class="walkthrough-prev">&larr; Anterior</button>
                                <span class="walkthrough-progress"></span>
                                <button class="walkthrough-next">Próximo &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

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
              nextBtn.disabled = stepIndex === steps.length - 1;

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

                  // Posiciona o tooltip
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

            goToStep(0); // Inicia o tutorial
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
                      <label for="${inputId2}" class="sr-only">Nome do Favorecido</label>
                      <input type="text" id="${inputId2}" class="autocomplete-input" placeholder="Digite o nome do favorecido...">
                      <ul class="autocomplete-suggestions" id="${suggestionsId}"></ul>
                  </div>
              `;

          setTimeout(() => {
            const input = document.getElementById(inputId2);
            const suggestionsList = document.getElementById(suggestionsId);
            const sampleData = [
              "Maria da Silva",
              "Manoel Pereira",
              "Mercado São José",
              "Farmácia Bem Estar",
              "Marta de Almeida",
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
          const formattedText = item.text.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
          );
          element.innerHTML = `
                      <i class="ph ${
                        item.icon || "ph-bold ph-caret-right"
                      }"></i>
                      <p>${formattedText}</p>
                    `;
          break;
      }
      guidelineDetails.appendChild(element);
    });

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
  //  4. EVENT LISTENERS
  // =========================================================================
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      showGuidelines(category);
    });
  });

  backButton.addEventListener("click", showGrid);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        const category = href.substring(1);
        showGuidelines(category);
        if (sidebar) {
          sidebar.classList.remove("is-open");
        }
      }
    });
  });

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
});

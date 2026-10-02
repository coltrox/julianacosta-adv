/* ============================================================
   Dúvidas frequentes
   ------------------------------------------------------------
   Em módulo separado, e sem importar nada de JSX, porque o
   vite.config.js também lê este arquivo: é dele que sai o
   FAQPage em JSON-LD injetado no HTML durante o build. Assim a
   pergunta que o Google lê é a mesma que a página mostra, sem
   chance de divergir.
   ============================================================ */

export const FAQ_ITEMS = [
  {
    q: "Como funciona o atendimento?",
    a: "O atendimento pode ser presencial, em Campinas e região, ou por videoconferência, para clientes em qualquer lugar do mundo. A primeira conversa é destinada à compreensão da situação e à avaliação dos caminhos jurídicos possíveis. Quando houver necessidade de análise documental mais aprofundada ou de uma atuação específica, isso é explicado ao cliente antes da definição dos próximos passos.",
  },
  {
    q: "O atendimento online tem a mesma validade do presencial?",
    a: "Sim. As reuniões são realizadas por videoconferência e os documentos podem ser assinados digitalmente. A condução de processos judiciais eletrônicos também permite acompanhamento à distância. Para atendimentos relacionados a outras localidades ou jurisdições, são avaliadas previamente as condições específicas do caso.",
  },
  {
    q: "O que é Direito Sistêmico, na prática?",
    a: "É uma abordagem que amplia o olhar sobre o conflito, considerando não apenas a questão jurídica, mas também as relações envolvidas e que poderão permanecer depois da demanda. A técnica jurídica continua sendo a base da atuação, incorporando recursos como comunicação, negociação e mediação quando adequados ao caso.",
  },
  {
    q: "Quanto tempo leva um divórcio ou um inventário?",
    a: "O prazo depende das características de cada caso, da existência ou não de consenso, da documentação disponível e da via adequada. Após a análise inicial, é possível explicar os principais fatores que podem influenciar o tempo de tramitação.",
  },
  {
    q: "Como funcionam os honorários?",
    a: "Os honorários são definidos de acordo com a natureza e a complexidade do trabalho, considerando a extensão da atuação necessária em cada caso. Antes da contratação, o cliente recebe informações claras sobre os serviços, honorários e condições de pagamento.",
  },
  {
    q: "Posso consultar antes de decidir se vou entrar com uma ação?",
    a: "Sim. A consulta pode ser utilizada justamente para compreender a situação, avaliar os caminhos possíveis e conhecer riscos e alternativas antes de tomar uma decisão.",
  },
];

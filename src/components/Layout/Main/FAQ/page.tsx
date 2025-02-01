import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ReactMarkdown from "react-markdown";

const faqData = [
  {
    question: "O que é o Desafioo.Tech?",
    answer:
      "O **Desafioo.Tech** é uma iniciativa voltada para programadores que desejam aprimorar suas habilidades por meio de desafios reais criados por profissionais da área. O objetivo é estimular o aprendizado prático, a resolução de problemas e a construção de projetos para o portfólio pessoal.",
  },
  {
    question: "Para quem é o Desafioo.Tech?",
    answer:
      "O **Desafioo.Tech** é ideal para iniciantes que querem entrar no mercado de tecnologia e também para desenvolvedores que desejam aprimorar suas habilidades e expandir seu portfólio.",
  },
  {
    question: "Como funciona o Desafioo.Tech?",
    answer:
      "Os participantes recebem desafios baseados em problemas reais do mercado. Após se inscrever, o desafio é enviado diretamente para o e-mail do participante, contendo um briefing detalhado e dicas para ajudar na solução. \n\nAo concluir, o participante pode compartilhar seu projeto em suas redes ou portfólio para demonstrar suas habilidades e receber feedback de outros profissionais.",
  },
  {
    question: "Preciso ter experiência em programação para participar?",
    answer:
      "Não! O **Desafioo.Tech** oferece desafios de diferentes níveis, desde iniciantes até avançados. Se você está começando, há materiais de apoio e desafios introdutórios para ajudar no aprendizado.",
  },
  {
    question: "O Desafioo.Tech é gratuito?",
    answer:
      "Sim! O **Desafioo.Tech** é uma iniciativa gratuita para incentivar a formação de novos programadores e ajudá-los a desenvolver suas habilidades.",
  },
  {
    question: "Como posso participar?",
    answer:
      "Basta acessar o site do **Desafioo.Tech**, escolher um desafio e começar a desenvolver sua solução!",
  },
  {
    question: "Como posso contribuir?",
    answer:
      "Você pode contribuir de várias formas! \n\n Apoie o projeto: Temos uma campanha no [**Apoia.se**](link), onde qualquer contribuição ajuda a manter e expandir o Desafioo.Tech. Seu apoio permite a criação de novos desafios e melhorias na plataforma. \n\n Contribua com código: O Desafioo.Tech é um projeto [**open source**](link), e você pode colaborar diretamente no repositório. Se você é desenvolvedor e quer ajudar a melhorar a plataforma, confira as issues abertas e envie seu pull request! \n\n [**Dê feedback**](link): Se você participou de um desafio, seu [**feedback**](link) é essencial! Conte-nos sua experiência, sugestões de melhoria e como podemos tornar o Desafioo.Tech ainda melhor. \n\n**Compartilhe: Divulgue o Desafioo.Tech** para amigos, colegas e redes sociais. Quanto mais pessoas participarem, mais a comunidade cresce! Agradecemos todo o apoio! 🚀",
  },
  {
    question: "Como posso entrar em contato?",
    answer:
      "Se quiser falar diretamente comigo, pode me chamar pelo [**LinkedIn**](link) ou enviar um e-mail para [**arthurdesouza.silv@gmail.com**](link)",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-6xl mx-auto p-4 space-y-6 mb-16" id="faq">
      <h2 className="text-3xl font-bold text-center mb-6">
        Perguntas Frequentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

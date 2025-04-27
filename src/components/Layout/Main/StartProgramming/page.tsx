import ReactMarkdown from "react-markdown";

const content = {
  title: "Por onde começar a programar?",
  paragraph1:
    "Para começar a programar e desenvolver seu portfólio, escolha uma linguagem que seja útil para os projetos que você quer criar. Se o seu foco é web, comece com JavaScript, HTML e CSS. Já se você deseja criar aplicativos ou jogos, Python e C# são ótimas escolhas. O primeiro passo é sempre focar em uma linguagem popular e com uma comunidade ativa para facilitar seu aprendizado.",
  paragraph2:
    "A prática é o que vai te fazer evoluir. Não perca tempo apenas estudando teoria. Comece criando projetos reais. Crie um site simples, uma calculadora ou até mesmo um bot. O importante é colocar a mão na massa. Isso não só vai te ajudar a aprender de verdade, mas também vai te dar algo concreto para mostrar no seu portfólio.",
  paragraph3:
    "Estudar é essencial. Pesquise tutoriais, faça cursos online e resolva problemas. Concentre-se em aprender os fundamentos de programação, como lógica, estruturas de dados e algoritmos, porque essas habilidades são o alicerce para qualquer tipo de desenvolvimento. Aprofundar-se nesses temas vai te diferenciar de outros iniciantes.",
  paragraph4:
    "Por fim, para manter seu portfólio sempre atualizado, compartilhe seus projetos no GitHub e mostre-os em um site pessoal. Documente bem seu código e escreva sobre os desafios que você superou em cada projeto. Isso não só vai te ajudar a fixar o conhecimento, mas também vai te dar visibilidade para futuros empregadores ou clientes. E lembre-se: a tecnologia muda rapidamente, então nunca pare de aprender!",
};

export function StartProgramming() {
  return (
    <section className="min-h-screen py-24 flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className=" md:flex md:justify-between md:items-center">
          <div className="md:max-w-[60%]">
            <h2 className="text-4xl font-bold mb-8">{content.title}</h2>
            {Object.keys(content)
              .filter((key) => key.startsWith("paragraph"))
              .map((key) => (
                <div
                  key={key}
                  className="text-lg text-justify mt-4 tracking-wide"
                >
                  <ReactMarkdown>
                    {content[key as keyof typeof content]}
                  </ReactMarkdown>
                </div>
              ))}
          </div>
          <div className="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="250"
              height="250"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code-xml"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}


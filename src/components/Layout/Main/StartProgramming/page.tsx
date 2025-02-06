import Image from "next/image";
import ReactMarkdown from "react-markdown";

const content = {
  title: "Por onde começar a programar?",
  paragraph1:
    "A programação é uma área muito ampla e complexa, com diversas linguagens e frameworks. Por isso, é importante que você escolha uma linguagem de programação para começar a estudar. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  paragraph2:
    "Depois de escolher uma linguagem, é importante que você pratique bastante. A prática leva à perfeição, e quanto mais você praticar, mais você vai aprender. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  paragraph3:
    "**Além de praticar**, é importante que você estude bastante. Existem diversos cursos online, livros e tutoriais que podem te ajudar a aprender a programar. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  paragraph4:
    "Por fim, é importante que você se mantenha atualizado. A tecnologia está em constante evolução, e é importante que você esteja sempre aprendendo coisas novas. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export function StartProgramming() {
  return (
    <section className="min-h-screen py-24 flex items-center bg-blue-500 text-white">
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
            <Image
              src="/eu.png"
              alt="Programação"
              width={200}
              height={200}
              className="w-full md:w-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

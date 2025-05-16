import Header from "@/components/Header";

export default function Sobre() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Desabafa Aqui</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                O Desabafa Aqui é uma plataforma criada para oferecer um espaço seguro e anônimo
                onde as pessoas podem compartilhar seus pensamentos, frustrações e experiências
                do dia a dia.
              </p>
              
              <p className="text-gray-700 mb-4">
                Nossa missão é proporcionar um ambiente acolhedor onde todos possam se expressar
                livremente, sem medo de julgamentos ou represálias.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Como Funciona</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Faça login usando sua conta Google ou Facebook</li>
                <li>Compartilhe seus desabafos de forma anônima</li>
                <li>Interaja com outros usuários através de comentários</li>
                <li>Receba apoio e empatia da comunidade</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Nossa Comunidade</h2>
              <p className="text-gray-700">
                Acreditamos no poder da empatia e do apoio mútuo. Nossa comunidade é construída
                sobre os princípios de respeito, privacidade e solidariedade.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
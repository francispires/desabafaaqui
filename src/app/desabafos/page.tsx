import Header from "@/components/Header";

export default function Desabafos() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Desabafos</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Novo Desabafo
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Example desabafo card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Usuário Anônimo</h2>
                  <p className="text-sm text-gray-500">2 horas atrás</p>
                </div>
              </div>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
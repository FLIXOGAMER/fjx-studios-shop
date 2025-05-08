export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="md:max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Premium Entwicklungs&shy;tools für deine Projekte
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Hochwertige Software für moderne Entwicklungsteams. Effizient, zuverlässig und skalierbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/products" 
              className="btn-primary"
            >
              Produkte entdecken
            </a>
            <a 
              href="https://discord.gg/fjx" 
              className="btn-secondary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Community beitreten
            </a>
          </div>
        </div>
      </div>
      
      {/* Dekorativer Hintergrund */}
      <div className="hidden md:block absolute -right-10 -bottom-10 opacity-10">
        <div className="text-[30rem] font-black leading-none">
          FJX
        </div>
      </div>
    </div>
  );
}

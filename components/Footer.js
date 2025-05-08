import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-black mb-4">FJX</div>
            <p className="text-gray-400">Professionelle Entwicklungstools für die moderne Softwareentwicklung.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Produkte</h3>
            <ul className="space-y-2">
              <li><Link href="/products"><span className="text-gray-400 hover:text-white">Alle Produkte</span></Link></li>
              <li><Link href="/products?featured=true"><span className="text-gray-400 hover:text-white">Featured</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Über uns</h3>
            <ul className="space-y-2">
              <li><Link href="/about"><span className="text-gray-400 hover:text-white">Unternehmen</span></Link></li>
              <li><Link href="/contact"><span className="text-gray-400 hover:text-white">Kontakt</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/fjx" className="text-gray-400 hover:text-white">Discord</a></li>
              <li><a href="https://github.com/fjx-studios" className="text-gray-400 hover:text-white">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FJX Studios. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}

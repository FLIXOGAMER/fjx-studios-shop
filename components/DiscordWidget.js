import { useEffect, useState } from 'react';

export default function DiscordWidget() {
  const [discordInfo, setDiscordInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const discordId = process.env.NEXT_PUBLIC_DISCORD_WIDGET_ID || '1369345308269477949';

  useEffect(() => {
    const fetchDiscordInfo = async () => {
      try {
        const response = await fetch(`https://discord.com/api/guilds/${discordId}/widget.json`);
        const data = await response.json();
        setDiscordInfo(data);
      } catch (error) {
        console.error('Error fetching Discord data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiscordInfo();
  }, [discordId]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 text-white">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">
          {loading ? 'Discord Community' : discordInfo?.name || 'Discord Community'}
        </h3>
        {!loading && discordInfo && (
          <p className="text-gray-300 mb-4">
            {discordInfo.presence_count} Online • {discordInfo.members?.length || 0} Aktive Mitglieder
          </p>
        )}
      </div>
      <iframe 
        src={`https://discord.com/widget?id=${discordId}&theme=dark`}
        width="100%" 
        height="400" 
        allowTransparency="true" 
        frameBorder="0" 
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="bg-gray-900"
      ></iframe>
      <div className="p-6 bg-gray-800">
        <a 
          href="https://discord.gg/fjx" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-center font-medium"
        >
          Discord beitreten
        </a>
      </div>
    </div>
  );
}
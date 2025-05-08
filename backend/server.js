const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Umgebungsvariablen laden
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Tebex API Config
const TEBEX_BASE_URL = 'https://plugin.tebex.io/';
const TEBEX_SECRET_KEY = process.env.TEBEX_SECRET_KEY;

if (!TEBEX_SECRET_KEY) {
  console.error('TEBEX_SECRET_KEY ist nicht konfiguriert. Bitte .env-Datei überprüfen.');
}

// Einfaches Cache-System
const cache = {
  data: {},
  set: function(key, value, ttl = 300000) { // 5 Minuten TTL Standard
    this.data[key] = {
      value,
      expiry: Date.now() + ttl
    };
  },
  get: function(key) {
    const item = this.data[key];
    if (!item) return null;
    if (item.expiry < Date.now()) {
      delete this.data[key];
      return null;
    }
    return item.value;
  }
};

// Helper-Funktion für Tebex API-Anfragen
const fetchFromTebex = async (endpoint) => {
  try {
    const cacheKey = `tebex:${endpoint}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const response = await axios.get(`${TEBEX_BASE_URL}${endpoint}`, {
      headers: {
        'X-Tebex-Secret': TEBEX_SECRET_KEY
      }
    });
    
    const data = response.data;
    
    // Cache-Daten für 5 Minuten speichern
    cache.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error(`Fehler beim Abrufen von ${endpoint}:`, error.message);
    throw error;
  }
};

// API-Routen

// Alle Kategorien abrufen
app.get('/api/tebex/categories', async (req, res) => {
  try {
    const data = await fetchFromTebex('categories');
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Kategorien',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Kategorie nach ID abrufen
app.get('/api/tebex/categories/:id', async (req, res) => {
  try {
    const categories = await fetchFromTebex('categories');
    const category = categories.categories.find(
      cat => cat.id.toString() === req.params.id
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategorie nicht gefunden'
      });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Kategorie',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Produkte nach Kategorie abrufen
app.get('/api/tebex/categories/:id/packages', async (req, res) => {
  try {
    const data = await fetchFromTebex(`categories/${req.params.id}/packages`);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Produkte nach Kategorie',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Alle Pakete (Produkte) abrufen
app.get('/api/tebex/packages', async (req, res) => {
  try {
    const data = await fetchFromTebex('packages');
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Produkte',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Paket (Produkt) nach ID abrufen
app.get('/api/tebex/packages/:id', async (req, res) => {
  try {
    const data = await fetchFromTebex(`packages/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen des Produkts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Information über den Shop abrufen
app.get('/api/tebex/information', async (req, res) => {
  try {
    const data = await fetchFromTebex('information');
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Shop-Informationen',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Standard-Route
app.get('/', (req, res) => {
  res.send('FJX Studios API Server');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

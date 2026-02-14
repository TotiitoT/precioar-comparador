import React, { useState } from 'react';
import { Search, TrendingDown, ExternalLink, Loader2, Plus, X, ShoppingCart } from 'lucide-react';

const PriceComparator = () => {
  const [urls, setUrls] = useState(['']);
  const [productQuery, setProductQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const analyzeProducts = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const validUrls = urls.filter(url => url.trim() !== '');
      
      if (validUrls.length === 0) {
        setError('Por favor ingresa al menos una URL');
        setLoading(false);
        return;
      }

      if (!productQuery.trim()) {
        setError('Por favor describe el producto que buscas');
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [
            {
              "type": "web_search_20250305",
              "name": "web_search"
            }
          ],
          messages: [
            {
              role: "user",
              content: `Necesito comparar precios de "${productQuery}" en los siguientes e-commerce argentinos:
${validUrls.map((url, i) => `${i + 1}. ${url}`).join('\n')}

Por favor, busca información actualizada sobre este producto en cada sitio y devuélveme SOLO un objeto JSON con esta estructura exacta (sin texto adicional, sin bloques de código markdown):
{
  "products": [
    {
      "store": "nombre del sitio",
      "product_name": "nombre exacto del producto",
      "price": número (sin signos de pesos, solo el número),
      "url": "url directa del producto",
      "available": true/false
    }
  ],
  "best_deal": {
    "store": "nombre del sitio con mejor precio",
    "savings": "cuánto te ahorras respecto al más caro"
  },
  "recommendation": "breve recomendación de compra"
}`
            }
          ]
        })
      });

      const data = await response.json();
      
      let jsonText = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join('\n');

      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const parsedResults = JSON.parse(jsonText);
      setResults(parsedResults);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Hubo un error al analizar los productos. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@300;400;600;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Manrope', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .price-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .price-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
        }

        .best-deal {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%);
          border: 2px solid rgba(34, 197, 94, 0.5);
        }

        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 glass-effect rounded-full">
            <ShoppingCart className="text-purple-400" size={24} />
            <span className="text-purple-300 font-mono text-sm tracking-wider">COMPARADOR INTELIGENTE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 gradient-text" style={{fontFamily: "'Space Mono', monospace"}}>
            PrecioAR
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light">
            Encontrá el mejor precio en los principales e-commerce argentinos con inteligencia artificial
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-effect rounded-3xl p-8 md:p-10 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {/* Product Query */}
          <div className="mb-8">
            <label className="block text-slate-200 font-semibold mb-3 text-sm tracking-wide uppercase">
              ¿Qué producto buscás?
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Ej: Yerba Mate Rosamonte 1kg, Smart TV Samsung 55 pulgadas..."
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* URLs */}
          <div className="mb-8">
            <label className="block text-slate-200 font-semibold mb-3 text-sm tracking-wide uppercase">
              URLs de E-commerce
            </label>
            <div className="space-y-3">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateUrl(index, e.target.value)}
                    placeholder={`https://www.${index === 0 ? 'cotodigital3' : index === 1 ? 'carrefour' : 'jumbo'}.com.ar/...`}
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  {urls.length > 1 && (
                    <button
                      onClick={() => removeUrlField(index)}
                      className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addUrlField}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all text-sm"
            >
              <Plus size={16} />
              Agregar otra URL
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Compare Button */}
          <button
            onClick={analyzeProducts}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Analizando precios...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <TrendingDown size={20} />
                Comparar Precios
              </span>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Recommendation */}
            <div className="glass-effect rounded-2xl p-6 border-l-4 border-purple-500">
              <h3 className="text-purple-300 font-bold mb-2 text-sm tracking-wide uppercase">Recomendación</h3>
              <p className="text-slate-200 text-lg">{results.recommendation}</p>
            </div>

            {/* Best Deal Highlight */}
            {results.best_deal && (
              <div className="best-deal rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="text-green-400" size={24} />
                  <h3 className="text-green-300 font-bold text-xl">Mejor Precio</h3>
                </div>
                <p className="text-white text-2xl font-bold">{results.best_deal.store}</p>
                <p className="text-green-300 mt-1">Ahorrás: {results.best_deal.savings}</p>
              </div>
            )}

            {/* Product Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {results.products?.map((product, index) => {
                const isBestDeal = product.store === results.best_deal?.store;
                return (
                  <div
                    key={index}
                    className={`price-card glass-effect rounded-2xl p-6 ${isBestDeal ? 'best-deal' : ''}`}
                    style={{animationDelay: `${0.1 * index}s`}}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-slate-300 font-semibold text-sm mb-1">{product.store}</h4>
                        <p className="text-white font-medium text-sm line-clamp-2">{product.product_name}</p>
                      </div>
                      {isBestDeal && (
                        <span className="ml-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-300 text-xs font-bold">
                          MEJOR
                        </span>
                      )}
                    </div>
                    
                    {product.available ? (
                      <>
                        <div className="mb-4">
                          <span className="text-4xl font-black text-white" style={{fontFamily: "'Space Mono', monospace"}}>
                            ${product.price?.toLocaleString('es-AR')}
                          </span>
                        </div>
                        
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition-all"
                        >
                          Ver en tienda
                          <ExternalLink size={16} />
                        </a>
                      </>
                    ) : (
                      <div className="py-3 text-center text-slate-500 italic">
                        No disponible
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Powered by Claude AI • Los precios pueden variar</p>
        </div>
      </div>
    </div>
  );
};

export default PriceComparator;

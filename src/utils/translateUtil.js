/**
 * Utility to translate text using the public Google Translate "GTX" endpoint.
 * This is a free, lightweight way to handle translations without a server-side API key.
 * 
 * @param {string} text - The text to translate.
 * @param {string} from - Source language code (e.g., 'es').
 * @param {string} to - Target language code (e.g., 'en').
 * @returns {Promise<string>} - The translated text.
 */
export async function translateText(text, from = 'auto', to = 'en') {
  if (!text || !text.trim()) return '';
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation request failed');
    
    const data = await response.json();
    
    // The structure returned is [[["translatedText", "sourceText", null, null, 1]], null, "es"]
    // We join all translation chunks in case of multi-line/long text.
    const translated = data[0].map(item => item[0]).join('');
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text if translation fails
  }
}

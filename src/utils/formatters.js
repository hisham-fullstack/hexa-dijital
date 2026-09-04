/**
 * Türkçe karakterleri ve özel sembolleri URL uyumlu slug formatına dönüştürür.
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[şŞ]/g, "s")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[çÇ]/g, "c")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
};

/**
 * Fiyat formatlama fonksiyonu (Örn: 25000 -> 25.000 ₺)
 * @param {number|string} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  if (!price || price === "Fiyat Alın") return "Fiyat Alın";
  const cleanNumber =
    typeof price === "string" ? price.replace(/\./g, "") : price;
  const num = parseInt(cleanNumber, 10);
  if (isNaN(num)) return "Fiyat Alın";
  return new Intl.NumberFormat("tr-TR").format(num) + " ₺";
};

/**
 * String fiyatı sayıya dönüştürür.
 * @param {string|number} priceStr
 * @returns {number}
 */
export const parsePrice = (priceStr) => {
  if (!priceStr || priceStr === "Fiyat Alın") return 0;
  if (typeof priceStr === "number") return priceStr;
  const clean = parseInt(priceStr.toString().replace(/\./g, ""), 10);
  return isNaN(clean) ? 0 : clean;
};

/**
 * Özel domain (hexadijital.com) ile %100 uyumlu kök dizin görsel yolu yardımcısı
 * @param {string} path
 * @returns {string}
 */
export const assetUrl = (path) => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};

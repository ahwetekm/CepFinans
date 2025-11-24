import { NextRequest, NextResponse } from 'next/server'

interface ExchangeRate {
  code: string
  name: string
  buyRate: number
  sellRate: number
  changeRate?: number
  changePercent?: number
  lastUpdate: string
  flag: string
}

const CURRENCY_FLAGS: { [key: string]: string } = {
  'USD': '🇺🇸',
  'EUR': '🇪🇺',
  'GBP': '🇬🇧',
  'CHF': '🇨🇭',
  'JPY': '🇯🇵',
  'SAR': '🇸🇦',
  'CAD': '🇨🇦',
  'AUD': '🇦🇺',
  'NOK': '🇳🇴',
  'SEK': '🇸🇪',
  'DKK': '🇩🇰',
  'CNY': '🇨🇳',
  'RUB': '🇷🇺',
  'BGN': '🇧🇬',
  'RON': '🇷🇴',
  'IRR': '🇮🇷',
  'KWD': '🇰🇼',
  'AZN': '🇦🇿',
  'AED': '🇦🇪',
  'QAR': '🇶🇦',
  'BHD': '🇧🇭',
  'OMR': '🇴🇲',
  'JOD': '🇯🇴',
  'LBP': '🇱🇧',
  'EGP': '🇪🇬',
  'IQD': '🇮🇶',
  'LYD': '🇱🇾',
  'SYP': '🇸🇾',
  'YER': '🇾🇪'
}

const CURRENCY_NAMES: { [key: string]: string } = {
  'USD': 'Amerikan Doları',
  'EUR': 'Euro',
  'GBP': 'İngiliz Sterlini',
  'CHF': 'İsviçre Frangı',
  'JPY': 'Japon Yeni',
  'SAR': 'Suudi Arabistan Riyali',
  'CAD': 'Kanada Doları',
  'AUD': 'Avustralya Doları',
  'NOK': 'Norveç Kronu',
  'SEK': 'İsveç Kronu',
  'DKK': 'Danimarka Kronu',
  'CNY': 'Çin Yuanı',
  'RUB': 'Rus Rublesi',
  'BGN': 'Bulgar Levası',
  'RON': 'Rumen Leyi',
  'IRR': 'İran Riyali',
  'KWD': 'Kuveyt Dinarı',
  'AZN': 'Azerbaycan Manatı',
  'AED': 'BAE Dirhemi',
  'QAR': 'Katar Riyali',
  'BHD': 'Bahreyn Dinarı',
  'OMR': 'Umman Riyali',
  'JOD': 'Ürdün Dinarı',
  'LBP': 'Lübnan Lirası',
  'EGP': 'Mısır Lirası',
  'IQD': 'Irak Dinarı',
  'LYD': 'Libya Dinarı',
  'SYP': 'Suriye Lirası',
  'YER': 'Yemen Riyali'
}

export async function GET(request: NextRequest) {
  try {
    // TCMB'den döviz kurlarını çek
    const tcmbUrl = `https://www.tcmb.gov.tr/kurlar/today.xml`
    
    const response = await fetch(tcmbUrl, {
      next: { revalidate: 3600 } // 1 saat cache
    })
    
    if (!response.ok) {
      throw new Error('TCMB API\'den veri alınamadı')
    }

    const xmlData = await response.text()
    
    // XML parse et (basit regex ile)
    const currencyMatches = xmlData.match(/<Currency.*?<\/Currency>/gs) || []
    
    const exchangeRates: ExchangeRate[] = []
    
    for (const currencyXml of currencyMatches) {
      const codeMatch = currencyXml.match(/CurrencyCode="([^"]+)"/)
      const nameMatch = currencyXml.match(/<Isim>([^<]+)<\/Isim>/)
      const buyMatch = currencyXml.match(/<ForexBuying>([^<]*)<\/ForexBuying>/)
      const sellMatch = currencyXml.match(/<ForexSelling>([^<]*)<\/ForexSelling>/)
      
      if (codeMatch && nameMatch && buyMatch && sellMatch) {
        const code = codeMatch[1]
        const buyRate = parseFloat(buyMatch[1]) || 0
        const sellRate = parseFloat(sellMatch[1]) || 0
        
        // Sadece ana dövizleri göster
        if (CURRENCY_NAMES[code]) {
          exchangeRates.push({
            code,
            name: CURRENCY_NAMES[code],
            buyRate,
            sellRate,
            flag: CURRENCY_FLAGS[code] || '🏳️',
            lastUpdate: new Date().toISOString()
          })
        }
      }
    }

    // Eğer TCMB'den veri alınamazsa, örnek veri döndür
    if (exchangeRates.length === 0) {
      const fallbackRates = [
        { code: 'USD', name: 'Amerikan Doları', buyRate: 32.15, sellRate: 32.25, flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', buyRate: 35.20, sellRate: 35.30, flag: '🇪🇺' },
        { code: 'GBP', name: 'İngiliz Sterlini', buyRate: 41.50, sellRate: 41.65, flag: '🇬🇧' },
        { code: 'CHF', name: 'İsviçre Frangı', buyRate: 36.80, sellRate: 36.95, flag: '🇨🇭' },
        { code: 'JPY', name: 'Japon Yeni', buyRate: 0.215, sellRate: 0.218, flag: '🇯🇵' },
        { code: 'SAR', name: 'Suudi Arabistan Riyali', buyRate: 8.57, sellRate: 8.60, flag: '🇸🇦' },
        { code: 'CAD', name: 'Kanada Doları', buyRate: 23.75, sellRate: 23.85, flag: '🇨🇦' },
        { code: 'AUD', name: 'Avustralya Doları', buyRate: 21.30, sellRate: 21.40, flag: '🇦🇺' },
        { code: 'NOK', name: 'Norveç Kronu', buyRate: 3.05, sellRate: 3.07, flag: '🇳🇴' },
        { code: 'SEK', name: 'İsveç Kronu', buyRate: 3.10, sellRate: 3.12, flag: '🇸🇪' },
        { code: 'DKK', name: 'Danimarka Kronu', buyRate: 4.75, sellRate: 4.78, flag: '🇩🇰' },
        { code: 'CNY', name: 'Çin Yuanı', buyRate: 4.45, sellRate: 4.48, flag: '🇨🇳' }
      ]

      return NextResponse.json({
        success: true,
        data: fallbackRates,
        source: 'fallback',
        message: 'TCMB verisi alınamadı, örnek veriler gösteriliyor'
      })
    }

    return NextResponse.json({
      success: true,
      data: exchangeRates,
      source: 'tcmb',
      lastUpdate: new Date().toISOString()
    })

  } catch (error) {
    console.error('Döviz kuru hatası:', error)
    
    // Hata durumunda örnek veri döndür
    const fallbackRates = [
      { code: 'USD', name: 'Amerikan Doları', buyRate: 32.15, sellRate: 32.25, flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', buyRate: 35.20, sellRate: 35.30, flag: '🇪🇺' },
      { code: 'GBP', name: 'İngiliz Sterlini', buyRate: 41.50, sellRate: 41.65, flag: '🇬🇧' },
      { code: 'CHF', name: 'İsviçre Frangı', buyRate: 36.80, sellRate: 36.95, flag: '🇨🇭' },
      { code: 'JPY', name: 'Japon Yeni', buyRate: 0.215, sellRate: 0.218, flag: '🇯🇵' },
      { code: 'SAR', name: 'Suudi Arabistan Riyali', buyRate: 8.57, sellRate: 8.60, flag: '🇸🇦' },
      { code: 'CAD', name: 'Kanada Doları', buyRate: 23.75, sellRate: 23.85, flag: '🇨🇦' },
      { code: 'AUD', name: 'Avustralya Doları', buyRate: 21.30, sellRate: 21.40, flag: '🇦🇺' }
    ]

    return NextResponse.json({
      success: true,
      data: fallbackRates,
      source: 'fallback',
      message: 'Hata oluştu, örnek veriler gösteriliyor',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    })
  }
}
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, TrendingDown, Plus, DollarSign, Coins, Bitcoin, ArrowUpDown, Calculator, Calendar, RefreshCw, Eye } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ExchangeRate {
  code: string
  name: string
  buyRate: number
  sellRate: number
  flag: string
  lastUpdate: string
}

interface CurrencyInvestment {
  id: string
  currency: string
  currencyCode: string
  buyDate: string
  buyAmount: number
  buyRate: number
  currentRate: number
  totalValue: number
  profit: number
  profitPercentage: number
}

interface MetalInvestment {
  id: string
  metal: string
  metalCode: string
  buyDate: string
  buyAmount: number
  buyPrice: number
  currentPrice: number
  totalValue: number
  profit: number
  profitPercentage: number
}

interface CryptoInvestment {
  id: string
  crypto: string
  cryptoCode: string
  buyDate: string
  buyAmount: number
  buyPrice: number
  currentPrice: number
  totalValue: number
  profit: number
  profitPercentage: number
}

export default function InvestmentsPage() {
  const { t } = useLanguage()
  const [currencyInvestments, setCurrencyInvestments] = useState<CurrencyInvestment[]>([])
  const [metalInvestments, setMetalInvestments] = useState<MetalInvestment[]>([])
  const [cryptoInvestments, setCryptoInvestments] = useState<CryptoInvestment[]>([])
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [loadingRates, setLoadingRates] = useState(false)
  
  const [showAddCurrency, setShowAddCurrency] = useState(false)
  const [showAddMetal, setShowAddMetal] = useState(false)
  const [showAddCrypto, setShowAddCrypto] = useState(false)
  const [showQuickInvest, setShowQuickInvest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<ExchangeRate | null>(null)
  
  // Form states for currency
  const [currencyForm, setCurrencyForm] = useState({
    currency: '',
    currencyCode: '',
    buyDate: '',
    buyAmount: '',
    buyRate: ''
  })
  
  // Form states for metal
  const [metalForm, setMetalForm] = useState({
    metal: '',
    metalCode: '',
    buyDate: '',
    buyAmount: '',
    buyPrice: ''
  })
  
  // Form states for crypto
  const [cryptoForm, setCryptoForm] = useState({
    crypto: '',
    cryptoCode: '',
    buyDate: '',
    buyAmount: '',
    buyPrice: ''
  })

  // Quick investment form
  const [quickInvestForm, setQuickInvestForm] = useState({
    buyDate: '',
    buyAmount: ''
  })

  const metals = [
    { name: 'Altın', code: 'XAU' },
    { name: 'Gümüş', code: 'XAG' },
    { name: 'Platin', code: 'XPT' },
    { name: 'Paladyum', code: 'XPD' }
  ]

  const cryptos = [
    { name: 'Bitcoin', code: 'BTC' },
    { name: 'Ethereum', code: 'ETH' },
    { name: 'Binance Coin', code: 'BNB' },
    { name: 'Cardano', code: 'ADA' },
    { name: 'Solana', code: 'SOL' },
    { name: 'Ripple', code: 'XRP' },
    { name: 'Dogecoin', code: 'DOGE' },
    { name: 'Polkadot', code: 'DOT' }
  ]

  // Döviz kurlarını çek
  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    setLoadingRates(true)
    try {
      const response = await fetch('/api/exchange-rates')
      const data = await response.json()
      
      if (data.success) {
        setExchangeRates(data.data)
      }
    } catch (error) {
      console.error('Döviz kurları çekilemedi:', error)
    } finally {
      setLoadingRates(false)
    }
  }

  const addCurrencyInvestment = () => {
    if (!currencyForm.currency || !currencyForm.buyDate || !currencyForm.buyAmount || !currencyForm.buyRate) {
      return
    }

    const buyAmount = parseFloat(currencyForm.buyAmount)
    const buyRate = parseFloat(currencyForm.buyRate)
    const currentRate = exchangeRates.find(r => r.code === currencyForm.currencyCode)?.sellRate || buyRate
    
    const newInvestment: CurrencyInvestment = {
      id: Date.now().toString(),
      currency: currencyForm.currency,
      currencyCode: currencyForm.currencyCode,
      buyDate: currencyForm.buyDate,
      buyAmount,
      buyRate,
      currentRate,
      totalValue: buyAmount * currentRate,
      profit: (currentRate - buyRate) * buyAmount,
      profitPercentage: ((currentRate - buyRate) / buyRate) * 100
    }

    setCurrencyInvestments(prev => [newInvestment, ...prev])
    setCurrencyForm({
      currency: '',
      currencyCode: '',
      buyDate: '',
      buyAmount: '',
      buyRate: ''
    })
    setShowAddCurrency(false)
  }

  const addQuickInvestment = () => {
    if (!selectedCurrency || !quickInvestForm.buyDate || !quickInvestForm.buyAmount) {
      return
    }

    const buyAmount = parseFloat(quickInvestForm.buyAmount)
    const buyRate = selectedCurrency.sellRate
    const currentRate = buyRate // Anlık yatırım için mevcut kur aynı
    
    const newInvestment: CurrencyInvestment = {
      id: Date.now().toString(),
      currency: selectedCurrency.name,
      currencyCode: selectedCurrency.code,
      buyDate: quickInvestForm.buyDate,
      buyAmount,
      buyRate,
      currentRate,
      totalValue: buyAmount * currentRate,
      profit: 0,
      profitPercentage: 0
    }

    setCurrencyInvestments(prev => [newInvestment, ...prev])
    setQuickInvestForm({
      buyDate: '',
      buyAmount: ''
    })
    setSelectedCurrency(null)
    setShowQuickInvest(false)
  }

  const addMetalInvestment = () => {
    if (!metalForm.metal || !metalForm.buyDate || !metalForm.buyAmount || !metalForm.buyPrice) {
      return
    }

    const buyAmount = parseFloat(metalForm.buyAmount)
    const buyPrice = parseFloat(metalForm.buyPrice)
    const currentPrice = buyPrice * 1.08 // Simüle edilmiş mevcut fiyat (%8 artış)
    
    const newInvestment: MetalInvestment = {
      id: Date.now().toString(),
      metal: metalForm.metal,
      metalCode: metalForm.metalCode,
      buyDate: metalForm.buyDate,
      buyAmount,
      buyPrice,
      currentPrice,
      totalValue: buyAmount * currentPrice,
      profit: (currentPrice - buyPrice) * buyAmount,
      profitPercentage: ((currentPrice - buyPrice) / buyPrice) * 100
    }

    setMetalInvestments(prev => [newInvestment, ...prev])
    setMetalForm({
      metal: '',
      metalCode: '',
      buyDate: '',
      buyAmount: '',
      buyPrice: ''
    })
    setShowAddMetal(false)
  }

  const addCryptoInvestment = () => {
    if (!cryptoForm.crypto || !cryptoForm.buyDate || !cryptoForm.buyAmount || !cryptoForm.buyPrice) {
      return
    }

    const buyAmount = parseFloat(cryptoForm.buyAmount)
    const buyPrice = parseFloat(cryptoForm.buyPrice)
    const currentPrice = buyPrice * 1.12 // Simüle edilmiş mevcut fiyat (%12 artış)
    
    const newInvestment: CryptoInvestment = {
      id: Date.now().toString(),
      crypto: cryptoForm.crypto,
      cryptoCode: cryptoForm.cryptoCode,
      buyDate: cryptoForm.buyDate,
      buyAmount,
      buyPrice,
      currentPrice,
      totalValue: buyAmount * currentPrice,
      profit: (currentPrice - buyPrice) * buyAmount,
      profitPercentage: ((currentPrice - buyPrice) / buyPrice) * 100
    }

    setCryptoInvestments(prev => [newInvestment, ...prev])
    setCryptoForm({
      crypto: '',
      cryptoCode: '',
      buyDate: '',
      buyAmount: '',
      buyPrice: ''
    })
    setShowAddCrypto(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount)
  }

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const deleteInvestment = (type: 'currency' | 'metal' | 'crypto', id: string) => {
    if (type === 'currency') {
      setCurrencyInvestments(prev => prev.filter(inv => inv.id !== id))
    } else if (type === 'metal') {
      setMetalInvestments(prev => prev.filter(inv => inv.id !== id))
    } else if (type === 'crypto') {
      setCryptoInvestments(prev => prev.filter(inv => inv.id !== id))
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Yatırımlarım</h1>
          <p className="text-muted-foreground">Yatırım portföyünüzü takip edin</p>
        </div>
      </div>

      <Tabs defaultValue="currency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="currency" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Döviz
          </TabsTrigger>
          <TabsTrigger value="metal" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Maden
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-2">
            <Bitcoin className="h-4 w-4" />
            Kripto
          </TabsTrigger>
        </TabsList>

        {/* Döviz Yatırımları */}
        <TabsContent value="currency" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Döviz Yatırımları</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={fetchExchangeRates}
                disabled={loadingRates}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loadingRates ? 'animate-spin' : ''}`} />
                Kurları Güncelle
              </Button>
              <Dialog open={showAddCurrency} onOpenChange={setShowAddCurrency}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Manuel Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Döviz Yatırımı Ekle</DialogTitle>
                    <DialogDescription>
                      Aldığınız döviz bilgilerini manuel girin
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currency">Döviz Türü</Label>
                      <Select 
                        value={currencyForm.currencyCode} 
                        onValueChange={(value) => {
                          const selected = exchangeRates.find(c => c.code === value)
                          setCurrencyForm(prev => ({
                            ...prev,
                            currency: selected?.name || '',
                            currencyCode: value,
                            buyRate: selected?.sellRate.toString() || ''
                          }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Döviz seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {exchangeRates.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.flag} {currency.name} ({currency.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="buyDate">Alım Tarihi</Label>
                      <Input
                        id="buyDate"
                        type="date"
                        value={currencyForm.buyDate}
                        onChange={(e) => setCurrencyForm(prev => ({ ...prev, buyDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyAmount">Alım Miktarı</Label>
                      <Input
                        id="buyAmount"
                        type="number"
                        step="0.01"
                        placeholder="1000"
                        value={currencyForm.buyAmount}
                        onChange={(e) => setCurrencyForm(prev => ({ ...prev, buyAmount: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyRate">Alım Kuru (TRY)</Label>
                      <Input
                        id="buyRate"
                        type="number"
                        step="0.0001"
                        placeholder="32.50"
                        value={currencyForm.buyRate}
                        onChange={(e) => setCurrencyForm(prev => ({ ...prev, buyRate: e.target.value }))}
                      />
                    </div>
                    <Button onClick={addCurrencyInvestment} className="w-full">
                      Ekle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mevcut Döviz Kurları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Güncel Döviz Kurları
              </CardTitle>
              <CardDescription>
                TCMB'den güncellenen döviz kurları. Hızlı yatırım eklemek için döviz seçin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRates ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Kurlar yükleniyor...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {exchangeRates.map((rate) => (
                    <Card key={rate.code} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{rate.flag}</span>
                            <div>
                              <p className="font-semibold">{rate.code}</p>
                              <p className="text-sm text-muted-foreground">{rate.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(rate.sellRate)}</p>
                            <p className="text-xs text-muted-foreground">Alış: {formatCurrency(rate.buyRate)}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => {
                            setSelectedCurrency(rate)
                            setQuickInvestForm(prev => ({ ...prev, buyDate: new Date().toISOString().split('T')[0] }))
                            setShowQuickInvest(true)
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Hızlı Yatırım
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hızlı Yatırım Dialog */}
          <Dialog open={showQuickInvest} onOpenChange={setShowQuickInvest}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedCurrency?.flag} {selectedCurrency?.name} Hızlı Yatırım
                </DialogTitle>
                <DialogDescription>
                  Mevcut kurdan hızlı yatırım ekleyin
                </DialogDescription>
              </DialogHeader>
              {selectedCurrency && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Mevcut Kur</p>
                      <p className="font-semibold">{formatCurrency(selectedCurrency.sellRate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kod</p>
                      <p className="font-semibold">{selectedCurrency.code}</p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quickBuyDate">Alım Tarihi</Label>
                    <Input
                      id="quickBuyDate"
                      type="date"
                      value={quickInvestForm.buyDate}
                      onChange={(e) => setQuickInvestForm(prev => ({ ...prev, buyDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quickBuyAmount">Alım Miktarı ({selectedCurrency.code})</Label>
                    <Input
                      id="quickBuyAmount"
                      type="number"
                      step="0.01"
                      placeholder="100"
                      value={quickInvestForm.buyAmount}
                      onChange={(e) => setQuickInvestForm(prev => ({ ...prev, buyAmount: e.target.value }))}
                    />
                    {quickInvestForm.buyAmount && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Toplam Tutar: {formatCurrency(parseFloat(quickInvestForm.buyAmount) * selectedCurrency.sellRate)}
                      </p>
                    )}
                  </div>
                  <Button onClick={addQuickInvestment} className="w-full">
                    Yatırımı Ekle
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Mevcut Yatırımlar */}
          <div className="grid gap-4">
            {currencyInvestments.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Henüz döviz yatırımı eklenmedi</p>
                </CardContent>
              </Card>
            ) : (
              currencyInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg">{investment.currency}</CardTitle>
                      <CardDescription>
                        Alım: {new Date(investment.buyDate).toLocaleDateString('tr-TR')}
                      </CardDescription>
                    </div>
                    <Badge variant={investment.profit >= 0 ? "default" : "destructive"}>
                      {investment.profit >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {formatNumber(investment.profitPercentage)}%
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Miktar</p>
                        <p className="font-semibold">{formatNumber(investment.buyAmount)} {investment.currencyCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alım Kuru</p>
                        <p className="font-semibold">{formatCurrency(investment.buyRate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mevcut Kur</p>
                        <p className="font-semibold">{formatCurrency(investment.currentRate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Kar/Zarar</p>
                        <p className={`font-semibold ${investment.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(investment.profit)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Toplam Değer</p>
                          <p className="text-lg font-bold">{formatCurrency(investment.totalValue)}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteInvestment('currency', investment.id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Maden Yatırımları */}
        <TabsContent value="metal" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Maden Yatırımları</h2>
            <Dialog open={showAddMetal} onOpenChange={setShowAddMetal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Maden Ekle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Maden Yatırımı Ekle</DialogTitle>
                  <DialogDescription>
                    Aldığınız maden bilgilerini girin
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metal">Maden Türü</Label>
                    <Select 
                      value={metalForm.metalCode} 
                      onValueChange={(value) => {
                        const selected = metals.find(m => m.code === value)
                        setMetalForm(prev => ({
                          ...prev,
                          metal: selected?.name || '',
                          metalCode: value
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Maden seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {metals.map((metal) => (
                          <SelectItem key={metal.code} value={metal.code}>
                            {metal.name} ({metal.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="buyDate">Alım Tarihi</Label>
                    <Input
                      id="buyDate"
                      type="date"
                      value={metalForm.buyDate}
                      onChange={(e) => setMetalForm(prev => ({ ...prev, buyDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyAmount">Alım Miktarı (gr)</Label>
                    <Input
                      id="buyAmount"
                      type="number"
                      step="0.01"
                      placeholder="10"
                      value={metalForm.buyAmount}
                      onChange={(e) => setMetalForm(prev => ({ ...prev, buyAmount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyPrice">Alım Fiyatı (TRY/gr)</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      step="0.01"
                      placeholder="1850.00"
                      value={metalForm.buyPrice}
                      onChange={(e) => setMetalForm(prev => ({ ...prev, buyPrice: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addMetalInvestment} className="w-full">
                    Ekle
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {metalInvestments.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Henüz maden yatırımı eklenmedi</p>
                </CardContent>
              </Card>
            ) : (
              metalInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg">{investment.metal}</CardTitle>
                      <CardDescription>
                        Alım: {new Date(investment.buyDate).toLocaleDateString('tr-TR')}
                      </CardDescription>
                    </div>
                    <Badge variant={investment.profit >= 0 ? "default" : "destructive"}>
                      {investment.profit >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {formatNumber(investment.profitPercentage)}%
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Miktar</p>
                        <p className="font-semibold">{formatNumber(investment.buyAmount)} gr</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alım Fiyatı</p>
                        <p className="font-semibold">{formatCurrency(investment.buyPrice)}/gr</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mevcut Fiyat</p>
                        <p className="font-semibold">{formatCurrency(investment.currentPrice)}/gr</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Kar/Zarar</p>
                        <p className={`font-semibold ${investment.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(investment.profit)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Toplam Değer</p>
                          <p className="text-lg font-bold">{formatCurrency(investment.totalValue)}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteInvestment('metal', investment.id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Kripto Yatırımları */}
        <TabsContent value="crypto" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Kripto Yatırımları</h2>
            <Dialog open={showAddCrypto} onOpenChange={setShowAddCrypto}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Kripto Ekle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kripto Yatırımı Ekle</DialogTitle>
                  <DialogDescription>
                    Aldığınız kripto para bilgilerini girin
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crypto">Kripto Para</Label>
                    <Select 
                      value={cryptoForm.cryptoCode} 
                      onValueChange={(value) => {
                        const selected = cryptos.find(c => c.code === value)
                        setCryptoForm(prev => ({
                          ...prev,
                          crypto: selected?.name || '',
                          cryptoCode: value
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kripto para seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptos.map((crypto) => (
                          <SelectItem key={crypto.code} value={crypto.code}>
                            {crypto.name} ({crypto.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="buyDate">Alım Tarihi</Label>
                    <Input
                      id="buyDate"
                      type="date"
                      value={cryptoForm.buyDate}
                      onChange={(e) => setCryptoForm(prev => ({ ...prev, buyDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyAmount">Alım Miktarı</Label>
                    <Input
                      id="buyAmount"
                      type="number"
                      step="0.00000001"
                      placeholder="0.1"
                      value={cryptoForm.buyAmount}
                      onChange={(e) => setCryptoForm(prev => ({ ...prev, buyAmount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyPrice">Alım Fiyatı (TRY)</Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      step="0.01"
                      placeholder="850000"
                      value={cryptoForm.buyPrice}
                      onChange={(e) => setCryptoForm(prev => ({ ...prev, buyPrice: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addCryptoInvestment} className="w-full">
                    Ekle
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {cryptoInvestments.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Henüz kripto yatırımı eklenmedi</p>
                </CardContent>
              </Card>
            ) : (
              cryptoInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg">{investment.crypto}</CardTitle>
                      <CardDescription>
                        Alım: {new Date(investment.buyDate).toLocaleDateString('tr-TR')}
                      </CardDescription>
                    </div>
                    <Badge variant={investment.profit >= 0 ? "default" : "destructive"}>
                      {investment.profit >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {formatNumber(investment.profitPercentage)}%
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Miktar</p>
                        <p className="font-semibold">{formatNumber(investment.buyAmount)} {investment.cryptoCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alım Fiyatı</p>
                        <p className="font-semibold">{formatCurrency(investment.buyPrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mevcut Fiyat</p>
                        <p className="font-semibold">{formatCurrency(investment.currentPrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Kar/Zarar</p>
                        <p className={`font-semibold ${investment.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(investment.profit)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Toplam Değer</p>
                          <p className="text-lg font-bold">{formatCurrency(investment.totalValue)}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteInvestment('crypto', investment.id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
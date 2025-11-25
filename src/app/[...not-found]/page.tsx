'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Home className="mr-2 w-4 h-4" />
              Ana Sayfa
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-gray-300 dark:border-gray-600"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Geri Git
          </Button>
        </div>
      </div>
    </div>
  )
}
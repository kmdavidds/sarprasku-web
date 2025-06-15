"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Layout } from "@/components/layout"
import { NavigationProvider } from "@/contexts/navigation-context"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { faqData } from "@/lib/text"

function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([1])

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = faqData.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Layout>
      <div className="p-4 md:p-6">
        {/* Page Title - Mobile Only */}
        <div className="lg:hidden mb-4">
          <h1 className="text-xl font-semibold text-gray-900">FAQ</h1>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pertanyaan terkait ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-0">
                <button
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4">{item.question}</h3>
                  {expandedItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedItems.includes(item.id) && item.answer && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6">
                    <div className="text-sm md:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQ.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Tidak ada pertanyaan yang ditemukan.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default function FAQ() {
  return (
    <NavigationProvider>
      <FAQContent />
    </NavigationProvider>
  )
}

'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@ipareddes/ui-components";

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

interface ApproachCarouselProps {
  approaches: {
    title: string
    description: string
    image?: string
  }[]
}

export function ApproachCarousel({ approaches }: ApproachCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full mb-12">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {approaches.map((approach, index) => (
            <CarouselItem key={index}>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* Image Section */}
                  {approach.image && (
                    <div className="flex-shrink-0 w-full md:w-1/3">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={approach.image}
                          alt={approach.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className={cn(
                    "flex-1 flex flex-col justify-center",
                    !approach.image && "w-full"
                  )}>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {approach.title}
                    </h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {approaches.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                current === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to approach ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

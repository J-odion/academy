import * as React from "react"
import { Card, CardContent } from "../ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image";

export function SPGCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const imageUrls = [
    "/image1.png",
    "/image1.png",
  ];

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="w-[80%] px-6">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem  key={index}>
              <Card className="border-none  w-[300px] h-[200px]">
                <CardContent className="flex items-center justify-center p-6">
                <Image
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    width={300} // Set your desired width
                    height={300} // Set your desired height
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}

'use client'
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { useInView } from "framer-motion"
import { ANIMATION_DELAY, PHONES } from "@/constants";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

function splitArray<T>(array: Array<T>, numCol: number) {
  const result: Array<Array<T>> = [];
  for(let i = 0; i< array.length; i++) {
    const index = i % numCol;
    if(!result[index]) {
      result[index] = []
    }

    result[index].push(array[i]);
  }
  return result;
}

const ReviewColumn = ({reviews, className, reviewClassName, msPerPixel = 0}: 
  { reviews: Array<string>, 
    className?: string, 
    reviewClassName?: (reviewIndex: number) => string,
    msPerPixel?: number
  }) => {
    const columnRef = useRef<HTMLDivElement | null>(null);
    const [columnHeight, setColumnHeight] = useState(0);
    const duration = `${columnHeight * msPerPixel}ms`

    useEffect(() => {
      if(!columnRef.current) return 

      const resizeObserver = new window.ResizeObserver(() => {
        setColumnHeight(columnRef?.current?.offsetHeight ?? 0);
      })
      resizeObserver.observe(columnRef.current);

      return () => {
        resizeObserver.disconnect();
      }
    }, [])


    return (
      <div ref={columnRef} className={cn("animate-marqueeUp space-y-8 py-4", className)} style={{'--marquee-duration': duration} as React.CSSProperties}>
        {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
          <Review imgSrc={imgSrc} key={reviewIndex} className={reviewClassName?.(reviewIndex % reviews.length)} />
        ))}
      </div>
    )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}

const Review = ({imgSrc, className, ...props} : ReviewProps) => {

  const animationDelay = ANIMATION_DELAY[Math.floor(Math.random() * ANIMATION_DELAY.length)];

  return (
    <div {...props} 
      className={cn("animate-fade-in rounded-[2.25rem]  bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)}
      style={{animationDelay}}
      >
        <Phone imgSrc={imgSrc} />
    </div>
  )
}

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, {once: true, amount: 0.4})
    const columns = splitArray(PHONES, 3);
    const column1 = columns[0];
    const column2 = columns[1];
    const column3 = splitArray(columns[2], 2);


    return (
        <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {isInView ? <>
            <ReviewColumn reviews={[...column1, ...column3.flat(), ...column2]} reviewClassName={(reviewIndex) => cn({
              "md:hidden": reviewIndex >= column1.length + column3[0].length,
              "lg:hidden": reviewIndex >= column1.length
            })} msPerPixel={10} />
            <ReviewColumn reviews={[ ...column2]} 
              className="hidden md:block animate-marqueeDown"
              reviewClassName={(reviewIndex) => reviewIndex >= column2.length ? 'lg:hidden' : ''} msPerPixel={15} />
            <ReviewColumn reviews={column3.flat()} 
              className="hidden md:block"
              msPerPixel={10} />
            </> : null}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-50"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-slate-50"></div>
        </div>
    )
}

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
        <img aria-hidden={true} src="/what-people-are-buying.png" alt="what people are buying" className="absoule hidden select-none xl:block -left-32 top-1/3" />
        <ReviewGrid />
    </MaxWidthWrapper>
  )
}

export default Reviews
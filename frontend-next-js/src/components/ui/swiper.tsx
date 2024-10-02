"use client";

import {Swiper, SwiperClass, SwiperRef, SwiperSlide} from "swiper/react";
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import * as React from "react"
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SwiperSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

interface CardSwiperSliderProps extends React.HTMLAttributes<HTMLDivElement> {

}

const CardSwiperSlider = React.forwardRef<HTMLDivElement, CardSwiperSliderProps>(
    ({ className, children, ...props }, ref) => 
        <SwiperSlide className={cn("h-full bg-yellow-300", className)} {...props}>
            <section ref={ref}>{children}</section>
        </SwiperSlide> 
);
CardSwiperSlider.displayName = "CardSwiperSlider"

const SwiperSlider = (({ className, title, ...props }: SwiperSliderProps ) => {
    const swiperRef = React.useRef<SwiperClass|null>(null);
    const [isBeginning, setIsBeginning] = React.useState<boolean>(true);
    const [isEnd, setIsEnd] = React.useState<boolean>(false);

    const handleSlideChange = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }

    return(
        <section className="space-y-3 md:space-y-4 mb-10">
            <section className="flex items-center justify-between mr-28">
                {title && <h2 className="font-semibold text-xl md:text-2xl">{title}</h2>}
                <div className="hidden md:flex md:space-x-2">
                    <button onClick={() => swiperRef.current?.slidePrev()} className={isBeginning? "opacity-20" : "hover:translate-x-[-3px] hover:transition-transform hover:duration-300 hover:transform"}>
                        <ChevronLeft size={25}/>
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()} className={isEnd? "opacity-20" : "hover:translate-x-[3px] hover:transition-transform hover:duration-300 hover:transform"}>
                        <ChevronRight size={25}/>
                    </button>
                </div>
            </section>
            <Swiper
                freeMode={true}
                modules={[Pagination, FreeMode]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => handleSlideChange(swiper)}
                breakpoints={{
                    320: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    375: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },
                    425: {
                        slidesPerView: 1.7,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2.60,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1300: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    2000: {
                        slidesPerView: 6.60,
                        spaceBetween: 20,
                    },
                }}
                className="h-64 mb-10"
            >
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
                <CardSwiperSlider>test</CardSwiperSlider>
            </Swiper>
        </section>
    );

})

export { SwiperSlider }


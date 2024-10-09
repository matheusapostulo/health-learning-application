"use client";

import 'swiper/css';
import * as React from "react";
import { useSession } from "next-auth/react"
import {Swiper, SwiperClass, SwiperSlide} from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { TbTargetArrow } from "react-icons/tb";
import {Card, CardBody, CardHeader} from "@material-tailwind/react";
import { Model } from '@/types/model';
import { favoriteModel, getHotModels, unfavoriteModel } from '@/actions/model';
import { Session } from "next-auth";
import { useDoubleTap } from "use-double-tap";

export interface SwiperSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

interface CardSwiperSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    model: Model;
    session: Session;
}

const CardSwiperSlider = ({ className, model, session, ...props } : CardSwiperSliderProps) => {
    const [favorited, setFavorited] = React.useState(false);
    const [temporaryFavoritedCount, setTemporaryFavoritedCount] = React.useState(model.favoritesCount);

    const bind = useDoubleTap(() => {
        handleDoubleClickFavoriteModel();
    })

    const handleDoubleClickFavoriteModel =  async () => {
        if(!favorited){
            setFavorited(true);
            setTemporaryFavoritedCount((temporaryFavoritedCount) => temporaryFavoritedCount + 1);
            try{
                const {error} = await favoriteModel(model.id, session.user.user_data.id, session.accessToken);
                if(error){
                    // Let's define the error here later
                    setFavorited(false);
                    setTemporaryFavoritedCount((temporaryFavoritedCount) => temporaryFavoritedCount - 1);
                }
            } catch(error){
                setFavorited(false);
            }
        }
    };

    const handleClickUnfavoriteModel = async () => {
        if(favorited){
            setFavorited(false);
            setTemporaryFavoritedCount((temporaryFavoritedCount) => temporaryFavoritedCount - 1);
            try {
                const {error} = await unfavoriteModel(model.id, session.user.user_data.id, session.accessToken);
                if(error){
                    // Let's define the error here later
                    setFavorited(true);
                    setTemporaryFavoritedCount((temporaryFavoritedCount) => temporaryFavoritedCount + 1);
                }
            } catch (error) {
                setFavorited(!favorited);
            }
        }
    }

    /* 
        For a while, the favorited models are not being updated in the session object. 
        We're checking in the model object if the user has favorited the model. 
    */
    React.useEffect(() => {
        if(model.favoritedBy.includes(session.user.user_data.id)){
            setFavorited(true);
        }
    },[]);

    return(
        <SwiperSlide className="touch-manipulation"  {...bind} {...props}>
            <Card
                shadow={false}
                className="relative h-full w-full items-start justify-end overflow-hidden pointer-events-auto cursor-pointer"
                placeholder={""}
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-md bg-[url('https://plus.unsplash.com/premium_photo-1661771843714-fa40c226f43c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                    placeholder={""}
                >
                    <div className="to-bg-black-10 rounded-md absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
            
                <CardBody className="relative flex flex-col justify-between pb-4 h-[43%] px-4 w-full" placeholder={"CardContent"}>
                    <div className="">
                        <h1 className="text-white font-semibold text-xl">{model.modelName}</h1>
                        <p className="font-extralight text-xs md:text-sm text-white">{model.description}</p>
                    </div>
                    <div className="flex flex-row text-xs space-x-4 md:space-x-5">
                        <div className="flex flex-row space-x-1 items-center text-white">
                            {favorited ? (
                                <StarIcon onClick={handleClickUnfavoriteModel} className="h-7 w-7 text-yellow-600" />
                            ) : (
                                <StarOutlineOutlinedIcon onClick={handleDoubleClickFavoriteModel} className="h-7 w-7 text-white" />
                            )}
                            <p>{temporaryFavoritedCount}</p>
                        </div>
                        <div className="flex flex-row space-x-1 items-center text-white">
                            <TbTargetArrow strokeWidth={1} className="h-7 w-7" />
                            <p>{model.accuracy * 100}%</p>
                        </div>
                    </div>
                </CardBody> 
            </Card>            
        </SwiperSlide>
    )
}
CardSwiperSlider.displayName = "CardSwiperSlider"

const SwiperSlider = (({ className, title, ...props }: SwiperSliderProps ) => {
    const { data: session } = useSession();
    const [models, setModels] = React.useState<Model[]>([]);
    const swiperRef = React.useRef<SwiperClass|null>(null);
    const [isBeginning, setIsBeginning] = React.useState<boolean>(true);
    const [isEnd, setIsEnd] = React.useState<boolean>(false);

    const handleGetHotModels = async () => {
        try {
            const {success} = await getHotModels();
            if(success){
                setModels(success);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        handleGetHotModels();
    },[]);

    
    const handleSlideChange = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }

    return(
        <section className="space-y-3 md:space-y-4 mb-10" {...props}>
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
                        slidesPerView: 3.5,
                        spaceBetween: 20,
                    },
                    1300: {
                        slidesPerView: 4.5,
                        spaceBetween: 20,
                    },
                    2000: {
                        slidesPerView: 6.5,
                        spaceBetween: 20,
                    },
                }}
                className="h-72 mb-10"
            >
                { models?.map((model) => {
                    return session ? (
                        <CardSwiperSlider key={model.id} model={model} session={session}/>
                    ) : null;
                })}
            </Swiper>
        </section>
    );

})

export { SwiperSlider }


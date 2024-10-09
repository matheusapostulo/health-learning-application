import { auth } from "../../auth";
import { TextHighlight } from "@/components/ui/text-highlight";
import { SignOut } from "@/components/auth/signout-button";
import HomeRegisterEmail from "@/components/auth/home-register-email";
import { SwiperSlider } from "@/components/ui/swiper";
import Image from "next/image";

export default async function Home() { 
  const session = await auth();

  if(!session) {
    return(
      <section className="flex px-4 md:px-20 xl:pr-0 xl:mt-4">   
        <section className="flex-col space-y-7">
          <section className="flex flex-col space-y-4 text-left">
            <h1 className="font-extrabold text-5xl md:text-[80px]">
              Faça uma <TextHighlight>avaliação </TextHighlight> em nossos <TextHighlight>modelos</TextHighlight>
            </h1>
            <p className="text-base md:text-xl xl:pr-28">
              Descubra sua <span className="font-extrabold text-beige-main">saúde</span>!
              Acesse <span className="font-extrabold text-beige-main">modelos</span> de algoritmos para consultar possíveis condições de saúde com base em seus <span className="font-extrabold text-beige-main ">dados</span>.
            </p>
          </section>
          <section className="flex-col pt-2 md:pr-64 items-center mx-auto space-y-2">
            <h1 className="text-left text-sm md:text-base font-semibold">Insira seu email e faça uma avaliação</h1>
            <HomeRegisterEmail/>
          </section>
        </section>
        <div className="hidden xl:relative xl:inline-block rounded-full">
          <Image src={"/hl_homepage.png"} width={1400} height={1000} alt="medicos_image" className="object-cover z-10 relative"/>
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-beige-main to-transparent blur-2xl z-0"></div>
        </div>
      </section>
    );
  }
  return(
    <section className="pl-4 md:pl-20">
      <h1 className="font-extrabold text-start text-3xl md:text-4xl mb-8 md:mb-12">
        Bem Vindo(a), <TextHighlight>{session.user.user_data.name} {session.user.user_data.lastName}</TextHighlight>
      </h1>
      <SwiperSlider title="Modelos em alta"/>
      <SignOut/>
    </section>
  );

}

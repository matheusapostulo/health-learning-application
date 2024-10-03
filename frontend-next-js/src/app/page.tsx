import { auth } from "../../auth";
import { TextHighlight } from "@/components/ui/text-highlight";
import { SignOut } from "@/components/auth/signout-button";
import HomeRegisterEmail from "@/components/auth/home-register-email";
import { SwiperSlider } from "@/components/ui/swiper";

export default async function Home() { 
  const session = await auth();

  if(!session) {
    return(
      <section className="flex-col px-4 md:px-20 xl:mt-4 space-y-9 text-left sm:text-center">
        <section className="flex flex-col space-y-4 text-left sm:text-center ">
          <h1 className="font-extrabold text-5xl md:text-7xl xl:text-8xl">
            Faça uma <TextHighlight>avaliação </TextHighlight> em nossos <TextHighlight>modelos</TextHighlight>
          </h1>
          <p className="text-base sm:px-10 md:text-2xl xl:px-36">
            Descubra sua <span className="font-extrabold text-beige-main">saúde</span>!
            Acesse <span className="font-extrabold text-beige-main">modelos</span> de algoritmos para consultar possíveis condições de saúde com base em seus <span className="font-extrabold text-beige-main ">dados</span>.
          </p>
        </section>
        <section className="flex-col pt-2 md:pt-4 sm:px-32 lg:px-52 xl:px-96 items-center mx-auto space-y-2">
          <h1 className="text-left text-sm md:text-base font-semibold">Insira seu email e faça uma avaliação</h1>
          <HomeRegisterEmail/>
        </section>

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

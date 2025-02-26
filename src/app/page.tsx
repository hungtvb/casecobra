import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import UserFeedback from "@/components/UserFeedback";
import { FEATURES, USER_FEEDBACKS } from "@/constants";
import { Check, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absoulte w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" alt="snake logo" className="w-full" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance lg:text-wrap">
                Capture your favorite memories with your own{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to project your memories, not just your
                phone case.
              </p>
              <ul className="mt-8 space-x-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-1.5 text-left items-center"
                    >
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    src="/users/user-1.png"
                    alt="user"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-2.png"
                    alt="user"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-3.png"
                    alt="user"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-4.jpg"
                    alt="user"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-5.jpg"
                    alt="user"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                alt="your-image"
                className="absoulte w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <img
                src="/line.png"
                alt="line"
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-63" imgSrc="/testimonials/4.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our
              <span className="relative px-2">
                customers
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>
              say
            </h2>
            <img src="/snake-2.png" alt="snake" className="w-24 order-0 lg:order-2"/>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            {USER_FEEDBACKS.map((fb) => (
              <UserFeedback rating={fb.rating} key={fb.name} comment={fb.comment} name={fb.name} image={fb.image} />
            ))}
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews/>
        </div>
      </section>
    </div>
  );
}


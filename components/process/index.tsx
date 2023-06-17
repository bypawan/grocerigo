import React from "react";
import * as processImages from "@/assets/images/process";
import * as reusedImages from "@/assets/images/header";
import Image from "next/image";

export const Process = () => {
  return (
    <section className="relative">
      <div className="max-w-3xl mx-auto py-36">
        <h2 className="text-[56px] leading-[66px] text-[#030c24] text-center">
          Take a look at our carefully crafted process
        </h2>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-24 mb-14"
            src={processImages.grinder}
            alt="grinder for coffee"
          />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-xs">
            Measure and grind the coffee beans
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            Measure out the desired amount of whole coffee beans and grind them
            to the appropriate size, depending on the brewing method you are
            using.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-14 mb-10"
            src={processImages.heatArrow}
            alt="arrow"
          />
          <Image
            className="mb-12"
            src={processImages.heatWater}
            alt="heat water"
          />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-sm">
            Heat water to the correct temperature
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            For most brewing methods, the ideal water temperature is between
            195°F to 205°F (90°C to 96°C). Use a thermometer to measure the
            water temperature or bring it to a boil and let it cool for a few
            minutes.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-14 mb-10"
            src={processImages.kettleArrow}
            alt="arrow"
          />
          <Image className="mb-12" src={processImages.kettle} alt="kettle" />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-xs">
            Measure and grind the coffee beans
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            Measure out the desired amount of whole coffee beans and grind them
            to the appropriate size, depending on the brewing method you are
            using.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-14 mb-10"
            src={processImages.pourArrow}
            alt="arrow"
          />
          <Image className="mb-12" src={processImages.pour} alt="pour" />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-sm">
            Pour the hot water over the coffee
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            Slowly pour the hot water over the coffee in a circular motion,
            making sure all the grounds are evenly saturated. The water should
            be poured in stages or pulses, depending on the brewing method.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-14 mb-10"
            src={processImages.brewArrow}
            alt="arrow"
          />
          <Image className="mb-12" src={processImages.brew} alt="brew" />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-sm">
            Allow the coffee to brew
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            Depending on the brewing method, allow the coffee to brew for a few
            minutes. During this time, the water will extract the coffee&apos;s
            flavor and aroma.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            className="mt-14 mb-10"
            src={processImages.serveArrow}
            alt="arrow"
          />
          <Image className="mb-12" src={processImages.serve} alt="serve" />
          <h3 className="text-[#030c24] text-[26px] leading-[36px] max-w-sm">
            Serve and enjoy
          </h3>
          <p className="mt-4 text-xl leading-[30px] max-w-md">
            Once the coffee has finished brewing, remove the brewing device and
            serve the coffee immediately. You can add cream, milk, or sweeteners
            to taste.
          </p>
        </div>
      </div>
      <Image
        className="absolute -top-40 -left-20 -z-10"
        src={reusedImages.coffeeBeansRight}
        alt="coffee beans"
      />
      <Image
        className="absolute top-0 left-0 w-[30vw] lg:w-[15vw]"
        src={reusedImages.leafLeft}
        alt="leaf"
      />
      <Image
        className="absolute top-[10%] right-0 w-[38vw] lg:w-[19vw]"
        src={reusedImages.leafRight}
        alt="leaf"
      />
      <Image
        className="absolute top-[20%] left-40"
        src={processImages.beans}
        alt="beans"
      />
      <Image
        className="absolute top-[35%] right-0 w-[48vw] lg:w-[24vw]"
        src={processImages.portafilter}
        alt="portafilter"
      />
      <Image
        className="absolute top-[40%] left-48 w-[28vw] lg:w-[14vw]"
        src={processImages.cookie}
        alt="cookie"
      />
      <Image
        className="absolute bottom-[25%] right-10 w-[38vw] lg:w-[19vw]"
        src={processImages.donut}
        alt="donut"
      />
      <Image
        className="absolute bottom-[10%] right-10 w-40vw] lg:w-[20vw]"
        src={reusedImages.coffeeBeansRight}
        alt="beans"
      />
      <Image
        className="absolute bottom-56 left-48 w-[38vw] lg:w-[19vw]"
        src={reusedImages.cup}
        alt="coffee"
      />
    </section>
  );
};

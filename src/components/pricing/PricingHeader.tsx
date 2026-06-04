import app from "@/lib/config/app.config";

/**
 * Pricing header.
 */
const PricingHeader = () => (
  <div className="flex flex-col items-center">
    <h1 className="mt-4 text-center font-bold text-4xl lg:text-5xl">
      {app.pricingPage.pricingHeader.title}
    </h1>

    <p className="m-4 text-pretty text-center text-xl md:max-w-[70%] lg:text-2xl">
      {app.pricingPage.pricingHeader.description}
    </p>
  </div>
);

export default PricingHeader;

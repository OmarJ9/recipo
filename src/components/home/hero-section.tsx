"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  // Function to handle smooth scrolling
  const handleScrollToCountries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.getElementById("countries-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="pb-20 pt-10 bg-gradient-to-b from-amber-100 via-amber-50/80 to-white">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center px-30">
        <motion.div
          className="space-y-8 w-full lg:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center px-2 gap-2 rounded-full bg-amber-100/80 w-fit">
            <div className="rounded-full bg-amber-500 w-2 h-2 animate-pulse"></div>
            <span className="text-amber-700 dark:text-amber-300 text-sm font-medium">
              World Cuisine Explorer
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Taste the World&apos;s
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300">
              Finest Recipes
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            Embark on a culinary journey across continents, exploring the rich
            tapestry of global flavors. Discover authentic recipes passed down
            through generations, from the spicy streets of Bangkok to the rustic
            kitchens of Tuscany. Our curated collection brings the world&apos;s
            most beloved dishes right to your kitchen - all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
              asChild
            >
              <Link href="/recipes" className="flex items-center">
                <ChefHat className="h-5 w-5 mr-2" />
                Explore Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-6 transition-all"
              asChild
            >
              <Link
                href="#countries-section"
                onClick={handleScrollToCountries}
                className="flex items-center"
              >
                <Globe className="h-5 w-5 mr-2" />
                Discover Countries
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src="/images/hero-food.png"
            alt="Delicious world cuisine"
            priority
            width={600}
            height={600}
            className="object-cover animate-spin duration-20000"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Country } from "@/types/recipe";

interface PopularCuisinesProps {
  popularCuisines: Country[];
}

export function PopularCuisines({ popularCuisines }: PopularCuisinesProps) {
  return (
    <section id="countries-section" className="py-16 bg-white">
      <div className="container mx-auto px-4 ">
        <motion.h2
          className="text-3xl font-bold mb-20 text-center "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Popular Cuisines
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularCuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={`/recipes?countrySlug=${cuisine.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-amber-500 transition-all">
                  <Image
                    src={cuisine.flagImage}
                    alt={`${cuisine.name} flag`}
                    fill
                    quality={90}
                    priority={index <= 2}
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <span className="font-medium group-hover:text-amber-600 transition-colors">
                  {cuisine.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularCuisinesSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-20 text-center">
          Popular Cuisines
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-24 h-24 rounded-full mb-3" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

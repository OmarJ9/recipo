import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-16 bg-amber-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter to get new recipes and cooking tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-grow" />
            <Button className="bg-amber-600 hover:bg-amber-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

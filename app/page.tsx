import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { NewsLetter } from "@/components/newsletter";
import { Process } from "@/components/process";
import { Shop } from "@/components/shop";
import { Story } from "@/components/story";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Shop />
      <Process />
      <Testimonials />
      <Story />
      <NewsLetter />
      <Footer />
    </main>
  );
}

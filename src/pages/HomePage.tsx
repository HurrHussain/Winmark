import { Hero } from "@/components/sections/Hero"
import { GlobalNetwork } from "@/components/sections/GlobalNetwork"
import { Services } from "@/components/sections/Services"
import { Products } from "@/components/sections/Products"
import { History } from "@/components/sections/History"

export function HomePage() {
  return (
    <>
      <Hero />
      <GlobalNetwork />
      <Services />
      <Products />
      <History />
    </>
  )
}

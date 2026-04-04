import Nav from '@/app/components/Nav'
import Hero from '@/app/components/Hero'
import LegendBar from '@/app/components/LegendBar'
import About from '@/app/components/About'
import HowIbuild from '@/app/components/HowIbuild'
import Projects from '@/app/components/Projects'
import Skills from '@/app/components/Skills'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf8] dark:bg-[#111110]" suppressHydrationWarning>
      <Nav />
      <Hero />
      <About />
      <HowIbuild />
      <LegendBar />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}

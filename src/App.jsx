import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Services from './components/Services.jsx'
import Mission from './components/Mission.jsx'
import MidCta from './components/MidCta.jsx'
import Steps from './components/Steps.jsx'
import BlogPreview from './components/BlogPreview.jsx'
import Newsletter from './components/Newsletter.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream focus:shadow-soft"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Stats />
        <Services />
        <Mission />
        <MidCta />
        <Steps />
        <BlogPreview />
        <Newsletter />
        <Faq />
      </main>

      <Footer />
    </>
  )
}

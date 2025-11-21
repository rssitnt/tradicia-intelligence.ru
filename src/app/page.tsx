import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import AnnouncementSection from '@/components/AnnouncementSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <AnnouncementSection />
      <ProjectsSection />
      <ContactsSection />
      <Footer />
      <ChatWidget />
    </div>
  )
} 
import { Link } from 'react-router-dom';
import { ArrowRight, Globe as Globe2, Target, Heart, Lightbulb, ShieldCheck, Zap } from 'lucide-react';
import {
  TextReveal,
  SplitTextReveal,
  FadeUp,
  ParallaxSection,
  ClipReveal,
  SectionLabel,
  HeroParallax,
} from '../components/Animations';

const principlesItems = [
  {
    icon: <Target size={20} />,
    title: 'Precision First',
    description: 'Every formulation and delivery target is engineered for consistency at industrial scale.',
    proof: 'Controlled specs and predictable output',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Compliance by Design',
    description: 'Quality checks are embedded into sourcing, handling, and fulfillment from day one.',
    proof: 'Tested, documented, and audit-ready',
  },
  {
    icon: <Zap size={20} />,
    title: 'Execution Speed',
    description: 'We move fast without sacrificing quality, so production lines stay active and stable.',
    proof: 'Nationwide coverage with rapid response',
  },
  {
    icon: <Heart size={20} />,
    title: 'Trusted Partnership',
    description: 'Our relationships are built on clarity, accountability, and long-term commitment.',
    proof: 'Transparent communication and reliable delivery',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Practical Innovation',
    description: 'We adopt technology that improves planning, procurement, and supply reliability.',
    proof: 'Digital workflows that reduce risk',
  },
  {
    icon: <Globe2 size={20} />,
    title: 'Global Sourcing Intelligence',
    description: 'We connect local manufacturing demand with dependable international supply networks.',
    proof: 'Premium inputs from vetted global partners',
  },
];

const timelineItems = [
  { year: '2001', title: 'The Foundation', description: 'Established in Karachi with a promise to provide uncompromised quality to local food manufacturers.' },
  { year: '2010', title: 'National Expansion', description: 'Expanded logistics and supply networks to serve the growing industrial hubs across Pakistan.' },
  { year: '2019', title: 'A Legacy of Expansion', description: 'Riaz Hussain leads a full corporate restructure, officially registering as Winmark Ingredients Pvt Ltd.' },
  { year: '2026', title: 'Digital Vanguard', description: 'Launching our next-gen industrial portal, bridging physical logistics with advanced digital procurement.' },
];

export default function About() {
  return (
    <>
      {/* ── HERO ── */}
<section className="relative min-h-[100vh] flex items-center overflow-hidden bg-slate-950">
  
  {/* 1. THE IMAGE LAYER */}
  <div className="absolute inset-0 z-0">
    <img
      // Replace the URL below with your actual image path when ready
      src="download.jpg"
      alt="Winmark Industrial Heritage"
      className="w-full h-full object-cover opacity-60 grayscale-[0.6] brightness-[0.9]"
    />
  </div>

  {/* 2. THE OVERLAY LAYER (Ensures Text Contrast) */}
  <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
  <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

  {/* 3. THE CONTENT LAYER */}
  <HeroParallax className="container-enterprise mx-auto px-8 lg:px-20 relative z-10 pt-39 pb-20 w-full">
    <SplitTextReveal
      lines={[
        <span key="l1" className="font-sans text-xs tracking-[0.3em] uppercase text-teal-400 block mb-6 drop-shadow-md">
          About Winmark Ingredients
        </span>,
        <span key="l2" className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.02] block drop-shadow-xl">
          With you at every
        </span>,
        <span key="l3" className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-teal-400 leading-[1.02] block drop-shadow-xl">
          stage of supply.
        </span>,
      ]}
      stagger={0.12}
    />
    <TextReveal delay={0.5}>
      <p className="font-sans text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed mt-8 drop-shadow-md">
        Securing Pakistan's industrial food supply chain through 25 years of integrity, precision, and decisive leadership.
      </p>
    </TextReveal>
  </HeroParallax>
</section>

      {/* ── INTRO STATEMENT ── */}
      <section className="bg-paper py-24 md:py-36">
        <div className="container-enterprise mx-auto px-8 lg:px-20">
          <SectionLabel>Who We Are</SectionLabel>
          <SplitTextReveal
            lines={[
              <p key="h" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 leading-[1.12] max-w-4xl mt-6">
                A premier sourcing infrastructure 
              </p>,
              <p key="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-teal-500 leading-[1.12] max-w-4xl">
                built for absolute industrial scale.
              </p>,
            ]}
            stagger={0.15}
          />
          <FadeUp delay={0.4}>
            <p className="font-sans text-lg text-slate-400 mt-8 max-w-4xl leading-relaxed">
              Operating at the heart of the food manufacturing sector, we source, process, and deliver vital ingredients. From specialty fats to rich cocoa derivatives, we act as the shield protecting your production lines from market volatility.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PARALLAX IMAGE ── */}
      <ClipReveal direction="left" className="h-[55vh] bg-slate-200">
        <ParallaxSection speed={0.25}>
          <img
            src="22.jpg"
            alt="Winmark Industrial Infrastructure"
            className="w-full h-[55vh] object-cover"
          />
        </ParallaxSection>
      </ClipReveal>

      {/* ── OPERATING PRINCIPLES ── */}
      <section className="bg-paper py-24 md:py-36 border-y border-slate-200">
        <div className="container-enterprise mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <FadeUp className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionLabel>Operating Principles</SectionLabel>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mt-5 leading-tight">
                Not just values on paper.
              </h2>
              <p className="font-sans text-slate-500 mt-5 leading-relaxed">
                This is the working system behind every Winmark engagement. Each principle is measurable, actionable, and built to protect production continuity.
              </p>
              <div className="mt-8 p-5 bg-slate-900 text-slate-100 border border-slate-800">
                <p className="font-sans text-xs tracking-[0.22em] uppercase text-teal-300 mb-3">Operating Promise</p>
                <p className="font-serif text-xl leading-snug">
                  "Your supply chain should feel predictable, even when markets are not."
                </p>
              </div>
            </FadeUp>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {principlesItems.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.06}>
                  <article className="h-full bg-white border border-slate-200 p-6 group hover:border-teal-400 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-10 h-10 bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-slate-400">P0{i + 1}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-3 leading-snug">{item.title}</h3>
                    <p className="font-sans text-[15px] leading-relaxed text-slate-500 mb-4">{item.description}</p>
                    <div className="pt-4 border-t border-slate-100">
                      <p className="font-sans text-xs tracking-wide uppercase text-teal-700 font-semibold">{item.proof}</p>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── OUR STORY — DARK SECTION ── */}
      <ClipReveal direction="bottom">
        <section className="bg-slate-800 py-24 md:py-36">
          <div className="container-enterprise mx-auto px-6 lg:px-20">
            <SectionLabel dark>Our Story</SectionLabel>
            <div className="grid lg:grid-cols-2 gap-16 items-center mt-6">
              <div>
                <TextReveal delay={0.1}>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    A Legacy of Expansion under <br/><span className="text-teal-400">Riaz Hussain</span>
                  </h2>
                </TextReveal>
                <FadeUp delay={0.2}>
                  <p className="font-sans text-slate-200 leading-relaxed mb-4">
                    In 2019, a pivotal leadership transition brought a renewed, aggressive vision to Winmark. Recognizing the shifting demands of Pakistan's industrial sector, Riaz Hussain initiated a comprehensive strategic overhaul.
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <p className="font-sans text-slate-300 leading-relaxed mb-4">
                    Under his direction, the company underwent a full corporate restructure, officially registering as Winmark Ingredients Pvt Ltd to better serve Direct Industries, HoReCa, and Bakeries.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="font-sans text-slate-300 leading-relaxed">
                    Today, we bridge decades of physical logistics expertise with next-generation supply chain technology, powering Pakistan's food industry forward.
                  </p>
                </FadeUp>
              </div>
              <FadeUp delay={0.15}>
                <div className="bg-slate-700/50 border border-slate-600 p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: '2001', label: 'Year Founded' },
                      { value: '120+', label: 'Products' },
                      { value: '1', label: 'National Network' },
                      { value: '25+', label: 'Years of Trust' },
                    ].map((stat) => (
                      <div key={stat.label} className="border-l-2 border-teal-500 pl-4">
                        <p className="font-serif text-2xl font-bold text-white">{stat.value}</p>
                        <p className="font-sans text-xs tracking-wider uppercase text-slate-300 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </ClipReveal>

      {/* ── TIMELINE ── */}
      <section className="bg-slate-800 py-10 md:py-5">
        <div className="container-enterprise mx-auto px-6 lg:px-20">
          <SectionLabel>Our Journey</SectionLabel>
          <TextReveal delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-4 mb-16">
              Milestones of Growth
            </h2>
          </TextReveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.08}>
                  <div
                    className={`relative flex items-start gap-8 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="pl-12 md:pl-0">
                        <span className="font-serif text-3xl font-bold text-teal-500">{item.year}</span>
                        <h3 className="font-serif text-xl font-bold text-slate-200 mt-1">{item.title}</h3>
                        <p className="font-sans text-sm text-slate-300 mt-2 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-teal-500 border-4 border-slate-800 rounded-full z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECOND PARALLAX IMAGE ──
      <ClipReveal direction="right" className="h-[40vh] bg-slate-200">
        <ParallaxSection speed={0.2}>
          <img
            src="https://images.pexels.com/photos/25770006/pexels-photo-25770006.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
            alt="Winmark Logistics and Distribution"
            className="w-full h-[40vh] object-cover"
          />
        </ParallaxSection>
      </ClipReveal> */}

      {/* ── CTA ── */}
      <ClipReveal direction="bottom">
        <section className="bg-teal-500">
          <div className="container-enterprise mx-auto px-6 lg:px-20 py-16">
            <FadeUp>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                    Ready to scale your production?
                  </h2>
                  <p className="font-sans text-teal-100 mt-2">
                    Partner with Winmark for uncompromising quality and zero-downtime logistics.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="bg-white text-teal-500 px-8 py-3 font-sans text-sm font-semibold tracking-wider uppercase border-sharp hover:bg-teal-50 transition-colors shrink-0 inline-flex items-center gap-2"
                >
                  Partner With Us <ArrowRight size={16} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </ClipReveal>
    </>
  );
}

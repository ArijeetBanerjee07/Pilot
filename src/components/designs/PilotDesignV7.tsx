"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Wind, Info, MessageCircle } from 'lucide-react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { RadialGlowButton } from '../ui/radial-glow-button';
import TextMarque from '../ui/text-marque';
import ScrollReveal from '../ui/ScrollReveal';
import MaskedHeading from '../ui/MaskedHeading';
import AnimatedTextSVG from '../ui/AnimatedTextSVG';
import PaperPlanePuzzle from '../ui/PaperPlanePuzzle';
import StarBorder from '../ui/StarBorder';

function StarRating() {
  const [hovered, setHovered] = React.useState(0);
  const [selected, setSelected] = React.useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1,2,3,4,5].map((star) => (
        <svg
          key={star}
          className="review-star w-7 h-7"
          viewBox="0 0 24 24"
          fill={(hovered || selected) >= star ? '#FBBF24' : 'none'}
          stroke={(hovered || selected) >= star ? '#FBBF24' : 'rgba(202,171,255,0.3)'}
          strokeWidth="1.5"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => setSelected(star)}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ))}
      {selected > 0 && (
        <span className="ml-2 text-[#FBBF24] text-sm font-semibold">
          {['','Poor','Fair','Good','Great','Excellent'][selected]}
        </span>
      )}
    </div>
  );
}

export default function PilotDesignV7() {
  const [isPuzzleSolved, setIsPuzzleSolved] = React.useState(false);
  const [autoSolve, setAutoSolve] = React.useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 300]);
  const squiggleRef = React.useRef<HTMLDivElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const planeRef = React.useRef<HTMLImageElement>(null);

  const { scrollYProgress: squiggleProgress } = useScroll({
    target: squiggleRef,
    offset: ["start center", "end end"]
  });

  const updatePlanePosition = React.useCallback((latest: number) => {
    if (pathRef.current && planeRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      if (totalLength === 0) return;
      
      const currentLength = totalLength * latest;
      const point = pathRef.current.getPointAtLength(currentLength);
      
      const nextLength = currentLength + 2;
      let angle = 0;
      
      if (nextLength > totalLength) {
         const prevPoint = pathRef.current.getPointAtLength(Math.max(0, currentLength - 2));
         angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
      } else {
         const nextPoint = pathRef.current.getPointAtLength(nextLength);
         angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      }
      
      planeRef.current.style.transform = `translate(calc(${point.x}px - 50%), calc(${point.y}px - 50%)) rotate(${angle + 45}deg)`;
      planeRef.current.style.opacity = "1";
    }
  }, []);

  useMotionValueEvent(squiggleProgress, "change", updatePlanePosition);

  const [svgSize, setSvgSize] = React.useState({ width: 1500, height: 3000 });

  React.useEffect(() => {
    // Ensure plane is positioned immediately even before user scrolls
    const timer = setTimeout(() => {
      updatePlanePosition(squiggleProgress.get());
    }, 150);
    return () => clearTimeout(timer);
  }, [svgSize, updatePlanePosition, squiggleProgress]);
  
  React.useEffect(() => {
    if (!squiggleRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSvgSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(squiggleRef.current);
    return () => observer.disconnect();
  }, []);

  const { width: W, height: H } = svgSize;
  const pathD = `M ${W*0.5} 0 C ${W*0.9} ${H*0.1}, ${W*0.9} ${H*0.23}, ${W*0.5} ${H*0.33} C ${W*0.1} ${H*0.43}, ${W*0.1} ${H*0.56}, ${W*0.5} ${H*0.66} C ${W*0.9} ${H*0.76}, ${W*0.9} ${H*0.9}, ${W*0.85} ${H}`;
  
  return (
    <div className="flex flex-col relative w-full min-h-screen bg-slate-50 overflow-x-hidden text-gray-900 font-sans">
      
      {/* Full-Screen Background Video */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Idea2_gwr_video_mvp-enhanced.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Navbar (Same as V6) */}
      <nav className="sticky top-6 z-50 w-full max-w-4xl mx-auto flex items-center justify-between px-8 py-4 rounded-full backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_0_40px_rgba(168,85,247,0.4)] mt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <span className="text-black text-xl font-bold tracking-tight">Pilot AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-black/70 hover:text-black transition-colors text-sm font-semibold tracking-wide">About</a>
          <a href="#" className="text-black/70 hover:text-black transition-colors text-sm font-semibold tracking-wide">Features</a>
          <a href="#" className="text-black/70 hover:text-black transition-colors text-sm font-semibold tracking-wide">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <RadialGlowButton className="px-6 py-2 text-sm shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none cursor-pointer">
              Get Started
            </RadialGlowButton>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full flex-1 flex flex-col items-start justify-center min-h-[90vh] px-8 md:px-24 pt-12 pb-32 overflow-hidden">

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-start gap-8 relative z-10"
        >
          <div className="w-full mb-[-4rem]">
            <AnimatedTextSVG 
              textLines={["The Smarter,", "AI Powered", "Autonomous", "Platform"]} 
            />
          </div>
          <p className="text-black/80 text-xl md:text-2xl font-medium max-w-xl">
            Harness the power of decentralized AI with Pilot. The future is fly.
          </p>
          <div className="flex items-center gap-4 mt-4 w-full">
            <Link href="/auth">
              <RadialGlowButton className="w-[200px] h-[60px] text-lg shadow-[0_6px_0_rgba(0,0,0,0.2)] active:translate-y-[6px] active:shadow-none font-bold flex items-center justify-center !p-0 cursor-pointer">
                Get Started
              </RadialGlowButton>
            </Link>
            <a href="https://github.com/ArijeetBanerjee07/Pilot" target="_blank" rel="noopener noreferrer" className="w-[200px] h-[60px] flex items-center justify-center gap-3 rounded-full border border-black/20 bg-white/20 hover:bg-white/40 backdrop-blur-md shadow-[0_6px_0_rgba(0,0,0,0.05)] active:translate-y-[6px] active:shadow-none transition-all text-black text-lg font-bold">
              <FaGithub className="w-6 h-6" />
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Marquee Junction */}
      <div className="w-full py-16 bg-white overflow-hidden border-y border-black/5 flex flex-col gap-6 relative z-10">
        <TextMarque
          delay={100}
          baseVelocity={-1}
          clasname="font-black tracking-tighter leading-[90%] text-purple-600 uppercase"
        >
          Star the repo if you like it · 
        </TextMarque>
        <TextMarque
          delay={100}
          baseVelocity={1}
          clasname="font-black tracking-tighter leading-[90%] text-black uppercase"
        >
          Share it if you like it · 
        </TextMarque>
      </div>

      {/* Scroll Reveal Section (Implementation Page) */}
      <div ref={squiggleRef} className="relative w-full">
        {/* SVG Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-90">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <motion.path
              ref={pathRef as React.RefObject<SVGPathElement>}
              d={pathD}
              fill="none"
              stroke="#FF99CC"
              strokeWidth={Math.max(20, W * 0.04)}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: squiggleProgress }}
            />
          </svg>
        </div>

        {/* Plane Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <img 
            ref={planeRef} 
            src="/paper_plane_tip.png" 
            alt="plane" 
            className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_10px_20px_rgba(189,107,251,0.5)] transition-opacity duration-300"
            style={{ opacity: 0 }} 
          />
        </div>

      <section className="relative z-10 w-full flex flex-col items-center justify-center bg-transparent overflow-hidden py-32">
        <div className="w-full max-w-6xl mx-auto px-6 mb-16">
          <MaskedHeading
            text="Our Implementation"
            mediaType="image"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            fillScale={1.3}
            parallax={34}
            reveal="wipe"
            trigger="view"
            className="w-full"
            textScale={0.08}
          />
        </div>
        
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={3}
          blurStrength={4}
          containerClassName="max-w-5xl mx-auto px-8 text-center"
          textClassName="text-black/90 font-bold leading-[1.4]"
        >
          Pilot is an autonomous AI control platform that helps you deploy, monitor, and improve AI agents that perform real-world tasks across the web. Instead of simply chatting with an AI, Pilot lets agents research, navigate websites, execute workflows, and handle multi-step operations while giving you real-time visibility, human approval controls, execution history, and performance evaluations. Pilot solves the problem of unreliable, opaque AI automation by making autonomous agents observable, controllable, measurable, and continuously improvable.
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-32">
        
        <div className="flex items-center justify-center mb-10 w-full">
          <h2 className={`text-black text-4xl md:text-5xl font-black text-center tracking-tight transition-all duration-[3000ms] ease-in-out ${isPuzzleSolved ? 'drop-shadow-[0_0_25px_#bd6bfb] text-black' : 'drop-shadow-[0_0_10px_rgba(189,107,251,0.3)]'}`}>
            You are the comander
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`max-w-6xl w-full bg-white/30 backdrop-blur-3xl border border-white/80 rounded-[3rem] p-16 md:p-24 flex flex-col md:flex-row items-center gap-16 transition-all duration-[3000ms] ease-in-out ${isPuzzleSolved ? "shadow-[0_0_80px_rgba(189,107,251,0.6)] border-[#bd6bfb]/50" : "shadow-[0_20px_60px_rgba(0,0,0,0.05)]"}`}
        >
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center gap-3 text-black/50 uppercase tracking-widest text-sm font-semibold transition-all">
              <Info className="w-4 h-4" />
              Automate your work
            </div>
            <h2 className="text-black text-4xl md:text-5xl font-bold leading-tight">
              Intelligence isn&apos;t rigid. <br/> <span className={`transition-all duration-[3000ms] ease-in-out ${isPuzzleSolved ? "text-[#bd6bfb]" : "text-black/50"}`}>It&apos;s adaptive.</span>
            </h2>
            <p className="text-black/70 text-lg leading-relaxed">
              We didn&apos;t build another tool that forces you to change how you work. We built an AI that studies your existing workflows, learns your patterns, and integrates itself seamlessly. 
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col gap-2">
                <span className="text-black text-4xl font-bold">10x</span>
                <span className="text-black/50 text-sm font-medium">Faster processing</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-black text-4xl font-bold">0</span>
                <span className="text-black/50 text-sm font-medium">Learning curve</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 relative">
            <PaperPlanePuzzle onSolve={() => setIsPuzzleSolved(true)} forceSolve={autoSolve} />
            {!isPuzzleSolved && (
              <button 
                onClick={() => setAutoSolve(true)}
                className="px-8 py-3 rounded-full border-2 border-[#bd6bfb] text-[#bd6bfb] font-bold hover:bg-[#bd6bfb]/10 hover:border-[#bd6bfb] transition-all shadow-[0_4px_0_rgba(189,107,251,0.2)] active:translate-y-1 active:shadow-none bg-white/50 backdrop-blur-md"
              >
                Automate
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full py-24 px-6 flex flex-col items-center bg-white/20 backdrop-blur-xl border-y border-white/20">
        <div className="text-center mx-auto">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mt-6 tracking-tight">Build Faster and Grow Smarter</h2>
          <p className="text-sm md:text-base text-slate-600 mt-4 max-w-[530px] mx-auto leading-relaxed">
            Build faster with powerful, flexible tools designed to simplify workflows and deliver results without complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-5xl mx-auto mt-16 shadow-2xl rounded-3xl">
          <StarBorder as="div" color="#bd6bfb" speed="5s" thickness={2} className="w-full">
            <div className="relative grid grid-cols-1 md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-slate-100 bg-white/50 backdrop-blur-2xl w-full h-full rounded-[22px] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

          <div className="flex flex-col items-start px-8 py-10 hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="w-[52px] h-[52px] flex items-center justify-center border border-slate-200 rounded-xl mb-10 bg-white shadow-sm group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m11 0h-5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m0 9h-5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1M9 16H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 tracking-wider uppercase mb-2">01 — Autonomous Execution</h3>
            <h4 className="text-lg font-semibold text-slate-800">Give AI the Hands to Get Things Done</h4>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Pilot agents can navigate websites, research information, interact with interfaces, and execute complex multi-step workflows—not just generate text.
            </p>
            <a href="#" className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group-hover:text-purple-600">
              Explore Feature 
              <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>

          <div className="flex flex-col items-start px-8 py-10 hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="w-[52px] h-[52px] flex items-center justify-center border border-slate-200 rounded-xl mb-10 bg-white shadow-sm group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2 8v4a2 2 0 0 0 2 2h4m6-4h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 tracking-wider uppercase mb-2">02 — Human-in-the-Loop Control</h3>
            <h4 className="text-lg font-semibold text-slate-800">Stay in Control, Without Doing the Work</h4>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Watch agents work in real time, review important decisions, and step in whenever an action requires your approval. Pilot keeps autonomy and human oversight together.
            </p>
            <a href="#" className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group-hover:text-purple-600">
              See How It Works
              <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>

          <div className="flex flex-col items-start px-8 py-10 hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="w-[52px] h-[52px] flex items-center justify-center border border-slate-200 rounded-xl mb-10 bg-white shadow-sm group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22v-5m3-9V2m2 6a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1zM9 8V2" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 tracking-wider uppercase mb-2">03 — Observe, Evaluate & Improve</h3>
            <h4 className="text-lg font-semibold text-slate-800">Every Run Makes Your Agents Better</h4>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Track executions, failures, cost, latency, and success rates. Pilot turns real-world agent activity into measurable insights and continuously improves how your agents perform.
            </p>
            <a href="#" className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group-hover:text-purple-600">
              View Integrations
              <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          </div>
          </StarBorder>
        </div>
      </section>
      </div>

      {/* Contact Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}} />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="max-w-5xl py-16 md:px-16 md:w-full max-md:text-center mx-2 md:mx-auto flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-3xl p-10 text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-shadow duration-500"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
              Ready to try-out this app?
            </h2>
            <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
              Your next favourite tool is just one click away.
            </p>
          </div>
          <Link href="/auth">
            <button className="px-12 py-4 text-slate-900 font-semibold bg-white rounded-full text-base mt-8 md:mt-0 hover:bg-slate-100 shadow-lg active:translate-y-1 active:shadow-none transition-all whitespace-nowrap cursor-pointer">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Review Form Section */}
      <section className="relative z-10 w-full overflow-hidden pb-0">
        <style dangerouslySetInnerHTML={{__html: `
          .review-star { cursor: pointer; transition: transform 0.15s ease; }
          .review-star:hover { transform: scale(1.2); }
          .review-input::placeholder { color: rgba(202,171,255,0.45); }
          .review-input:focus { border-color: rgba(189,107,251,0.6); box-shadow: 0 0 0 3px rgba(189,107,251,0.15); }
          @keyframes shimmer-sweep {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(250%) skewX(-15deg); }
          }
          .btn-shimmer::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
            animation: shimmer-sweep 2.4s ease-in-out infinite;
            border-radius: inherit;
          }
        `}} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="w-full bg-gradient-to-br from-[#3a006e] via-[#4C0083] to-[#180047] px-8 md:px-20 py-20 md:py-28"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#bd6bfb]/10 blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-24">
            
            {/* Left Column — Copy */}
            <div className="flex-1 flex flex-col gap-6 md:pt-4">
              <span className="inline-flex items-center gap-2 text-[#CAABFF] text-xs font-bold tracking-[0.2em] uppercase">
                <span className="w-6 h-px bg-[#CAABFF]" />
                Share Your Experience
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.15] bg-gradient-to-br from-white to-[#CAABFF] bg-clip-text text-transparent">
                We value<br />every word<br />you say.
              </h2>
              <p className="text-[#CAABFF]/70 text-base md:text-lg leading-relaxed max-w-sm">
                Tell us what&apos;s working, what&apos;s not, and how Pilot can become your most powerful tool yet.
              </p>
              <div className="flex flex-col gap-4 mt-4">
                {["Completely anonymous & private", "Takes less than 60 seconds", "Shapes the product roadmap"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#bd6bfb]/20 border border-[#bd6bfb]/40 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#bd6bfb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-[#CAABFF]/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="flex-1 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
                {/* Star Rating */}
                <div className="flex flex-col gap-3 mb-7">
                  <span className="text-[#CAABFF]/60 text-xs font-semibold uppercase tracking-widest">Your Rating</span>
                  <StarRating />
                </div>

                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-email" className="text-[#CAABFF]/70 text-xs font-semibold uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      id="rev-email"
                      placeholder="hello@example.com"
                      className="review-input w-full px-5 py-3.5 rounded-xl bg-white/8 border border-white/10 outline-none transition-all text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rev-review" className="text-[#CAABFF]/70 text-xs font-semibold uppercase tracking-widest">Your Review</label>
                    <textarea
                      id="rev-review"
                      placeholder="Tell us what you think about Pilot..."
                      rows={5}
                      className="review-input w-full px-5 py-3.5 rounded-xl bg-white/8 border border-white/10 outline-none transition-all text-white text-sm resize-none"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-[#CAABFF]/40 text-xs">Your data is never sold or shared.</p>
                    <button
                      type="submit"
                      className="btn-shimmer relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#3a006e] font-bold text-sm tracking-wide shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_36px_rgba(255,255,255,0.28)] hover:scale-[1.03] active:scale-100 transition-all duration-200 flex-shrink-0"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Review
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <section className="relative z-10 w-full flex flex-col items-center pt-24 pb-12 px-10 bg-gradient-to-r from-white to-[#bd6bfb]/30 border-t border-black/5 mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <span className="text-black text-xl font-bold tracking-tight">Pilot AI</span>
            </div>
            <p className="text-black/50 text-sm leading-relaxed font-medium">
              The most flying artificial intelligence platform ever created. Designed to seamlessly adapt to how you already work.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-black font-bold text-sm uppercase tracking-widest mb-2">Product</span>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">Features</a>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">Integrations</a>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-black font-bold text-sm uppercase tracking-widest mb-2">Company</span>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">About</a>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">Blog</a>
              <a href="#" className="text-black/60 hover:text-black transition-colors text-sm font-medium">Careers</a>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10">
          <span className="text-black/40 text-xs font-semibold">
            © 2026 Pilot AI Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-black/40 hover:text-black transition-colors"><FaTwitter className="w-5 h-5" /></a>
            <a href="#" className="text-black/40 hover:text-black transition-colors"><FaGithub className="w-5 h-5" /></a>
            <a href="#" className="text-black/40 hover:text-black transition-colors"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

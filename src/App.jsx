import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from './ContactForm'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'AI Strategy & Consulting',
    body: 'Roadmaps, ROI modeling, and governance frameworks that de-risk AI adoption.'
  },
  {
    title: 'Custom AI Model Development',
    body: 'Bespoke model training, evaluation, and deployment tailored to your data moat.'
  },
  {
    title: 'Chatbots & Virtual Assistants',
    body: 'Enterprise-grade agents with brand voice, compliance, and deep system integrations.'
  },
  {
    title: 'AI Automation for Businesses',
    body: 'Workflow orchestration that reduces cost, friction, and manual operations.'
  },
  {
    title: 'Data Analytics & Predictive Systems',
    body: 'Forecasting engines and real-time insights to drive smarter decisions.'
  }
]

const timeline = ['Discover', 'Design', 'Build', 'Deploy', 'Scale']

const metrics = [
  { label: 'Projects Delivered', value: 120 },
  { label: 'Model Accuracy', value: 97, suffix: '%' },
  { label: 'Automation Savings', value: 38, suffix: '%' }
]

const cases = [
  {
    industry: 'FinTech',
    problem: 'Fraud detection latency',
    solution: 'Real-time anomaly engine',
    result: '42% faster response'
  },
  {
    industry: 'Retail',
    problem: 'Forecasting volatility',
    solution: 'Demand prediction mesh',
    result: '18% inventory reduction'
  },
  {
    industry: 'Healthcare',
    problem: 'Care coordination overload',
    solution: 'Clinical AI co-pilot',
    result: '30% faster triage'
  },
  {
    industry: 'SaaS',
    problem: 'Support bottlenecks',
    solution: 'LLM-powered agents',
    result: '65% ticket deflection'
  }
]

function NeuralOrb({ mouse }) {
  const orb = useRef()
  const light = useRef()
  const rimLight = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (orb.current) {
      orb.current.rotation.y = t * 0.15
      orb.current.rotation.x = Math.sin(t * 0.25) * 0.15
      // Breathing scale animation
      orb.current.scale.x = 1 + Math.sin(t * 0.5) * 0.08
      orb.current.scale.y = 1 + Math.sin(t * 0.5 + 0.5) * 0.08
      orb.current.scale.z = 1 + Math.sin(t * 0.5 + 1) * 0.08
    }
    if (light.current) {
      light.current.position.x = mouse.current.x * 1.6
      light.current.position.y = mouse.current.y * 1.4
    }
    if (rimLight.current) {
      rimLight.current.position.x = -mouse.current.x * 0.8
      rimLight.current.position.y = -mouse.current.y * 0.8
    }
  })

  return (
    <group>
      <pointLight ref={light} intensity={32} color="#7c5cff" position={[2, 2, 4]} decay={2} />
      <pointLight ref={rimLight} intensity={20} color="#42f5e3" position={[-3, -2, 2]} decay={2} />
      <ambientLight intensity={0.5} color="#8b7fff" />
      <mesh ref={orb} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 40]} />
        <meshStandardMaterial
          color="#5b3df5"
          roughness={0.12}
          metalness={0.95}
          emissive="#4a2fbf"
          emissiveIntensity={0.8}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[10, 10, 28, 28]} />
        <meshBasicMaterial color="#1b2140" wireframe opacity={0.25} transparent />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const points = useRef()
  const particles = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12
      positions[i + 1] = (Math.random() - 0.5) * 8
      positions[i + 2] = (Math.random() - 0.5) * 6
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (!points.current) return
    points.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#42f5e3" size={0.03} sizeAttenuation opacity={0.6} transparent />
    </points>
  )
}

function HeroCanvas({ mouse }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <color attach="background" args={["#05060A"]} />
      <ParticleField />
      <NeuralOrb mouse={mouse} />
    </Canvas>
  )
}

function App() {
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')
  const [showContactForm, setShowContactForm] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const cursorRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mouse.current = { x, y }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const sections = gsap.utils.toArray('.reveal')
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%'
          }
        }
      )
    })

    gsap.utils.toArray('.metric-value').forEach((node) => {
      const target = Number(node.dataset.value)
      const suffix = node.dataset.suffix || ''
      const counter = { value: 0 }

      gsap.to(counter, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%'
        },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.value)}${suffix}`
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }, [])

  return (
    <div className="app">
      {loading && (
        <div className="loader">
          <div className="loader-ring" />
          <div className="loader-ring" />
          <div className="loader-ring" />
          <span>Synchronizing AI Grid</span>
        </div>
      )}

      <div className="cursor" ref={cursorRef} />

      <header className="hero" id="top">
        <div className="hero-left">
          <div className="hero-content">
            <div className="badge">Premium AI Consulting</div>
            <h1>
              <span className="headline-line">We Build AI</span>
              <span className="headline-line">That Works for</span>
              <span className="headline-line">Your Business</span>
            </h1>
            <p>Custom AI solutions designed to automate, optimize, and scale.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setShowContactForm(true)}>Book Free Consultation</button>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="floating-cards">
            <div className="glass-card card-1">
              <div className="card-icon">⚡</div>
              <div className="card-label">Automation</div>
            </div>
            <div className="glass-card card-2">
              <div className="card-icon">📊</div>
              <div className="card-label">Analytics</div>
            </div>
            <div className="glass-card card-3">
              <div className="card-icon">🤖</div>
              <div className="card-label">Chatbots</div>
            </div>
            <div className="glass-card card-4">
              <div className="card-icon">🧠</div>
              <div className="card-label">AI Consulting</div>
            </div>
            <div className="glass-card card-5">
              <div className="card-icon">🔮</div>
              <div className="card-label">Predictive Models</div>
            </div>
            <div className="glass-card card-6">
              <div className="card-icon">🔁</div>
              <div className="card-label">Process Optimization</div>
            </div>
          </div>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <section className="about section">
        <div className="section-grid reveal">
          <div className="about-copy">
            <h2>Who We Are</h2>
            <p>
              We partner with bold founders and enterprise leaders to transform their businesses
              through practical, production-ready AI.
            </p>
            <p>
              Our team blends product strategy, ML engineering, and human-centered design to create
              intelligent systems that ship fast and scale safely.
            </p>
          </div>
          <div className="about-icons">
            <div className="icon-card">
              <span>AI Models</span>
              <p>Custom neural architectures and LLM fine-tuning.</p>
            </div>
            <div className="icon-card">
              <span>Automation</span>
              <p>Workflow intelligence that saves time and cost.</p>
            </div>
            <div className="icon-card">
              <span>Data Intelligence</span>
              <p>Predictive systems that unlock growth signals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services section">
        <div className="section-header reveal">
          <h2>AI Services</h2>
          <p>High-impact solutions designed for scale, safety, and measurable ROI.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`service-card ${expanded === index ? 'expanded' : ''}`}
              onClick={() => setExpanded(expanded === index ? null : index)}
              whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="service-header">
                <h3>{service.title}</h3>
                <span className="service-index">0{index + 1}</span>
              </div>
              <p>{service.body}</p>
              <div className="service-more">Click to {expanded === index ? 'collapse' : 'expand'}</div>
              {expanded === index && (
                <div className="service-expanded">
                  <p>
                    We architect the full lifecycle: research, prototyping, production, and long-term
                    optimization—ensuring real business impact.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="process section">
        <div className="section-header reveal">
          <h2>How We Work</h2>
          <p>End-to-end delivery with transparency, velocity, and precision.</p>
        </div>
        <div className="timeline">
          {timeline.map((step, index) => (
            <div className="timeline-step reveal" key={step}>
              <div className="step-indicator">
                <span>{index + 1}</span>
              </div>
              <div className="step-content">
                <h3>{step}</h3>
                <p>
                  {step === 'Discover'
                    ? 'Align on outcomes, data readiness, and business priorities.'
                    : step === 'Design'
                    ? 'Blueprint the AI system, UX, and success metrics.'
                    : step === 'Build'
                    ? 'Engineer and validate models with rapid iteration.'
                    : step === 'Deploy'
                    ? 'Ship secure, monitored AI into production.'
                    : 'Scale responsibly with governance and continuous learning.'}
                </p>
              </div>
              <div className="step-orb" />
            </div>
          ))}
        </div>
      </section>

      <section className="metrics section">
        <div className="section-header reveal">
          <h2>Why Choose Us</h2>
          <p>Measured impact, engineered trust, and outcomes that compound.</p>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div className="metric-card reveal" key={metric.label}>
              <div
                className="metric-value"
                data-value={metric.value}
                data-suffix={metric.suffix || ''}
              >
                0
              </div>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="metrics-glow" />
      </section>

      <section className="cases section">
        <div className="section-header reveal">
          <h2>Case Studies</h2>
          <p>AI systems engineered for real-world, measurable wins.</p>
        </div>
        <div className="case-track">
          {cases.map((item) => (
            <div className="case-card reveal" key={item.industry}>
              <span className="case-industry">{item.industry}</span>
              <h3>{item.problem}</h3>
              <p>{item.solution}</p>
              <div className="case-result">{item.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta section">
        <div className="cta-inner reveal">
          <h2>Ready to Transform Your Business with AI?</h2>
          <p>Let’s build an intelligent system that drives real growth.</p>
          <button className="btn primary large" onClick={() => setShowContactForm(true)}>Let's Build Your AI Solution</button>
        </div>
        <div className="cta-wave" />
      </section>

      {showContactForm && (
        <div onClick={() => setShowContactForm(false)}>
          <ContactForm onClose={() => setShowContactForm(false)} />
        </div>
      )}
    </div>
  )
}

export default App

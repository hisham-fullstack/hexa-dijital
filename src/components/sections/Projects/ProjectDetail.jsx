"use client";

import React, { useEffect } from "react";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Cpu, Check } from "lucide-react";
import LightRays from "@/components/ui/LightRays";
import ProjectLogo3D from "./ProjectLogo3D";
import "./ProjectDetail.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const ProjectDetail = ({ project, nextProject }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.slug]);

  if (!project) {
    return <div className="hx-pd-error">Proje bulunamadı.</div>;
  }

  return (
    <div className="hx-project-detail-page">
      <div className="hx-pd-webgl-hero">
        <div className="hx-pd-rays-bg">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffd1"
            raysSpeed={0.5}
          />
        </div>

        <div className="hx-pd-3d-center">
          <div className="hx-pd-logo-wrapper">
            <ProjectLogo3D
              logoUrl={project.clientLogoSvg || "/assets/logos/hexa_logo.svg"}
            />
          </div>
        </div>

        <div className="container hx-pd-hero-content">
          <div className="hx-pd-top-nav">
            <Link href="/projeler" className="hx-pd-back-link">
              <ChevronLeft size={16} strokeWidth={1.5} /> Projeler
            </Link>

            {project.isHexaProduct && (
              <span className="hx-pd-hexa-tag">
                <Cpu size={14} strokeWidth={1.5} /> Hexa Original
              </span>
            )}
          </div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="hx-pd-massive-title">{project.title}</h1>
          </motion.div>
        </div>
      </div>

      <section className="hx-pd-intro-flex container">
        <div className="hx-pd-intro-left">
          <motion.div
            className="hx-pd-sidebar-box"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2>
              {project.title} <br />
              <span className="global-text-dimmed">Vaka Analizi</span>
            </h2>
            <p className="hx-pd-intro-text">{project.description}</p>
            <div className="hx-pd-meta-tags">
              <span className="hx-pd-tag">Premium Kalite</span>
              <span className="hx-pd-tag">Özel Altyapı Mimari</span>
              <span className="hx-pd-tag">Maksimum Performans</span>
            </div>
          </motion.div>
        </div>

        <div className="hx-pd-intro-right">
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              className="hx-pd-metrics-horizontal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {project.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="hx-pd-metric-box"
                  variants={fadeUp}
                >
                  <span className="hx-pd-metric-value">{metric.value}</span>
                  <span className="hx-pd-metric-label">{metric.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="hx-pd-approach-section container">
        <div className="hx-pd-approach-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="hx-pd-approach-label">Meydan Okuma</div>
            <h2 className="hx-pd-approach-title">
              Problemin temelinde <br /> ne yatıyordu?
            </h2>
            <p className="hx-pd-approach-p">{project.challenge}</p>
          </motion.div>
        </div>

        <div className="hx-pd-approach-right">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div
              className="hx-pd-approach-label"
              style={{ color: "var(--hexa-accent)" }}
            >
              Hexa Yaklaşımı
            </div>
            <p
              className="hx-pd-approach-p"
              style={{ color: "var(--hexa-font-main)" }}
            >
              {project.solution}
            </p>
          </motion.div>

          {project.highlights && (
            <motion.div
              className="hx-pd-features-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {project.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="hx-pd-feature-item"
                  variants={fadeUp}
                >
                  <Check
                    color="var(--hexa-accent)"
                    size={20}
                    strokeWidth={1.5}
                    style={{ flexShrink: 0 }}
                  />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="hx-pd-gallery-section container">
          <motion.div
            className="hx-pd-bento-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="hx-pd-bento-item hx-pd-bento-1"
              variants={fadeUp}
            >
              <img
                src={project.gallery[0] || project.image}
                alt={`${project.title} Görseli`}
              />
            </motion.div>

            {project.gallery[1] && (
              <motion.div
                className="hx-pd-bento-item hx-pd-bento-2"
                variants={fadeUp}
              >
                <img src={project.gallery[1]} alt={`${project.title} Detay`} />
              </motion.div>
            )}

            {project.gallery[2] && (
              <motion.div
                className="hx-pd-bento-item hx-pd-bento-3"
                variants={fadeUp}
              >
                <img src={project.gallery[2]} alt={`${project.title} Detay`} />
              </motion.div>
            )}
          </motion.div>
        </section>
      )}

      {nextProject && (
        <Link
          href={`/projeler/${nextProject.slug}`}
          className="hx-pd-next-project"
        >
          <div className="hx-pd-next-bg">
            <img src={nextProject.image} alt={nextProject.title} />
            <div className="hx-pd-next-overlay" />
          </div>
          <div className="hx-pd-next-content container">
            <span className="next-kicker">Sıradaki Keşif</span>
            <h2 className="next-title">{nextProject.title}</h2>
            <div className="next-action">
              Projeyi İncele <ArrowRight size={20} strokeWidth={1.5} />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProjectDetail;

"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ["Tümü", "Hexa Ürünleri", "Müşteri Projeleri"];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "Tümü") return true;
    if (activeFilter === "Hexa Ürünleri") return project.isHexaProduct;
    if (activeFilter === "Müşteri Projeleri") return !project.isHexaProduct;
    return true;
  });

  useEffect(() => {
    if (filteredProjects.length > 0) {
      setHoveredProject(filteredProjects[0]);
    } else {
      setHoveredProject(null);
    }
  }, [activeFilter]);

  return (
    <div className="global-section projects-page">
      <div className="container">
        <div className="approach-content projects-hero-margin">
          <div className="approach-label">
            <p>PORTFOLYO & ÜRÜNLER</p>
          </div>
          <div className="approach-text">
            <h2>
              <span className="text-dark">Sınırları zorlayan işler. </span>
              <span className="text-light">
                Müşterilerimiz için tasarladığımız premium projelerden, kendi
                içimizde kurguladığımız otonom SaaS ürünlerine kadar Hexa
                vizyonu.
              </span>
            </h2>
          </div>
        </div>

        <div className="projects-filter-wrapper">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-interactive-layout">
          <div className="projects-list-column">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={project.id}
                >
                  <Link
                    href={`/projeler/${project.slug}`}
                    className="project-row-item"
                    onMouseEnter={() => setHoveredProject(project)}
                  >
                    <div className="row-item-left">
                      <div className="row-meta">
                        <span className="row-year">{project.year}</span>
                        {project.isHexaProduct && (
                          <span className="hexa-original-tag">
                            <Cpu size={12} /> HEXA
                          </span>
                        )}
                      </div>
                      <h3 className="row-title">{project.title}</h3>
                      <p className="row-category">{project.category}</p>
                    </div>

                    <div className="row-item-right">
                      <div className="row-arrow-circle">
                        <ArrowRight size={24} />
                      </div>
                    </div>

                    <div className="mobile-project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="projects-image-column">
            <div className="sticky-image-container global-glass-card">
              <AnimatePresence mode="wait">
                {hoveredProject && (
                  <motion.div
                    key={hoveredProject.id}
                    className="sticky-image-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={hoveredProject.image}
                      alt={hoveredProject.title}
                    />

                    <div className="sticky-overlay-info">
                      <span className="client-text">
                        Müşteri: {hoveredProject.client}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

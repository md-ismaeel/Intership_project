import React from "react";
import { motion } from "motion/react"
import ExtraSpace from "../../Components/ExtraSpace";

export default function About() {
  const about_data = {
    about: {
      title: `About us`,
      des1: `At N4N, we’re all about real ingredients and real results.`,
      des2: `As India’s leading natural skincare, haircare, and body care brand, our mission is to help you glow with 100% natural, toxin-free formulas.`,
      des3: `Expert-approved and crafted with care, our products are free from parabens and harmful chemicals, providing clean, effective care for your face, hair, and body.`,
      des4: `With ranges tailored for both men and women, we’ve got all your needs covered.`,
      des5: `Ready to elevate your routine? Explore and shop with us now for your beauty regime.`,
    },
    backed: {
      title: `Backed by EcoScience`,
      des1: `At N4N, we’ve perfected the art of blending nature and science.`,
      des2: `EcoScience stands at the crossroads of tradition and innovation, where the ancient knowledge of natural ingredients meets modern skincare and haircare technology.`,
      des3: `We extract pure, raw elements from nature to create formulas that nurture and rejuvenate your hair and skin, delivering the best of both worlds.`,
      des4: `Explore N4N and experience the transformative power of EcoScience.`,
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <ExtraSpace />
      <motion.section
        className="w-full min-h-screen flex flex-col justify-center gap-10 items-center font-avenir mb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* About Section */}
        <motion.div
          className="w-full flex flex-col gap-2 text-lg justify-center items-start px-10"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl capitalize font-semibold tracking-wider mb-3"
            variants={itemVariants}
          >
            {about_data.about.title}
          </motion.h1>
          {[about_data.about.des1, about_data.about.des2, about_data.about.des3, about_data.about.des4, about_data.about.des5].map(
            (desc, index) => (
              <motion.p key={index} variants={itemVariants}>
                {desc}
              </motion.p>
            )
          )}
        </motion.div>

        {/* Backed Section */}
        <motion.div
          className="w-full flex flex-col text-lg gap-2 justify-center items-start px-10"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl capitalize font-semibold tracking-wider mb-3"
            variants={itemVariants}
          >
            {about_data.backed.title}
          </motion.h1>
          {[about_data.backed.des1, about_data.backed.des2, about_data.backed.des3, about_data.backed.des4].map(
            (desc, index) => (
              <motion.p key={index} variants={itemVariants}>
                {desc}
              </motion.p>
            )
          )}
        </motion.div>
      </motion.section>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip'
import { motion } from 'framer-motion';
import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';

import './Skills.scss';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "skills"]')
      .then(res => setSkills(res))
      .catch(err => console.log(err));
    client.fetch('*[_type == "experiences"]')
      .then(res => setExperiences(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className='app__skills-list'>
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-id={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </Tooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg');

import React from 'react';
import { Card } from 'flowbite-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function About() {
  return (
    <div className='min-h-screen py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Profile Section */}
        <div className='text-center mb-16'>
          <img
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
            alt='profile'
            className='w-32 h-32 rounded-full mx-auto mb-4 object-cover'
          />
          <h1 className='text-4xl font-bold mb-4 dark:text-white'>Nikhil</h1>
          <p className='text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
            A passionate full-stack developer with a keen interest in creating
            beautiful and functional web applications. I love to learn and share
            knowledge with the community.
          </p>
          <div className='flex justify-center gap-4 mt-6'>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>
              <FaGithub className='w-6 h-6' />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>
              <FaLinkedin className='w-6 h-6' />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>
              <FaTwitter className='w-6 h-6' />
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-8 dark:text-white'>Skills</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              { title: 'Frontend Development', skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'] },
              { title: 'Backend Development', skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
              { title: 'Tools & Technologies', skills: ['Git', 'VS Code', 'Postman', 'Firebase'] },
            ].map((category, index) => (
              <Card key={index} className='max-w-sm'>
                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4'>
                  {category.title}
                </h5>
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-sm'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className='text-3xl font-bold text-center mb-8 dark:text-white'>Experience</h2>
          <div className='space-y-8'>
            {[
              {
                title: 'Full Stack Developer',
                company: 'Tech Company',
                period: '2022 - Present',
                description: 'Led the development of multiple web applications using React and Node.js.',
              },
              {
                title: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2021 - 2022',
                description: 'Developed responsive and interactive user interfaces for various clients.',
              },
            ].map((exp, index) => (
              <Card key={index} className='max-w-3xl mx-auto'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {exp.title}
                    </h5>
                    <p className='text-gray-500 dark:text-gray-400'>{exp.company}</p>
                  </div>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{exp.period}</span>
                </div>
                <p className='text-gray-700 dark:text-gray-400 mt-4'>{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
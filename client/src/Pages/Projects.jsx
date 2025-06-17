import React from 'react';
import { Card, Button } from 'flowbite-react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: 'Blog Platform',
      description: 'A full-stack blog platform built with React, Node.js, and MongoDB. Features include user authentication, CRUD operations, and responsive design.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: '#',
      live: '#',
    },
    {
      title: 'E-commerce Website',
      description: 'An e-commerce platform with features like product catalog, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      technologies: ['React', 'Redux', 'Node.js', 'Stripe'],
      github: '#',
      live: '#',
    },
    {
      title: 'Task Management App',
      description: 'A task management application with real-time updates, task categorization, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      github: '#',
      live: '#',
    },
  ];

  return (
    <div className='min-h-screen py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>My Projects</h1>
        <p className='text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto'>
          Here are some of the projects I've worked on. Each project is a unique
          challenge that helped me grow as a developer.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <Card key={index} className='max-w-sm'>
              <img
                src={project.image}
                alt={project.title}
                className='h-48 w-full object-cover rounded-t-lg'
              />
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {project.title}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                {project.description}
              </p>
              <div className='flex flex-wrap gap-2 mt-4'>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className='px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-sm'
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className='flex gap-4 mt-6'>
                <Button gradientDuoTone='purpleToBlue' size='sm'>
                  <FaGithub className='mr-2 h-4 w-4' />
                  Code
                </Button>
                <Button gradientDuoTone='purpleToBlue' size='sm' outline>
                  <FaExternalLinkAlt className='mr-2 h-4 w-4' />
                  Live Demo
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <h2 className='text-2xl font-bold mb-4 dark:text-white'>
            Want to work together?
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mb-6'>
            I'm always open to discussing new projects and opportunities.
          </p>
          <Button gradientDuoTone='purpleToBlue' size='lg'>
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
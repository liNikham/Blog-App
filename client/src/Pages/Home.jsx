import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { HiArrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto px-4 py-16'>
        <div className='flex-1 space-y-6'>
          <h1 className='text-4xl lg:text-6xl font-bold dark:text-white'>
            Welcome to My
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ml-2'>
              Blog
            </span>
          </h1>
          <p className='text-gray-500 dark:text-gray-400 text-lg'>
            Explore my thoughts, projects, and experiences in technology and development.
            Join me on this journey of learning and sharing knowledge.
          </p>
          <div className='flex gap-4'>
            <Link to='/projects'>
              <Button gradientDuoTone='purpleToBlue'>
                View Projects
                <HiArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
            <Link to='/about'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex-1'>
          <img
            src='https://images.unsplash.com/photo-1499750310107-5fef28a66643'
            alt='hero'
            className='rounded-lg shadow-lg'
          />
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold text-center mb-8 dark:text-white'>
          Featured Posts
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3].map((post) => (
            <Card key={post} className='max-w-sm'>
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + post}`}
                alt='post'
                className='h-48 w-full object-cover rounded-t-lg'
              />
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Featured Post {post}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                Here are the biggest enterprise technology acquisitions of 2021 so far.
              </p>
              <Link to={`/post/post-${post}`}>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Read more
                  <HiArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-white/80 mb-8 max-w-2xl mx-auto'>
            Join our community of developers and tech enthusiasts. Share your knowledge
            and learn from others.
          </p>
          <Link to='/sign-up'>
            <Button size='lg' gradientDuoTone='purpleToBlue'>
              Get Started
              <HiArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
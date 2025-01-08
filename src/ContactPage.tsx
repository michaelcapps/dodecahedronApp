import React from 'react';
import { Github, Mail, User } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center bg-gray-500 py-12 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Contact Me
        </h1>
        
        <div className="space-y-6">
          {/* Name Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Name</h2>
              <p className="text-lg text-gray-900">Michael Capps</p>
            </div>
          </div>

          {/* Email Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Email</h2>
              <a 
                href="mailto:your.email@example.com"
                className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
              >
                michaelcapps105@gmail.com
              </a>
            </div>
          </div>

          {/* GitHub Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Github className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">GitHub</h2>
              <a 
                href="https://github.com/michaelcapps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
              >
                github.com/michaelcapps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
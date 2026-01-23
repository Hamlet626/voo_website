'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Header from './header';

interface LegalPageViewerProps {
  title: string;
  lastUpdate?: string;
  content: string;
}

export default function LegalPageViewer({ title, lastUpdate, content }: LegalPageViewerProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Header />
      
      <div className="w-full h-20 bg-gray-900 shadow-md flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-12 overflow-hidden">
          
          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">
            {title}
          </h1>

          {/* Last Update Info */}
          {lastUpdate && (
            <p className="text-sm text-gray-500 italic mb-6">
              {lastUpdate}
            </p>
          )}

          {/* Markdown Content Renderer */}
          <article className="prose prose-green prose-lg max-w-none text-gray-600">
            <ReactMarkdown
              components={{
                // 自定义 Markdown 元素的样式以匹配 Voo 的风格
                h1: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h4 className="text-lg font-medium text-gray-800 mt-4 mb-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 space-y-1 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 space-y-1 mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="text-gray-600" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                a: ({ node, ...props }) => <a className="text-green-600 hover:text-green-700 underline transition-colors" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
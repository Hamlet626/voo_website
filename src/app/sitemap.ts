// src/app/sitemap.ts

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.voo.it.com'; // Replace with your domain

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/v`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/c`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
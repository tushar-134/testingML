'use client';

import { useState, useEffect } from 'react';
import InternshipCard from './internship-card';
import { Loader2 } from 'lucide-react';

export default function InternshipGrid({ sector, state }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInternships() {
      try {
        let url = '/api/internships';
        const params = new URLSearchParams();
        if (sector) params.append('sector', sector);
        if (state) params.append('state', state);
        if (params.toString()) url += '?' + params.toString();

        const response = await fetch(url);
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error('Failed to fetch internships:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInternships();
  }, [sector, state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {internships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
}

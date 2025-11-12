import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline" 
      onClick={() => navigate(-1)} 
      className="mb-6 gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
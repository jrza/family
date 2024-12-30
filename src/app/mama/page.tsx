"use client";

interface PageProps {
  params: {
    name: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1>Hello {params.name}</h1>
    </div>
  );
} 
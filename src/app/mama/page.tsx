"use client";

import { NextPage } from 'next';

interface PageParams {
  name: string;
}

const Page: NextPage<{ params: PageParams }> = ({ params }) => {
  return (
    <div>
      <h1>Hello {params.name}</h1>
    </div>
  );
};

export default Page; 
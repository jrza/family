import { useEffect, useState } from 'react';

interface AnimatedStatProps {
  endValue: number;
  label: string;
}

const AnimatedStat = ({ endValue, label }: AnimatedStatProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const increment = Math.ceil(endValue / 100);
    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev + increment >= endValue) {
          clearInterval(timer);
          return endValue;
        }
        return prev + increment;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <div>
      <h1>{value}</h1>
      <p>{label}</p>
    </div>
  );
};

export default AnimatedStat;

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Countdown = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return <CountdownText>{count > 0 ? count : 'Go!'}</CountdownText>;
};

const CountdownText = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #ff0080;
`;

export default Countdown;

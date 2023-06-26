import { useEffect, useRef } from 'react';

const Cryptocurrencies = () => {
  const trackOneRef = useRef(null);

  useEffect(() => {
    const getChildrenSumWidth = ({ element }) => {
      let i = 0;
      for (const child of element.children) {
        i += child.scrollWidth;
      }
      startAnimation(element, i / 2);
    };

    const startAnimation = (element, value) => {
      element.style.setProperty('--x', `-${value}px`);
    };

    const timeoutId = setTimeout(getChildrenSumWidth, 100, { element: trackOneRef.current });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <section className="cryptocurrencies">
      <div className="cryptocurrencies__container">
        <div className="cryptocurrencies__title">
          Select From{' '}
          <div>
            Over <span>150</span>
          </div>{' '}
          Cryptocurrencies
        </div>
        <div className="cryptocurrencies__description">
          Trade BTC, ETH and other cryptocurrencies in minutes.
        </div>

        <div className="cryptocurrencies__coins">
          <div className="cryptocurrencies__coins-track" id="track-one" ref={trackOneRef}>
            <img src="/main/images/cryptocurrencies/coins.webp" style={{width: '2876px'}} alt="" />

            <img src="/main/images/cryptocurrencies/coins.webp" style={{width: '2876px'}} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cryptocurrencies;

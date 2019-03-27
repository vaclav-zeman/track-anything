import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';

export default function useLottie(options) {
  let container = useRef(null);
  let [instance, setInstance] = useState(null);

  useEffect(() => {
    if (!container) {
      return null;
    }

    try {
      setInstance(
        lottie.loadAnimation({
          container: container.current,
          autoplay: false,
          renderer: 'svg',
          ...options,
        })
      );
    } catch (err) {}
  }, [container]);

  return [instance, container];
}

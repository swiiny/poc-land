import { useEffect, useState } from 'react';

const getResponsive = () => {
  const { innerWidth: width } = window;

  return width;
};

const useResponsive = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const mqSm = 660;
  const mqMd = 900;
  const mqLg = 1200;
  const mqXl = 1600;

  const [screenWidth, setScreenWidth] = useState(getResponsive());
  const [isSmallerThanSm, setIsSmallerThanSm] = useState(false);
  const [isSmallerThanMd, setIsSmallerThanMd] = useState(false);
  const [isSmallerThanLg, setIsSmallerThanLg] = useState(false);
  const [isSmallerThanXl, setIsSmallerThanXl] = useState(false);

  useEffect(() => {
    setIsSmallerThanSm(screenWidth < mqSm);
    setIsSmallerThanMd(screenWidth < mqMd);
    setIsSmallerThanLg(screenWidth < mqLg);
    setIsSmallerThanXl(screenWidth < mqXl);
  }, [screenWidth]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(getResponsive());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenWidth, mqSm, mqMd, mqLg, mqXl, isSmallerThanSm, isSmallerThanMd, isSmallerThanLg, isSmallerThanXl,
  };
};

export default useResponsive;

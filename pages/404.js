import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 100);
  }, [router]);
};
export default Error;

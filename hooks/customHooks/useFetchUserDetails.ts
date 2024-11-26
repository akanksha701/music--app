import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useFetchUserDetails = (setUser: Function) => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/Signin');
            return;
          }
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser, router]);
};

export default useFetchUserDetails;

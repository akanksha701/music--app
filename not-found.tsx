import Link from 'next/link';
import {Suspense} from 'react';
 
export default function NotFound() {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </Suspense>
    
    </div>
  );
}
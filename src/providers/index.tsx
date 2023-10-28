'use client';

import { Toaster } from 'react-hot-toast';
import MantineProvider from './MantineProvider';
import QueryProvider from './QueryClient';

type Props = {
   children: React.ReactNode
}


export default function Providers({ children }: Props) {
   return (
      <MantineProvider>
         <QueryProvider>
            {children}
         </QueryProvider>
         <Toaster />
      </MantineProvider>
   )
}
'use client';

import { Toaster } from 'react-hot-toast';
import MantineProvider from './MantineProvider';
import VerifyToken from './VerifyToken';

type Props = {
   children: React.ReactNode
}


export default function Providers({ children }: Props) {

   return (
      <VerifyToken>
         <MantineProvider>
            {children}
            <Toaster />
         </MantineProvider>
      </VerifyToken>
   )
}
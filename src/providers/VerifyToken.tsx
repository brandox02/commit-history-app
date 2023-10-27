'use client';

import { ReactNode, useEffect } from "react";
import Cookie from 'js-cookie';
import { usePathname, useRouter } from "next/navigation";

export default function VerifyToken({ children }: { children: ReactNode }) {
   const router = useRouter();

   const pathname = usePathname();

   useEffect(() => {
      const init = async () => {
         const isBackoffice = pathname.includes('/backoffice');
         if (isBackoffice) {
            const authRaw: string | undefined = Cookie.get('auth');
            if (!authRaw) {
               router.replace('/login');
               throw new Error('Ocurrió un error a la hora de leer el token de acceso');
            }
            // const auth: LocalStorageAuthData = JSON.parse(authRaw);

         }
      }

      init();
      // eslint-disable-next-line
   }, []);

   return <>{children}</>;
}

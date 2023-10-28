'use client';

import { Button } from '@mantine/core';
import TextInput from "@/components/TextInput";
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios, { TOKEN_KEY } from '@/config/axios'
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const {
      mutateAsync: loginMutation,
      isPending: isLoadingLoginMutation,
      // isError: isErrorLoadingMutation
   } = useMutation({
      // mutationFn: async (f: any) => {
      //    return 2;
      // },
      mutationFn: async (payload: {
         email: string,
         password: string
      }) => {
         console.log({ payload })
         return axios.post('/auth/login', payload)
      },
      mutationKey: ['/auth/login']
   });

   const router = useRouter();

   const onLogin = async () => {
      try {
         if (!password.trim() || !email.trim()) {
            toast.error('You need to complete both the password and email fields');
            return;
         }
         const response = await loginMutation({
            password, email
         })


         if (response.data) {
            router.replace('/commit-history');
            Cookies.set(TOKEN_KEY, JSON.stringify(response.data))
         }

      } catch (error: any) {
         console.log({ error })
         if (error?.response?.data?.message === 'user or password wrong') {
            toast.error('User or password are wrong');
         }
      }

   }

   return (
      <div className="bg-[#F1F6FF] w-screen h-screen">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                     Iniciar Sesión
                  </h1>
                  <div className="flex flex-col gap-2">
                     <TextInput
                        label="Email"
                        className=""
                        style={2}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                     />
                     <TextInput
                        type='password'
                        label="Contraseña"
                        className=""
                        style={2}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                     />
                     <Button
                        onClick={onLogin}
                        variant={'filled'}
                        loading={isLoadingLoginMutation}
                     >Ingresar</Button>
                  </div>
               </div>
            </div>
         </div>

      </div >
   )
}
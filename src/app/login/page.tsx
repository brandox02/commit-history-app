'use client';

import { Anchor, Button, Text } from '@mantine/core';
import TextInput from "@/components/TextInput";
import toast from 'react-hot-toast';
import axios, { TOKEN_KEY } from '@/config/axios'
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues = {
   email: '',
   password: ''
}

const validationSchema = z.object(
   Object.keys(defaultValues)
      .reduce((acc, key) => ({
         ...acc,
         [key]: z.string().min(1, { message: 'This field is required' }),
         email: z.string().min(1, { message: 'This field is required' }).email(),
      }), {})
)

export default function Login() {
   const methods = useForm({
      defaultValues: {
         email: '',
         password: ''
      },
      resolver: zodResolver(validationSchema)
   });

   const {
      mutateAsync: loginMutation,
      isPending: isLoadingLoginMutation,
   } = useMutation({
      mutationFn: async (payload: {
         email: string,
         password: string
      }) => axios.post('/auth/login', payload),
      mutationKey: ['/auth/login']
   });

   const router = useRouter();
   const email = methods.watch('email');
   const password = methods.watch('password');

   const onLogin = async () => {
      try {
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
      <div>
         <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onLogin)}>
               <div className="bg-[#F1F6FF] w-screen h-screen">
                  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                     <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              Iniciar Sesión
                           </h1>
                           <div className="flex flex-col gap-2">
                              <TextInput
                                 name='email'
                                 label="Email"
                                 className=""
                              />
                              <TextInput
                                 name='password'
                                 type='password'
                                 label="Password"
                                 className=""

                              />
                              <Button
                                 type='submit'
                                 variant={'filled'}
                                 loading={isLoadingLoginMutation}
                              >Login</Button>
                              <div className='flex flex-col items-center mt-2'>
                                 <Text>{'Don\'t have and account?'}</Text>
                                 <Anchor href='/signup'>
                                    Sign Up
                                 </Anchor>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div >
            </form>
         </FormProvider>
      </div>
   )
}
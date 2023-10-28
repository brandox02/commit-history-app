'use client';

import { Button, Text } from '@mantine/core';
import TextInput from "@/components/TextInput";
import axios, { TOKEN_KEY } from '@/config/axios'
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const defaultValues = {
   code: ''
}

const validationSchema = z.object(
   Object.keys(defaultValues)
      .reduce((acc, key) => ({
         ...acc,
         [key]: z.string().min(1, { message: 'This field is required' }),
      }), {})
)

export default function Login() {

   const methods = useForm({
      defaultValues,
      resolver: zodResolver(validationSchema)
   });

   const {
      mutateAsync: validateMutation,
      isPending: isLoadingValidateMutation,
   } = useMutation({
      mutationFn: async (payload: { code: string, email: string }) => axios.get('/auth/validate-user', { params: payload }),
      mutationKey: ['/auth/validate-user'],
      onError: (error) => {
         const message = error.message === 'Request failed with status code 403' ?
            'This is not the correct code, please try again with the correct one' :
            error.message;
         toast.error(message);
      }
   });

   const router = useRouter();
   const email = Cookies.get('email-to-verify');

   const onSubmit = async () => {

      if (email === undefined) {
         router.push('/signup');
         return;
      }
      try {
         const response = await validateMutation({ code: methods.watch('code'), email });
         if (response.data?.status === 'success') {
            Cookies.set(TOKEN_KEY, JSON.stringify(response.data))
            toast.success('You have validated your account successfully, now you can login', { duration: 10000 });
            Cookies.remove('email-to-verify');
            router.replace('/login');
            return;
         }

         toast.error('This is not the correct code, please try again with the correct one');
      } catch (error: any) {
         console.log({ error })
         if (error?.response?.data?.message === 'user or password wrong') {
            toast.error('User or password are wrong');
         }
      }

   }

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-[#F1F6FF] w-screen h-screen">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                           Sign Up Confirmation Code
                        </h1>
                        <Text>{`We have sent you a verification code to your email ${email}. Please verify and copy and paste that code in the input below`}</Text>
                        <TextInput
                           name='code'
                           label=""
                           className=""
                        />
                        <Button
                           type='submit'
                           fullWidth
                           loading={isLoadingValidateMutation}
                        >Verify</Button>
                     </div>
                  </div>
               </div>

            </div >
         </form>
      </FormProvider>
   )
}
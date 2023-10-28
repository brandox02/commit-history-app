import { useFormContext } from 'react-hook-form';

export interface TextInputProp {
   placeholder?: string;
   label?: string;
   disabled?: boolean;
   removeDoublePoints?: boolean
   className?: string;
   type?: string;
   name: string,
}


export default function TextInput({
   placeholder = '',
   label = '',
   disabled,
   removeDoublePoints = false,
   className = '',
   type = 'text',
   name,
}: TextInputProp) {

   const methods = useFormContext();
   console.log()

   const error = methods.formState?.errors[name];

   return (
      <div className='my-2'>
         <label className={`relative flex gap-2 items-center  text-blue-950 ${className}`}>
            {label && <span className="font-semibold">{`${label}${removeDoublePoints ? '' : ':'} `}</span>}
            <input
               disabled={!!disabled}
               className="disabled:bg-sky-100 disabled:text-blue-900 placeholder:italic font-semibold placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs"
               placeholder={placeholder}
               type={type}
               {...methods.register(name)}
            />
         </label>
         {error ? <span className='text-red-600 font-medium'>{error.type === 'invalid_type' ? 'This field is required' : error.message?.toString()}</span> : ''}
      </div>
   )
}
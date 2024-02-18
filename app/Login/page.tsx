"use client";
import React,{useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter  } from 'next/navigation';

interface FormValues {
    email: string;
    password: string;
}

const Page: React.FC = () => {
    const router = useRouter();
    const [disabled, setDisabled] = useState<boolean>(false);

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async(data:FormValues) => {

        const response = await signIn("credentials", {
            ...data,
            redirect: false,
            callbackUrl: '/',
        });

        if( response && response?.status == 401) { return toast.error("Invalid email or password") ;}
        if( response && response?.status == 500 ) {return toast.info("Internal Server Error"); }
        if( response && response?.status == 200) {router.push('/');}
    
        console.log("response is ",response);
    }


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Log In </h2>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full border rounded px-3 py-2" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        {!errors.email && <span className="text-white text-sm">a</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full border rounded px-3 py-2" {...register("password", { required: true, minLength: 4 })} />
                        {errors.password && <span className="text-red-500 text-sm">Password is required (min length 4)</span>}
                        {!errors.password && <span className="text-white text-sm">a</span>}
                    </div>


                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Log In</button>
                    <h1 className='m-2 text-blue-500'>New? Click <Link href="/Signup">here</Link> to sign up</h1>
                </form>
            </div>
        </div>
    );
}

export default Page;
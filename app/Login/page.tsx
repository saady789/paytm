"use client";
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';


interface FormValues {
    email: string;
    password: string;
}

const page: React.FC = () => {

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();




    const onSubmit: SubmitHandler<FormValues> = (data) => {

        console.log(data)
    }


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Sign Up</h2>
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
                </form>
            </div>
        </div>
    );
}

export default page;
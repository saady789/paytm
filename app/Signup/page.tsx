"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const page: React.FC = () => {

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const password = React.useRef({});
    password.current = watch("password");


    const onSubmit: SubmitHandler<FormValues> = (data) => {

        console.log(data)
    }


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input type="text"  id="name" className="w-full border rounded px-3 py-2" {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                        {!errors.name && <span className="text-white text-sm">a</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full border rounded px-3 py-2" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        {!errors.email && <span className="text-white text-sm">a</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full border rounded px-3 py-2" {...register("password", { required: true, minLength:4 })} />
                        {errors.password && <span className="text-red-500 text-sm">Password is required (min length 4)</span>}
                        {!errors.password && <span className="text-white text-sm">a</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="w-full border rounded px-3 py-2" {...register("confirmPassword", { validate: value => value === password.current || "The passwords do not match" })} />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">Password do not match</span>}
                        {!errors.confirmPassword && <span className="text-white text-sm">a</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default page;

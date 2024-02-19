import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { current } from '@reduxjs/toolkit';
import { trpc } from "@/app/_trpc/Client";
import {updateUserBalance} from '@/app/redux/userSlice';


const HomePage = () => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.currentUser);
    const [selectedUser, setSelectedUser] = useState(null);
    const [amount, setAmount] = useState(1);
    const send = trpc.transaction.sendMoney.useMutation();
    const balance = trpc.user.getUserBalance.useMutation();

    // Dummy users for demonstration purposes
    const users = useAppSelector((state) => state?.user?.allUsers);

    const handleSendMoney = async () => {
        if (amount <= 0 || !user?.balance || user.balance < amount) {
            return toast.error('Invalid amount or insufficient balance');
        }
        if (selectedUser == null) {
            return toast.error('Please select a user');
        }

        if (user?.id && selectedUser.value && amount) {
            const response = await send.mutateAsync({
                senderId: user.id,
                receiverId: selectedUser.value,
                amount: amount,
            });
            
            if(response.status=='failure') toast.error(response.message);
            else toast.success('Money sent successfully');
            let userBalance = await balance.mutateAsync(user?.id);
            if(userBalance.payload==0 ||userBalance.payload) dispatch(updateUserBalance(userBalance?.payload))

        }
    };

    return (
        <div className="bg-gray-100 flex flex-col justify-start items-center">
            {session && (
                <div className="max-w-3xl w-full px-4">
                    <header className="py-8">
                        <h1 className="text-3xl font-bold text-blue-500">Paytm - Welcome {user?.name}</h1>
                    </header>
                    <main className="bg-white p-8 rounded shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Your Balance:</h2>
                            <span className="text-xl font-semibold text-blue-500">${user?.balance}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Select
                                options={users?.map((user) => ({ value: user.id, label: user.email }))}
                                onChange={(selectedOption) => setSelectedUser(selectedOption)}
                                placeholder="Select user"
                            />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                placeholder="Enter amount"
                                className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleSendMoney}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
                            >
                                Send Money
                            </button>
                        </div>
                    </main>
                </div>
            )}
            {!session && <div className="max-w-3xl w-full px-4">Access Forbidden</div>}
        </div>
    );
};

export default HomePage;

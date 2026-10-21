"use client";
import { findByEmailLookupAction } from "@/server/actions/user.action";
import Image from "next/image";
import { useActionState, startTransition, useEffect, useState, useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from "@/components/admin/modal";
import { Check } from "lucide-react";
import Turnstile from "@/components/Turnstile";

const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long!')
        .max(50, 'Password must be at most 50 characters long!')
        .required('Required'),
});

export default function Auth() {
    const [state, formAction, isPending] = useActionState(findByEmailLookupAction, null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);


    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value == 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6 || value == 7 || value == 8 || value == 9 || value == 0) {
            setCode(prev => {
                const newCode = [...prev];
                newCode[index] = value;
                return newCode;
            });
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !code[index]) {
            setCode(prev => {
                const newCode = [...prev];
                newCode[index] = '';
                return newCode;
            });
            inputRefs.current[index - 1]?.focus();
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            code: '',
            turnstileToken: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: (values) => {
            startTransition(() => {
                values.code = code.join('');
                formAction(values);
            });
        },
    });

    useEffect(() => {
        if (state && state.hasTotp) {
            setIsOpenModal(true);
        }
    }, [state]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-screen w-screen bg-primary">
            <div className="w-full h-full bg-[#0a1632]">
                <Image src="/logo.png" alt="logo" className="w-full h-full object-contain" width={1000} height={1000}></Image>
            </div>
            <div className="flex flex-col w-full h-full bg-primary justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center border border-white">
                    <h1 className="text-2xl font-bold shadow-lg shadow-[#CEF549] p-4 bg-primary text-white text-center w-full">Login</h1>
                    <form noValidate={true} onSubmit={formik.handleSubmit} className="flex flex-col w-full justify-center items-center gap-7 py-10">
                        <div className="flex flex-col justify-center text-white w-full h-full md:w-7/8 md:h-7/8">
                            <label htmlFor="email">Email</label>
                            <input {...formik.getFieldProps('email')} type="email" id="email" name="email" className={`focus:outline-none border-2 border-gray-300 p-2 rounded-md ${formik.errors.email && formik.touched.email ? "border-red-500" : ""}`} />
                            {formik.errors.email && formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
                        </div>
                        <div className="flex flex-col justify-center text-white w-full h-full md:w-7/8 md:h-7/8">
                            <label htmlFor="password">Password</label>
                            <input {...formik.getFieldProps('password')} type="password" id="password" name="password" className={`focus:outline-none border-2 border-gray-300 p-2 rounded-md ${formik.errors.password && formik.touched.password ? "border-red-500" : ""}`} />
                            {formik.errors.password && formik.touched.password && <p className="text-red-500">{formik.errors.password}</p>}
                        </div>
                        <button type="submit" disabled={isPending} className="bg-[#0a1632] text-white font-bold p-4 hover:cursor-pointer hover:bg-[#CEF549] hover:text-black transition-all duration-300 ">{isPending ? "Logging in..." : "Login"}</button>
                        <Turnstile onVerify={token => {
                            formik.setFieldValue("turnstileToken", token, false);
                        }}
                        />

                        <input
                            type="hidden"
                            name="turnstileToken"
                            value={formik.values.turnstileToken}
                        />
                    </form>
                    {state && state.error && <p className="text-red-500">{state.error}</p>}
                </div>
            </div>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Check className="absolute -mt-80 w-18 h-18 text-white border border-green-500 rounded-full p-4 bg-green-500" />
                    <p className="text-primary text-2xl font-bold text-center mt-3 tracking-[4px]">Çift Faktörlü Doğrulama</p>
                    <span className="text-primary text-sm font-light tracking-[2px]">Doğrulama kodunu giriniz</span>
                    <span className="text-primary tracking-[2px]">Uygulamadaki 6 haneli kodu giriniz</span>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-6 items-center justify-center gap-2 p-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    value={digit}
                                    className="border-2 border-gray-300 p-1 w-10 h-10 rounded-full text-center focus:outline-none focus:ring-0 focus:border-yellow-500 focus:appearance-none"
                                    placeholder="*"
                                    ref={el => inputRefs.current[index] = el}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={formik.handleSubmit}
                        className="bg-primary text-white font-bold py-2 px-4 hover:cursor-pointer hover:bg-[#CEF549] hover:text-black transition-all duration-300 tracking-[2px]">Doğrula</button>
                </div>
            </Modal>
        </section>
    );
}
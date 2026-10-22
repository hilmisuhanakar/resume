"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useActionState, startTransition, useState } from "react";
import { createContactAction } from "@/server/actions/contact.action";
import { getLocale } from "next-intl/server";
import Turnstile from "../Turnstile";

export default function ContactForm({ locale }) {
    const [state, formAction, isPending] = useActionState(createContactAction, null);
    const t = useTranslations("ContactForm");
    const tLabels = useTranslations("Contact");
    const tResponseMessage = useTranslations("ContactResponseMessage");
    const [verified, setVerified] = useState(false);


    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("nameRequired")),
        email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
        message: Yup.string().required(t("messageRequired")),
    });

    const initialValues = {
        locale: locale,
        name: "",
        email: "",
        message: "",
        turnstileToken: "",
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            startTransition(() => {
                formAction(values);
                formik.resetForm();
            });
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-7 p-7 md:w-[33.5%] md:py-10" noValidate={true}>
                {state && state.success && <p className="text-green-500 text-sm p-2 bg-green-500/10 rounded-sm">{tResponseMessage("success")}</p>}
                {state && state.error && <p className="text-red-500 text-sm p-2 bg-red-500/10 rounded-sm">{tResponseMessage(state.error)}</p>}
                {Object.keys(formik.errors).length > 0 &&
                    <ul className="list-disc list-inside">
                        {formik.errors.name && formik.touched.name && <li className="text-red-500 text-sm">{formik.errors.name}</li>}
                        {formik.errors.email && formik.touched.email && <li className="text-red-500 text-sm">{formik.errors.email}</li>}
                        {formik.errors.message && formik.touched.message && <li className="text-red-500 text-sm">{formik.errors.message}</li>}
                    </ul>
                }
                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-primary font-light">{tLabels("name")}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`border  p-2 focus:outline-none w-full ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-[text-primary]'}`} {...formik.getFieldProps("name")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className={`text-primary font-light`}>{tLabels("email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`border  p-2 focus:outline-none w-full ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-[text-primary]'}`} {...formik.getFieldProps("email")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="message"
                            className={`text-primary font-light`}>{tLabels("message")}
                        </label>
                        <textarea
                            rows={6}
                            id="message"
                            name="message"
                            className={`border  p-2 focus:outline-none w-full ${formik.errors.message && formik.touched.message ? 'border-red-500' : 'border-[text-primary]'}`} {...formik.getFieldProps("message")} />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending || !verified}
                        className="flex items-center justify-center gap-2 border border-primary text-white text-lg p-3 bg-primary hover:cursor-pointer hover:bg-white transition-all duration-300">{tLabels("send")}
                        {isPending && <Loader2 className="w-6 h-6 animate-spin" />}
                    </button>
                    <Turnstile locale={locale} onVerify={token => {
                        setVerified(true);
                        formik.setFieldValue("turnstileToken", token, false);
                    }}
                    />

                    <input
                        type="hidden"
                        name="turnstileToken"
                        value={formik.values.turnstileToken}
                    />
                </div>
            </form>
        </>
    )
}
"use client";

import { getLanguagesAction } from "@/server/actions/language.action";
import { getProfileByIdAction, saveProfileAction } from "@/server/actions/profile.action";
import { Formik, useFormik } from "formik";
import { startTransition, useActionState, useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("*"),
    title: Yup.string().required("*"),
    about: Yup.string().required("*"),
    email: Yup.string().email("Email geçersiz").required("*"),
    linkedin: Yup.string().required("*"),
    github: Yup.string().required("*"),
});

const initialValues = {
    id: 0,
    languageId: 1,
    name: "",
    title: "",
    about: "",
    email: "",
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    pinterest: "",
    reddit: "",
};

export default function EditProfilePage({ params }) {
    const [_id, setId] = useState(0);
    const [state, formAction, isPending] = useActionState(saveProfileAction, null);
    const [languages, setLanguages] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchLanguages = async () => {
            const languages = await getLanguagesAction();
            setLanguages(languages);
        }
        fetchLanguages();
        const fetchProfile = async () => {
            const { id } = await params;
            setId(id);
            if (id > 0) {
                const profile = await getProfileByIdAction(id);
                formik.setValues({ ...initialValues, ...profile });
            }
        }
        fetchProfile();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            startTransition(() => {
                formAction({ ...initialValues, ...values });
            });
        },
    });
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex w-full h-full gap-4 items-center justify-between">
                <h1 className="text-2xl font-bold">Profil Bilgileri</h1>
                <div className="flex gap-4 items-center">
                    <label htmlFor="language" className="text-xl font-medium">İçerik Dili</label>
                    <select name="language" id="language" className="border border-[bg-primary] rounded-md p-2 focus:outline-none" onChange={(e) => {
                        formik.setFieldValue("languageId", Number(e.target.value));
                    }} value={formik.values.languageId || 1}>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id} >{language.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {state?.success && (
                <div className="bg-green-50 border border-green-500 text-green-600 px-4 py-3 rounded-md">
                    {state?.message}
                </div>
            )}
            {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
                <div className="bg-red-50 border border-red-500 text-red-600 px-4 py-3 rounded-md">
                    Kırmızı alanları doldurun.
                </div>
            )}
            <form onSubmit={formik.handleSubmit} className="w-full h-full bg-white border border-gray-200 rounded-lg p-4 space-y-4" noValidate={true}>
                <div className="flex flex-col w-full h-full gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="name">İsim*</label>
                            <input value={formik.values.name || ""} type="text" id="name" name="name" className={`${formik.errors.name && formik.touched.name ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("name")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="title">Title*</label>
                            <input value={formik.values.title || ""} type="text" id="title" name="title" className={`${formik.errors.title && formik.touched.title ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("title")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="email">Email*</label>
                            <input value={formik.values.email || ""} type="text" id="email" name="email" className={`${formik.errors.email && formik.touched.email ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("email")} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="about">Açıklama*</label>
                            <textarea rows={4} value={formik.values.about || ""} type="text" id="about" name="about" className={`${formik.errors.about && formik.touched.about ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("about")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="image"
                                    className="text-sm font-medium text-gray-700 w-1/3"
                                >
                                    Profil Resmi
                                </label>

                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl text-gray-400">
                                            +
                                        </span>

                                        <span className="text-sm text-gray-600">
                                            Resim seçmek için tıklayın
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            PNG, JPG veya WEBP
                                        </span>
                                    </div>

                                    <input type="file" id="image" name="image" accept="image/png,image/jpeg,image/webp" className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full gap-4 border p-4 rounded-lg">
                    <label htmlFor="socialMedia" className="text-xl font-medium">Sosyal Medya</label>
                    <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 border border-gray-200 rounded-lg p-4">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="linkedin">Linkedin*</label>
                            <input type="text" id="linkedin" name="linkedin" className={`${formik.errors.linkedin && formik.touched.linkedin ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("linkedin")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="github">Github*</label>
                            <input type="text" id="github" name="github" className={`${formik.errors.github && formik.touched.github ? "border-red-500" : "border-[bg-primary]"} border rounded-md p-2 w-full focus:outline-none`} {...formik.getFieldProps("github")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="twitter">Twitter</label>
                            <input type="text" id="twitter" name="twitter" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("twitter")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="facebook">Facebook</label>
                            <input type="text" id="facebook" name="facebook" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("facebook")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="instagram">Instagram</label>
                            <input type="text" id="instagram" name="instagram" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("instagram")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="youtube">Youtube</label>
                            <input type="text" id="youtube" name="youtube" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("youtube")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="tiktok">Tiktok</label>
                            <input type="text" id="tiktok" name="tiktok" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("tiktok")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="pinterest">Pinterest</label>
                            <input type="text" id="pinterest" name="pinterest" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("pinterest")} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="reddit">Reddit</label>
                            <input type="text" id="reddit" name="reddit" className="border border-[bg-primary] rounded-md p-2 w-full focus:outline-none" {...formik.getFieldProps("reddit")} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-sm" disabled={isPending}>{isPending ? "Kayit Ediliyor..." : "Kaydet"}</button>
                </div>
            </form>
        </div>
    );
}
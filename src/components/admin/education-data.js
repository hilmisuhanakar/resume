"use client";
import { useState } from "react";
import PageTop from "./UI/page-top";
import Modal from "./modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useActionState, startTransition } from "react";
import { getEducationByIdAction, getEducationsAction, saveEducationAction } from "@/server/actions/education.action";
import { useTable, rowSortingFeature, columnVisibilityFeature, rowPaginationFeature, createSortedRowModel } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import ActionMenu from "./action-menu";

const tableFeatures = {
    rowSortingFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
}

const initialValues = {
    id: 0,
    languageId: 1,
    school: "",
    degree: "",
    description: "",
    startDate: null,
    endDate: null,
}

const validationSchema = Yup.object().shape({
    languageId: Yup.number().required("Dil seçilmedi"),
    school: Yup.string().required("Okul boş bırakılamaz"),
    degree: Yup.string().required("Bölüm boş bırakılamaz"),
    description: Yup.string().required("Açıklama boş bırakılamaz"),
    startDate: Yup.date().required("Başlangıç tarihi boş bırakılamaz"),
    endDate: Yup.date().required("Bitiş tarihi boş bırakılamaz"),
})

export default function EducationData({ initialData = [], languages }) {
    const [data, setData] = useState(initialData);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [state, formAction, isPending] = useActionState(saveEducationAction, null);
    const columns = [
        {
            id: "actions",
            header: "İşlemler",
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => (
                <ActionMenu row={row} onClick={() => handelGetData(row.original.id)} />
            ),
        },
        {
            header: "Dil",
            accessorKey: "languageName",
        },
        {
            header: "Okul",
            accessorKey: "school",
        },
    ];
    const table = useTable({
        data: data,
        columns: columns,
        features: tableFeatures,
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            startTransition(async () => {
                formAction({...initialValues, ...values});
                setIsOpenModal(false);
                formik.resetForm();
                const result = await getEducationsAction();
                setData(result);
            });
        },
    });

    const handelGetData = async (id) => {
        const result = await getEducationByIdAction(id);
        formik.setValues({ ...initialValues, ...result });
        setIsOpenModal(true);
    }
    return (
        <div className="flex flex-col">
            <PageTop title="EĞİTİM" btnOnClick={() => setIsOpenModal(true)} />
            {state?.success && (
                <div className="bg-green-50 border border-green-300 text-green-600 p-3 rounded-md mb-4">
                    <p>Eğitim başarıyla kaydedildi</p>
                </div>
            )}
            <DataTable table={table} />
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <h1 className="text-2xl font-bold mb-4">Eğitim Ekle</h1>
                <div className="h-px w-full bg-gray-300 my-4"></div>
                {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
                    <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-md mb-4">
                        <ul>
                            {Object.values(formik.errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="language">Dil</label>
                            <select id="language" name="language" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("languageId")}>
                                {languages.map((language) => (
                                    <option key={language.id} value={language.id}>{language.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="startDate">Başlangıç Tarihi</label>
                            <input type="date" id="startDate" name="startDate" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("startDate")} value={dayjs(formik.values.startDate).format("YYYY-MM-DD")} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="endDate">Bitiş Tarihi</label>
                            <input type="date" id="endDate" name="endDate" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("endDate")} value={dayjs(formik.values.endDate).format("YYYY-MM-DD")} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 flex-1/2">
                            <label htmlFor="school">Okul</label>
                            <input type="text" id="school" name="school" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("school")} />
                        </div>
                        <div className="flex flex-col gap-2 flex-1/2">
                            <label htmlFor="degree">Bölüm</label>
                            <input type="text" id="degree" name="degree" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("degree")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Açıklama</label>
                        <textarea id="description" rows={2} name="description" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("description")} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" disabled={isPending} className="bg-red-500 text-white p-2 rounded-md hover:cursor-pointer hover:bg-red-600 transition-all duration-300" onClick={() => { setIsOpenModal(false); formik.resetForm() }}>İptal</button>
                        <button type="submit" disabled={isPending} className="bg-primary text-white p-2 rounded-md hover:cursor-pointer hover:bg-primary/80 transition-all duration-300">{isPending ? "Kayit Ediliyor..." : "Kaydet"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
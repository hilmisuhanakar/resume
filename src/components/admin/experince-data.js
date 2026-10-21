"use client";
import { PlusSquare } from "lucide-react";
import Modal from "./modal";
import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { DataTable } from "./data-table";
import { tableFeatures, rowSortingFeature, createSortedRowModel, useTable, columnVisibilityFeature, rowPaginationFeature } from "@tanstack/react-table";
import ActionMenu from "./action-menu";
import { saveExperienceAction, getExperienceByIdAction, getExperiencesAction } from "@/server/actions/experience.action";
import dayjs from "dayjs";
import { useActionState, startTransition } from "react";
import PageTop from "./UI/page-top";

const tableFeature = tableFeatures({
    rowSortingFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
});

const initialValues = {
    id: 0,
    languageId: 1,
    startDate: null,
    endDate: null,
    company: "",
    position: "",
    description: "",
}


const validationSchema = Yup.object().shape({
    languageId: Yup.number().required("Dil seçilmedi"),
    startDate: Yup.date().required("Başlangıç tarihi seçilmedi"),
    endDate: Yup.date().nullable(),
    company: Yup.string().required("Şirket adı girilmedi"),
    position: Yup.string().required("Pozisyon girilmedi"),
    description: Yup.string().required("Açıklama girilmedi"),
});

export default function ExperienceData({ initialData, languages }) {
    const [data, setData] = useState(initialData);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [state, formAction, isPending] = useActionState(saveExperienceAction, null);
    const columns = [
        {
            id: "actions",
            header: "İşlemler",
            cell: ({ row }) => {
                return (
                    <ActionMenu row={row} onClick={() => { handelGetData(row.original.id) }} />
                )
            },
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "Dil",
            accessorKey: "languageName",
        },
        {
            header: "Şirket",
            accessorKey: "company",
        },
        {
            header: "Başlangıç Tarihi",
            accessorKey: "startDate",
            cell: ({ row }) => {
                return (
                    <span className="text-sm">
                        {dayjs(row.original.startDate).format("DD.MM.YYYY")}
                    </span>
                )
            },
        },
        {
            header: "Bitiş Tarihi",
            accessorKey: "endDate",
            cell: ({ row }) => {
                return (
                    <span className="text-sm">
                        {dayjs(row.original.endDate).format("DD.MM.YYYY")}
                    </span>
                )
            },
        },
    ];

    const table = useTable({
        features: tableFeature,
        columns: columns,
        data: data,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
        rowCount: 2,
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            startTransition(async () => {
                formAction(values);
                setIsOpenModal(false);
                formik.resetForm();
                const result = await getExperiencesAction();
                setData(result);
            });
        },
    });


    const handelGetData = async (id) => {
        const result = await getExperienceByIdAction(id);
        formik.setValues({ ...initialValues, ...result });
        setIsOpenModal(true);
    }

    /* useEffect(() => {
        if (!state?.success || !state?.data) {
            return;
        }
        setData(prev =>
            prev.map(item =>
                item.id === state.data.id
                    ? state.data
                    : item
            )
        );

    }, [state]); */

    return (
        <div className="flex flex-col">

            <PageTop title="DENEYİM" btnOnClick={() => setIsOpenModal(true)} />

            {state?.success && (
                <div className="bg-green-50 border border-green-300 text-green-600 p-3 rounded-md mb-4">
                    Deneyim başarıyla kaydedildi
                </div>
            )}
            <DataTable table={table} />
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <h1 className="text-2xl font-bold mb-4">Deneyim Ekle</h1>
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
                        <div className="flex flex-col gap-2 flex-2/3">
                            <label htmlFor="company">Şirket</label>
                            <input type="text" id="company" name="company" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("company")} />
                        </div>
                        <div className="flex flex-col gap-2 flex-2/3">
                            <label htmlFor="position">Pozisyon</label>
                            <input type="text" id="position" name="position" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("position")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Açıklama</label>
                        <textarea id="description" rows={5} name="description" className="border border-gray-300 p-2 rounded-md" {...formik.getFieldProps("description")} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" disabled={isPending} className="bg-red-500 text-white p-2 rounded-md hover:cursor-pointer hover:bg-red-600 transition-all duration-300" onClick={() => { setIsOpenModal(false); formik.resetForm() }}>iptal</button>
                        <button type="submit" disabled={isPending} className="bg-primary text-white p-2 rounded-md hover:cursor-pointer hover:bg-primary/80 transition-all duration-300">{isPending ? "Kayit Ediliyor..." : "Kaydet"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
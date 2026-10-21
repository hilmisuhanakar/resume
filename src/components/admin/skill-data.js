"use client";
import { useState } from "react";
import PageTop from "./UI/page-top";
import Modal from "./modal";
import { useActionState, startTransition } from "react";
import { getSkillAction, getSkillsAction, saveSkillAction } from "@/server/actions/skill.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable, tableFeatures, rowSortingFeature, createSortedRowModel, rowPaginationFeature, paginatedRowModel, createPaginatedRowModel } from "@tanstack/react-table";
import ActionMenu from "./action-menu";
import { DataTable } from "./data-table";

const tableFeature = tableFeatures({
    rowSortingFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
});

const initialValues = {
    id: 0,
    name: "",
    orderNumber: "",
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Yetenek adı boş bırakılamaz"),
});

export const SkillData = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [state, formAction, isPending] = useActionState(saveSkillAction, null);

    const columns = [
        {
            id: "actions",
            header: "İşlemler",
            cell: ({ row }) => {
                return <ActionMenu row={row} onClick={() => { handelGetData(row.original.id) }} />
            },
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "Yetenek Adı",
            accessorKey: "name",
        },
        {
            header: "Sıra Numarası",
            accessorKey: "orderNumber",
        }
    ];

    const table = useTable({
        data,
        columns,
        features: tableFeature,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            startTransition(async () => {
                formAction(values);
                setIsOpenModal(false);
                formik.resetForm();
                const result = await getSkillsAction();
                setData(result);
            });
        },
    });

    const handelGetData = async (id) => {
        const result = await getSkillAction(id);
        formik.setValues(result);
        setIsOpenModal(true);
    }

    return (
        <div className="flex flex-col">
            <PageTop title="Yetenekler" btnOnClick={() => setIsOpenModal(true)} />
            {
                state?.success && (
                    <div className="bg-green-50 border border-green-300 text-green-600 p-3 rounded-md mb-4">
                        <p>{state?.message}</p>
                    </div>
                )
            }
            <DataTable table={table} />
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Yetenek Ekle</h1>
                        <div className="w-full h-px bg-gray-200"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 flex-2/3">
                            <label htmlFor="name">Yetenek Adı</label>
                            <input type="text" id="name" name="name" className="w-full p-2 rounded-md border border-gray-300" {...formik.getFieldProps("name")} />
                        </div>
                        <div className="flex flex-col gap-4 flex-1/3">
                            <label htmlFor="orderNumber">Sıra Numarası</label>
                            <input type="number" id="orderNumber" name="orderNumber" className="w-full p-2 rounded-md border border-gray-300" {...formik.getFieldProps("orderNumber")} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" disabled={isPending} className="bg-red-500 text-white p-2 rounded-md hover:cursor-pointer hover:bg-red-600 transition-all duration-300" onClick={() => { setIsOpenModal(false); formik.resetForm() }}>iptal</button>
                        <button type="submit" disabled={isPending} className="bg-primary text-white p-2 rounded-md hover:cursor-pointer hover:bg-primary/80 transition-all duration-300">{isPending ? "Kayit Ediliyor..." : "Kaydet"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
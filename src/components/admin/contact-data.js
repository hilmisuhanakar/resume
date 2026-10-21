"use client";
import { useState } from "react";
import PageTop from "./UI/page-top";
import { useTable, tableFeatures, rowSortingFeature, columnVisibilityFeature, rowPaginationFeature, createSortedRowModel } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import ActionMenu from "./action-menu";
import Modal from "./modal";
import { getContactByIdAction } from "@/server/actions/contact.action";

const features = tableFeatures({
    rowSortingFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
});

export default function ContactData({ initialData = [] }) {
    const [data, setData] = useState(initialData);
    const [contactData, setContactData] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const columns = [
        {
            header: "İşlemler",
            accessorKey: "actions",
            cell: ({ row }) => {
                return <ActionMenu row={row} onClick={() => handelGetData(row.original.id)} />;
            },
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "Adı",
            accessorKey: "name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Dil",
            accessorKey: "languageName",
        },
        {
            header: "Oluşturulma Tarihi",
            accessorKey: "createdAt",
            cell: ({ row }) => {
                return <span>{dayjs(row.original.createdAt).locale("tr").format("DD MMMM YYYY HH:mm")}</span>;
            },
        },
    ];

    const table = useTable({
        features,
        columns,
        data,
    });

    const handelGetData = async (id) => {
        const response = await getContactByIdAction(id);
        setContactData(response.data);
        setIsOpenModal(true);
    }

    return (
        <>
            <PageTop title="İletişim" />
            <DataTable table={table} />
            <Modal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            >
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">İletişim</h2>
                    <div className="grid grid-cols-2 border border-gray-200/50 bg-gray-100/40 rounded-md p-2">
                        <div className="flex flex-col">
                            <p className="text-gray-700">Adı: {contactData.name}</p>
                            <p className="text-gray-700">Email: {contactData.email}</p>
                        </div>
                        <p className="text-gray-700 text-right">Tarih: {dayjs(contactData.createdAt).locale("tr").format("DD MMMM YYYY HH:mm")}</p>
                    </div>
                    <p className="text-black">Mesaj</p>
                    <span className="p-2 text-gray-700 whitespace-pre-wrap bg-gray-100/70 rounded-md tracking-wider">{contactData.message}</span>
                </div>
            </Modal>
        </>
    )
}
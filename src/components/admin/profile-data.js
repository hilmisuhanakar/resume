"use client";
import { DataTable } from "@/components/admin/data-table";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ActionMenu from "./action-menu";
import { tableFeatures, rowSortingFeature, createSortedRowModel, useTable, columnVisibilityFeature, rowPaginationFeature } from "@tanstack/react-table";
import { getProfileAction } from "@/server/actions/profile.action";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import PageTop from "./UI/page-top";

const features = tableFeatures({
    rowSortingFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
});

export default function ProfileData({ initialData = [], session }) {
    const router = useRouter();
    const firstRender = useRef(true);
    const [data, setData] = useState(initialData.data);
    const [pagination, setPagination] = useState({
        pageIndex: initialData.pageIndex,
        pageSize: initialData.pageSize,
    });
    const [sorting, setSorting] = useState([]);
    const [totalCount, setTotalCount] = useState(initialData.totalCount);
    const fetchData = async () => {
        const result = await getProfileAction(pagination.pageIndex, pagination.pageSize, sorting);
        setData(result.data);
        setTotalCount(result.totalCount);
    }
    const columns = [
        {
            id: "actions",
            header: "İşlemler",
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => (
                <ActionMenu row={row} onClick={() => router.push(`/admin/profile/edit/${row.original.id}`)} />
            ),
        },
        {
            header: "Dil",
            accessorKey: "languageName",
        },
        {
            header: "Güncellenme Tarihi",
            accessorKey: "updatedAt",
            cell: ({ row }) => (
                <span className="text-sm">
                    {dayjs(row.original.updatedAt).format("DD.MM.YYYY HH:mm")}
                </span>
            ),
        }
    ];

    const table = useTable({
        features,
        columns,
        data,

        state: {
            pagination,
            sorting,
        },

        onPaginationChange: setPagination,

        onSortingChange: setSorting,

        rowCount: totalCount,
        autoResetPageIndex: false,
    });

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, sorting]);

    return (
        <>
            <div className="flex flex-col">

                <PageTop title="PROFİL" btnOnClick={() => router.push("/admin/profile/edit/0")} />

                <div className="md:px-2 lg:px-4">
                    <DataTable
                        table={table}
                    />
                </div>

            </div>
        </>
    );
}
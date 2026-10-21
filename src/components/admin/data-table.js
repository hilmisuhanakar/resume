"use client";
import { ChevronLeft, ChevronRight, Funnel } from "lucide-react";

export const DataTable = ({ table}) => {
    return (
        <>
            <div className="flex justify-end mb-2">
                <select
                    className="border p-1.5 text-left text-sm"
                    value={table.state.pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`border border-black/30 p-1.5 text-left text-sm bg-gray-100  ${index == 0 ? 'w-10' : 'hover:cursor-pointer hover:bg-gray-200'}`}
                                >
                                    <div className="flex items-center justify-between text-black">
                                        {<table.FlexRender header={header} />}
                                        <div className="flex items-center gap-1">
                                            {header.column.columnDef.enableColumnFilter ?? <>
                                                <Funnel className="w-4 h-4" />
                                                {{
                                                    asc: " ↑",
                                                    desc: " ↓",
                                                }[header.column.getIsSorted()] ?? null}
                                            </>}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={`border border-black/30 p-1.5 text-left text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-100`}>
                            {row.getAllCells().map((cell) => (
                                <td key={cell.id} className="border border-black/30 p-1.5 text-left text-sm">
                                    <table.FlexRender cell={cell} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end gap-5 mt-2">
                <div className="flex items-center gap-2 border border-black/30 p-2 rounded-sm">
                    <span>
                        {table.state.pagination.pageIndex + 1} / {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="hover:cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 rounded-md"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="hover:cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 rounded-md"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

            </div>
        </>
    );
};
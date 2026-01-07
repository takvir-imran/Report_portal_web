'use client';

import { useState } from "react";

export default function Dropdown({ DropList, DropDefault, name }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    return (
        <div className="relative w-32 mt-5.5">
            {/* Hidden input for Server Action */}
            <input type="hidden" name={name} value={selected} />

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 shadow rounded bg-white items-center"
            >
                {selected || DropDefault }
            </button>
            

            {isOpen && (
                <ul className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded bg-white shadow-md">
                    {DropList.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import { UtilSearch, ModalSearch } from "@/components";

const AsideUtil = () => {
    const [modalSearchOpen, setModalSearchOpen] = useState<boolean>(false);

    return (
        <>
            <div className="sticky top-[80px] z-10 py-2 pr-2">
                <UtilSearch isAvailable={modalSearchOpen} handleClick={() => setModalSearchOpen(!modalSearchOpen)} />
            </div>
            {modalSearchOpen && (
            <ModalSearch 
                isOpen={modalSearchOpen}
                handleClose={() => setModalSearchOpen(!modalSearchOpen)}
            />
            )}
        </>
    );
};

export default AsideUtil;

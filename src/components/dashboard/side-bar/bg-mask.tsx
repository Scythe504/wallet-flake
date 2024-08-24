import React from "react"

export const MaskBg = ({
    enable
}: {
    enable: boolean
}) => {

    return enable && <div className="z-10 h-screen w-screen absolute top-0 left-0 bg-white opacity-20 blur-xl">

    </div>

}
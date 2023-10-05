'use client'

import { Watch } from "react-loader-spinner"

export default function Loading() {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Watch
                height="80"
                width="80"
                radius="48"
                color="#E5FE72"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true} />
        </div>
    )
}

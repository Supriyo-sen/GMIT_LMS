import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import Loading from '../components/common/Loading'
import { ACCOUNT_TYPE } from '../utils/constants'

const Dashboard = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading, user } = useSelector((state) => state.profile);


    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                <Loading />
            </div>
        )
    }
    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={`relative flex min-h-[calc(100vh-3.5rem)] ${user?.accountType === ACCOUNT_TYPE.ADMIN ? 'justify-center' : ''}`}>
            {user?.accountType !== ACCOUNT_TYPE.ADMIN && <Sidebar />}

            <div className={`h-[calc(100vh-3.5rem)] overflow-auto ${user?.accountType !== ACCOUNT_TYPE.ADMIN ? 'w-full' : 'w-full max-w-[1200px]'} `}>
                <div className={`mx-auto w-11/12 py-10 ${user?.accountType === ACCOUNT_TYPE.ADMIN ? 'max-w-[1200px]' : 'max-w-[1000px]'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard

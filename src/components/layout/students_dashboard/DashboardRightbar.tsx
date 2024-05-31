import { useRouter } from 'next/router';
import React from 'react'

type DashboardRightbarProps = React.PropsWithChildren & {
    className?: string;
  };

const DashboardRightbar = () => {
    const router = useRouter();
    const { route } = useRouter();
  return (
    <>
        <aside className='relative'>
            <div className="fixed hidden h-screen w-72 bg-white lg:flex lg:justify-end border-r">
                <div>
                    <h3>Course content</h3>
                </div>
            </div>
        </aside>
    </>
  )
}

export default DashboardRightbar

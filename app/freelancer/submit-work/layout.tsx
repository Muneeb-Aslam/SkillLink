import DashboardNavbar from '@/components/ui/dashboardnav';
import Footer from '@/components/ui/footer';
import React from 'react';

const SubmitWorkLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className='w-full'>
        <DashboardNavbar />
        {children}
        <Footer />
    </div>
  )
}

export default SubmitWorkLayout;

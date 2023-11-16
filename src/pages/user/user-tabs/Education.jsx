import React from 'react';

const Education = () => {
  return (
    <div className=" p-3 lg:p-3  ">
      <div className="pt-2 lg:grid grid-cols-5 gap-4">
        {/* First Row */}
        <div className='col-span-1  py-6'>
          
          <p className='text-[#adadad] text-sm'>Education</p>
        </div>
        <div className=' pt-6 lg:col-span-2'>
          <h1>Ms Software Engineering.</h1>
          <p className='text-[#adadad] text-sm '>Completed 2009</p>
        </div>
        <div className='pt-6 lg:col-span-2'>
          <h1>Fsc Pre Engineering</h1>
          <p className='text-[#adadad] text-sm'>Completed 2005</p>
        </div>

        {/* Second Row */}
        <div className=''>
          <h1></h1>
          <p></p>
        </div>
        <div className='pt-2 lg:col-span-2'>
          <h1>Bs Software Engineering</h1>
          <p className='text-[#adadad] text-sm'>Completed 2007</p>
        </div>
        <div className='pt-2 lg:col-span-2'>
          <h1>Matric in Computer Science</h1>
          <p className='text-[#adadad] text-sm'>Completed 2003</p>
        </div>
      </div>
    </div>
  );
};

export default Education;

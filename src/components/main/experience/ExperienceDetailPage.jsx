import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { DATA } from '../../../Context/DataContext';
import Breadcrumb from '../../Breadcrumb';

function ExperienceDetailPage() {

    const { experienceId } = useParams(); 
    const { experience } = useContext(DATA);

    const [selectedExperience, setSelectedExperience] = useState(null); 

    useEffect(() => {
      const selectedExperienceData = experience.find(exp => exp.id === experienceId); 
      setSelectedExperience(selectedExperienceData);
  }, [experienceId, experience]);

    if (!selectedExperience) {
        return null;
    }

  return (
    <div className="offer-detail w-[70%] mx-auto my-12">
      <h1 className='text-[#01357e] text-[1.2em] py-3 border-b border-[#afdae4]  md:text-[1.7em]'>
        {selectedExperience.shortdescription}
      </h1>
      <div>
        <div
          className='text-[#6e7583]  mx-auto my-6'
          dangerouslySetInnerHTML={{ __html: selectedExperience.description }} 
        ></div>
      </div>
    </div>
  );
}

export default ExperienceDetailPage;

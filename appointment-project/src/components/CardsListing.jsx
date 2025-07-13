import hospitalData from '../hospitalData.json';

function CardsListing() {
  const doctors = hospitalData.map((entry) => entry.doctor);

  return (
    <section>
      <h1 className='text-center font-bold text-shadow-black text-2xl'>Available Doctors(Today)</h1>
      <div className="flex flex-wrap gap-6 justify-center p-4">
      
      

      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col items-center p-6">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`} // Optional: vary image
              alt={doctor.name}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {doctor.name}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {doctor.specialty}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {doctor.contact.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {doctor.contact.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
}

export default CardsListing;

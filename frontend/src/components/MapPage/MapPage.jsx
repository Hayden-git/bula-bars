
import ResultsList from './ResultsList/ResultsList';
import KavaBarMap from './KavaBarMap/KavaBarMap';

export default function MapPage({ userId, setUserId }) {

  console.log("FROM MapPage.jsx", userId)

  return (
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <ResultsList userId={userId} setUserId={setUserId}/>
        </div>

        <div className=''>
          <KavaBarMap/>
        </div> 
    </div>
  )
}

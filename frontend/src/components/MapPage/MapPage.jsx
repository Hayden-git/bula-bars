
import ResultsList from './ResultsList/ResultsList';
import KavaBarMap from './KavaBarMap/KavaBarMap';

export default function MapPage() {
  return (
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <ResultsList />
        </div>

        <div className=''>
          <KavaBarMap/>
        </div> 
    </div>
  )
}

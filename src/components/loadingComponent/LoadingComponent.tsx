import { OrbitProgress } from 'react-loading-indicators'

const LoadingComponent = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen mx-auto'>
        <OrbitProgress variant="spokes" color="#3147cc" size="medium"/>
    </div>
  )
}

export default LoadingComponent
import LeftNav from './LeftNav'

const Wrapper = () => {
  return (
    <div className='flex'>
      <div>TopNav</div>
      <div className='h-screen w-full grid grid-cols-12'>
        <LeftNav />
      </div>
    </div>
  )
}

export default Wrapper

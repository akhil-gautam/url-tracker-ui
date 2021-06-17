import LeftNav from './LeftNav'

const Wrapper = () => {
  return (
    <div className='flex'>
      <div>TopNav</div>
      <div className='w-full grid grid-cols-12'>
        <LeftNav />
      </div>
    </div>
  )
}

export default Wrapper

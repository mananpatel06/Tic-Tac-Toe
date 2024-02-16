import Footer from './footer'
import Tictactoe from './tictactoe'

const Page = () => {
  return (
    <div className='bg-neutral-700 flex flex-col flex-none justify-between items-center
    w-full min-h-screen overflow-auto'>
    <Tictactoe />
    <Footer />
    </div>
  )
}

export default Page;
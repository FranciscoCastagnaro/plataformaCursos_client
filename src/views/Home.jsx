import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { MainInfo } from '../components/MainInfo'
import { Footer } from '../components/Footer'


export const Home = () => {
  return (
    <>
      <Navbar/>
      <Main/>
      <MainInfo/>
      <Footer/>
    </>
  )
}
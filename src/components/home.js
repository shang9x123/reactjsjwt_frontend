import React from 'react'
import { useCookies } from 'react-cookie'

export const Home = () => {

    const [cookies] = useCookies(['jwt', '_ga']);

    return (
        <div>
            {cookies.jwt}
            {cookies._ga}
        </div>
    )
}
export default Home
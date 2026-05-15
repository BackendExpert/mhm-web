import React from 'react'
import CardData from './DashboardContents/CardData'
import MapData from './DashboardContents/MapData'
import FactoryCard from './DashboardContents/FactoryCard'
import Time from './DashboardContents/Time'

const DashHome = () => {
    return (
        <div>
            <div className="xl:flex">
                <div className="xl:w-4/5">
                    <div className="">
                        <CardData />
                    </div>
                    <div className="xl:flex mt-4">
                        <div className="xl:w-1/2 rounded-xl bg-white p-4">
                            <MapData />
                        </div>
                        <div className="xl:w-1/2 xl:ml-4 xl:mt-0 mt-4">
                            <div className="">
                                <Time />
                            </div>
                            <div className="mt-4">
                                <FactoryCard />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:w-1/5 xl:ml-4">
                    <div className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga error suscipit qui beatae, rerum ratione fugiat reprehenderit vitae distinctio, excepturi iste cupiditate deleniti! Ea a dolor aliquid aspernatur laudantium?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHome
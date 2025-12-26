import Cards from "./cards"
export default function Vission(){
    return <div className="vission">
        <div className="SmartParkIntro">
            <h1 className="aboutUsHeader">PlotSense</h1>
            <p>Plot Sense revolutionizes parking in malls and public spaces by providing real-time data to staff and volunteers, enabling them to quickly guide cars to empty slots. Our mission is to save time, and make parking efficient, organized, and stress-free for both users and facility managers.</p>
        </div>
        <div className="team">
            <h1 className="aboutUsHeader">The Team</h1>
            <div className="teamCards">
                <Cards name="Nikhil" role="Assistant Developer" />
                <Cards name="Oswin" role="Project Lead & Developer" />
                <Cards name="Prajwal" role="Assistant Developer" />
                <Cards name="Prarthana" role="Assistant Developer" />
                <Cards name="Pratham" role="Assistant Developer" />
            </div>
        </div>
    </div>
}
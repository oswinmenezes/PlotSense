import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
import { useState } from 'react';


export function setColor(slot){
    if(slot==="f"){
        return "rgb(44, 241, 44)";
    }
    else{
        return "rgb(241, 39, 39)";
    }
}
export default function DashBoard({slots,availableParking,greeting}){
    const d= new Date();
    const m=d.getMonth();
    const date=d.getDate();
    const year=d.getFullYear();
    let month=""
    const dayOfWeekNumber = d.getDay(); // 0-6
    let dayOfWeek = "";
    
  


    switch(dayOfWeekNumber){
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2:
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek = "Saturday";
            break;
        default:
            dayOfWeek = "";
    }
    switch (m) {
    case 0:  month = "JANUARY"; break;
    case 1:  month = "FEBRUARY"; break;
    case 2:  month = "MARCH"; break;
    case 3:  month = "APRIL"; break;
    case 4:  month = "MAY"; break;
    case 5:  month = "JUNE"; break;
    case 6:  month = "JULY"; break;
    case 7:  month = "AUGUST"; break;
    case 8:  month = "SEPTEMBER"; break;
    case 9:  month = "OCTOBER"; break;
    case 10: month = "NOVEMBER"; break;
    case 11: month = "DECEMBER"; break;
}
    return <> <div className="dashBoardContainer">
            <div className="dateContainer">

                <div className="dateDay">
                    <div className="date"><h3>{date}</h3></div>
                    <div className="dayOfWeek"><h3>{dayOfWeek}</h3></div>
                </div>
                
                <div className="year">{month+" "+year}</div>
            </div>
            <div className="randContainer">
                <div className="random"><h1 className="greeting">Hey {greeting}</h1></div>
                <div className="getDetButtons">
                    <div className="button1"></div> 
                </div>
            </div>
        </div>

        <div className="summary">
            <div className="emptyParking parking"><div><EventAvailableSharpIcon />Parkings Empty {4-availableParking} / 4</div></div>
            <div className="fullParking parking"><div><CarCrashSharpIcon />Parkings Full {availableParking} / 4</div></div>
            <div className="totalParking parking"><div><DirectionsCarIcon />Total Parkings : 4</div></div>
        </div>

        <div className="currStatus">
            {slots[0].status === "" ? (
                  <h1>Loading Parking Status Please Wait...</h1>
                ) : (
                  <>
                    
                      <div className="parkingSlot1 slot" style={{ backgroundColor: setColor(slots[0].status) }}>
                        <h3 className='slotName'>Slot-1</h3>
                      </div>
                      <div className="parkingSlot2 slot" style={{ backgroundColor: setColor(slots[1].status) }}>
                        <h3 className='slotName'>Slot-2</h3>
                      </div>
                      <div className="parkingSlot3 slot" style={{ backgroundColor: setColor(slots[2].status) }}>
                        <h3 className='slotName'>Slot-3</h3>
                      </div>
                      <div className="parkingSlot4 slot" style={{ backgroundColor: setColor(slots[3].status) }}>
                        <h3 className='slotName'>Slot-4</h3>
                      </div>
                    
                  </>
                )}
        </div>
    </>
    
}
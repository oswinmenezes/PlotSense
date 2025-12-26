export default function Cards({name,role}){
    return <div>
        <div className="card">
            <div className="circle"></div>
            <div className="teamContent">
                <h2>{name}</h2>
                <h3>{role}</h3>
            </div>
        </div>
    </div>
}

// ***************************Roles******************************
// Project Lead & Developer

//  Idea Contributor

//  Quality Checker

//  Documentation Assistant

//  Support Coordinator
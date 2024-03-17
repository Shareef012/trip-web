import React, { useState } from 'react';
import './PlanTrip.css';
import flights from './FlightData';
import {Link} from 'react-router-dom';

const places = ["Dubai","New York","Canada","Greenland","Maldives","India","Malaysia","Singapore","London"]

const PlanTrip = () => {
    
    const [tripType, setTripType] = useState('oneway');
    const [selectedFrom, setSelectedFrom] = useState('');
    const [selectedTo, setSelectedTo] = useState('');
    const [travelDate, setTravelDate] = useState(getCurrentDate());
    const [returnDate, setReturnDate] = useState('');
    const [numTickets, setNumTickets] = useState(1);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [filteredFrom,setFilteredFrom] = useState(places);
    const [filteredTo,setFilteredTo] = useState(places);

    // Get current date in yyyy-MM-dd format
    function getCurrentDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        return formattedDate;
    }

    // Handle form submission
    const handleFlightSearch = async () => {
        try {
            let filtered = [];
            if (tripType === 'oneway') {
                filtered = flights.filter(flight =>
                    flight.from === selectedFrom && flight.to === selectedTo && flight.date === travelDate
                );
            } else {
                const outboundFlights = flights.filter(flight =>
                    flight.from === selectedFrom && flight.to === selectedTo && flight.date === travelDate
                );
                filtered = outboundFlights;
            }
            setFilteredFlights(filtered);
        } catch (err) {
            console.log("Flight search unsuccessful....", err);
        }
    };

    const handlePaymentConfirmation = async () => {
        
        try {
            const cost = tripType === "oneway" ? numTickets * filteredFlights[0].cost : numTickets * 2 * filteredFlights[0].cost;
            const queryString = `?flightname=${filteredFlights[0].flightName}&from=${selectedFrom}&to=${selectedTo}&travelDate=${travelDate}&returnDate=${returnDate}&numTickets=${numTickets}&cost=${cost}&tripType=${tripType}`;
            window.location.href = 'http://localhost:3001/pay' + queryString;
        } catch (err) {
            console.log("Payment confirmation unsuccessful....", err);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.name === "searchForm") {
            handleFlightSearch();
        } else if (e.target.name === "confirmationForm") {
            handlePaymentConfirmation();
        }
    };

    
    return (
        <div>
            <form onSubmit={handleSubmit} name='searchForm' >
                <div className="mai">
                    <div className='radio'>
                        <input type="radio" name="tripType" value="oneway" checked={tripType === 'oneway'} onChange={() => setTripType('oneway')} />OneWay
                        <input type='radio' name="tripType" value="return" checked={tripType === 'return'} onChange={() => setTripType('return')} />Return <br />
                    </div>
                    <table className='query'>
                    <thead className='print'>
                        <tr>
                        <th>From: </th>
                        <th>To: </th>
                        <th>Travel Date: </th>
                        <th>Return Date: </th>
                        <th>No. Of Tickets: </th>
                        </tr>
                    </thead>
                    <tbody className='input-group'>
                        <tr>
                        <td>
                        <select name="fromPlace" value={selectedFrom}  required onChange={(e) => setSelectedFrom(e.target.value)} className='customSelect'>
                            <option value="">Select The From Location:</option>
                            {
                            filteredFrom.map((option)=>{
                               return <option key={option} value={option}>{option}</option>;
                            })
                        }
                        </select>
        
                        </td>
                        <td>
                            
                        <select name="toPlace" value={selectedTo} required onChange={(e) => setSelectedTo(e.target.value)} className='customSelect'>
                            <option value="">Select The To Location:</option>
                            {
                                filteredTo.map((option)=>{
                                    return <option key={option} value={option}>{option}</option>;
                                 })
                            }
                        </select>
                   
                        </td>

                    <td>
                    
                        <input type="date" id="travelDate" name="travelDate" required value={travelDate} min={travelDate} onChange={(e) => setTravelDate(e.target.value)} className='customSelect'/>
                    
                    </td>
                    <td>
                    {
                        
                            <input type="date" id="returnDate" name="returnDate" min={travelDate} value={returnDate} disabled={tripType === 'oneway'} onChange={(e) => setReturnDate(e.target.value)} required className='customSelect' />

                    }
                    </td>
                    <td>
                    <div className=''>
                        <input type="number" name="ticket" value={numTickets} onChange={(e) => setNumTickets(e.target.value)} className='customSelect' />
                    </div>
                    </td>
                    <td>
                        <input type="submit" name="submit" value="Search" className='search' />
                    </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </form>            
            {
            filteredFlights.length > 0 && (
                    <div>
                        {filteredFlights.map((flight,index)=>(
                            <form action="http://localhost:3001/pay" name="confirmationForm"method='get' onSubmit={handleSubmit}>
                            <table className='resultTabl'>
                                <tr key={index}>
                                    <th>Flight Name</th>
                                    <td><input type="text" name='flightname' value={flight.flightName} className='customSelec' readOnly/></td>
                                </tr>
                                <tr>
                                    <th>From: </th>
                                    <td><input type="text" name='from' value={flight.from} className='customSelec' readOnly/></td>
                                </tr>
                                <tr>
                                    <th>To: </th>
                                    <td><input type="text" name='to' value={flight.to}  className='customSelec' readOnly/></td>
                                </tr>
                                <tr>
                                    <th>Date: </th>
                                    <td><input type="travelDate" name='traveldate' className='customSelec' value={travelDate} readOnly/></td>
                                </tr>
                                <tr>
                                    {tripType==='return' && <th>Return Date</th>}
                                    {tripType==='return' && <td><input type="date" className='customSelec' name='returnDate' value={returnDate} readOnly/></td>}
                                </tr>
                                <tr>
                                   <th>No of Tickets: </th>
                                   <td><input type="text" name='from' className='customSelec' value={numTickets} readOnly/></td>
                                </tr>
                                <tr>
                                    <th>Cost: </th>
                                    {tripType==='oneway' && <td><input type="text" name='cost' className='customSelec' value={numTickets*flight.cost} readOnly/></td>}
                                    {tripType==='return' && <td><input type="text" name='cost' className='customSelec' value={numTickets*2*flight.cost} readOnly/></td>}
                                </tr>
                                <tr>
                                    <th>Trip Type: </th>
                                    <td><input type="text" name="tripType" value={tripType} className='customSelec' readOnly/></td>
                                </tr>
                                <tr>
                                    
                                    <td ><input type="submit" value="Confirm" name="confirm" className='bt'/></td>
                                    
                                </tr>
                            </table>
                            </form>
                        ))}
                    </div>
               


                
            )}

        </div>
    );
};

export default PlanTrip;

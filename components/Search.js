import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = ()=>{
    let [location,setLocation] = useState('');
    let router = useRouter(); 

    let handleSearch =(event)=>{
      event.preventDefault()
      if(location.trim()){
        router.push(`/?location=${location}`)
      }else{
        router.push(`/`)
      }
    }
    return(
        <div class="container container-fluid">
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form class="shadow-lg" onSubmit={handleSearch}>
            <h2 class="mb-3">Search Rooms</h2>
            <div class="form-group">
              <label for="location_field">Location</label>
              <input
                type="text"
                class="form-control"
                id="location_field"
                placeholder="new york"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              />
            </div>

            {/* <div class="form-group">
              <label for="guest_field">No. of Guests</label>
              <select class="form-control" id="guest_field" value="">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div class="form-group">
              <label for="room_type_field">Room Type</label>
              <select class="form-control" id="room_type_field" value="">
                <option>King</option>
                <option>Single</option>
                <option>Twins</option>
              </select>
            </div> */}

            <button type="submit" class="btn btn-block py-2">Search</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Search;
import React, { useEffect, useRef, useState } from "react";

function EmployeeForm() {
  let [employees, setEmployees] = useState([]);
  let [country, setCountry] = useState([]);
  let [gender, setGender] = useState([]);

  let countrySelectRef = useRef();
  let genderSelectRef = useRef();

  useEffect(() => {
    getCountriesListFromServer();
    getGenderListFromServer();
  }, []);

  let getCountriesListFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:9441/CountriesList",
      reqOptions
    );

    let JSOData = await JSONData.json();
setCountry(Array.isArray(JSOData) ? JSOData : []);
    // setCountry(JSOData);
    console.log(JSOData);
  };

  let getGenderListFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch("http://localhost:9441/genderList", reqOptions);

    let JSOData = await JSONData.json();
    setGender(Array.isArray(JSOData) ? JSOData : []);

    // setGender(JSONData);
    console.log(JSOData);
  };

  let getEmployeeFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };
    
    let url = `http://localhost:9441/employees?country=${countrySelectRef.current.value}&gender=${genderSelectRef.current.value}`;

    console.log(url);

    let dataStore = await fetch(url, reqOptions);
    let dataConvert = await dataStore.json();
    setEmployees(dataConvert);
    console.log(dataConvert);
  };

  return (
    <div>
      <div>
        <label>Country</label>
        <select ref={countrySelectRef}>
          {country.map((ele, i) => {
            return <option key={i}>{ele}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Gender</label>
        <select ref={genderSelectRef}>
          {gender.map((ele, i) => {
            return <option key={i}>{ele}</option>;
          })}
        </select>
      </div>
      <button
        type="button"
        onClick={() => {
          getEmployeeFromServer();
        }}
      >
        Get Data
      </button>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Country</th>
            <th>ProfilePic</th>
            <th>salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.id}</td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.email}</td>
                <td>{ele.gender}</td>
                <td>{ele.country}</td>
                <td>
                  <img src={ele.profilePic} alt="Profile" width="50" />
                </td>
                <td>{ele.salary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeForm;

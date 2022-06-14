import React, { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query'
import Loading from './Loading';
import emailjs from '@emailjs/browser';


const Table = () => {
    const [dataError, setDataError] = useState("");
    const [checkedRow, setCheckedRow] = useState([]);
    const url = 'http://localhost:5000/persons'
    const { isLoading, error, data, refetch } = useQuery('persons', () =>
        fetch(url).then(res => res.json())
    )
    useEffect(() => {
        if (data?.length == 0) {
            setDataError("No data found")
        }
    }, [data])
    useEffect(() => {
        if (error) {
            return setDataError(error.message)
        }
    }, [error])

    if (isLoading) {
        return <Loading />
    }

    const checking = (singleData) => {


        if (checkedRow.includes(singleData)) {
            const newChecked = checkedRow.filter(item => item !== singleData)
            setCheckedRow(newChecked)
        }
        else {
            setCheckedRow([...checkedRow, singleData])
        }


    }
    console.log("checked is ", checkedRow);

    const sendData = () => {
        console.log('working');
        const markedData = () => {
            let persons=""
            checkedRow.map(data => {
                let index = checkedRow.indexOf(data) + 1;
                persons +=index+ ". name:"+ data.name + " email: " + data.email + " number: " + data.number + " hobbies: " + data.hobbies + "\n";
                // let index = checkedRow.indexOf(data) + 1;
                // return `${index}. name:${data.name}, email:${data.email}, phone:${data.number}, hobbies:${data.hobbies} 
                // `

                   
            })
            // return "thikache"
            return persons;
        }
        
        const templateParams = {
            // name: data.name,
            // email: data.email,
            // toEmail: "asadullahmd242@gmail.com",
            // phone: data.number,
            // hobbies: data.hobbies,
            //         name: {{ name }
            // }

            // email: { { email } }

            // phone: { { phone } }

            // hobbies: { { hobbies } }
            markedData: markedData()
        };


        emailjs.send('service_241zrmv', 'template_u8hhogh', templateParams, 'RfpSlyoQDXNOWTQGE')
            .then((response) => {
                console.log("Message sent successfully")
                // setError("")
            }, (err) => {
                console.log(err);
            })

    }




    return (
        <div className='my-12 lg:w-11/12 mx-auto '>
            <p>{dataError} </p>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    {/* head  */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <th>Serial No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Hobbies</th>
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            data?.map(singleData => {
                                let indexIs = data.indexOf(singleData) + 1;
                                return (
                                    <>
                                        <tr>
                                            <td>

                                                <input type="checkbox" class="checkbox" onChange={() => checking(singleData)} />

                                            </td>
                                            <td>{indexIs} </td>
                                            <td>{singleData.name}</td>
                                            <td> {singleData.email}</td>
                                            <td> {singleData.number}</td>
                                            <td>{singleData.hobbies} </td>
                                            <td><button className='btn btn-primary'>Update</button> <br /> <button className='btn btn-secondary'>Delete</button></td>
                                            <th><button class="btn btn-ghost btn-xs">details</button></th>
                                        </tr>

                                    </>
                                )
                            })
                        }


                    </tbody>
                    {/* <!-- foot --> */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}

                </table>
            </div>
            <button className='btn btn-primary' onClick={sendData}>Send</button> <br />
            <label for="my-modal-3" class="btn modal-button">Add new data</label>
        </div>
    );
};

export default Table;
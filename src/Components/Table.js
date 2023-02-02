import React, { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query'
import Loading from './Loading';
import emailjs from '@emailjs/browser';


const Table = ({setId}) => {
    const [dataError, setDataError] = useState("");
    const [checkedRow, setCheckedRow] = useState([]);
    const [success, setSuccess] = useState("");
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
    console.log("data is ", data);

    const checking = (singleData) => {


        if (checkedRow.includes(singleData)) {
            const newChecked = checkedRow.filter(item => item !== singleData)
            setCheckedRow(newChecked)
        }
        else {
            setCheckedRow([...checkedRow, singleData])
        }
    }
    const sendData = () => {
        const markedData = () => {
            let persons = "";
            checkedRow.map(data => {
                let index = checkedRow.indexOf(data) + 1;
                persons += index + ". name:" + data.name + " email: " + data.email + " number: " + data.number + " hobbies: " + data.hobbies + "\n";
            })
            return persons;
        }

        const templateParams = {
            markedData: markedData(),
            email:"asadullahmd242@gmail.com"
        };
        emailjs.send('service_241zrmv', 'template_u8hhogh', templateParams, 'RfpSlyoQDXNOWTQGE')
            .then((response) => {
                setSuccess("Message sent successfully")
            }, (err) => {
                console.log(err);
            })

    }
    const deleteData = id => {
        setSuccess("")
        fetch(`http://localhost:5000/persons/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
            .catch(err => {
                console.log(err);
            })
        }

    return (
            <div className='mt-24 w-11/12  mx-auto '>
                <h1 className='text-3xl font-bold uppercase'>All data</h1>
                <p className='my-16 font-semibold text-xl'>{dataError} </p>
                <div class="overflow-x-auto w-full">
                    <table class=" table-auto w-full">
                        {/* head  */}
                        <thead>
                            <tr className=' border-2 py-4'>
                                <th className='break-all py-4 bg-base-200'>
                                    <label className='md:text-base lg:text-lg font-bold break-all'>
                                        {/* <input type="checkbox" class="checkbox" /> */} Checkbox
                                    </label>
                                </th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Serial No</th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Name</th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Email</th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Phone Number</th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Hobbies</th>
                                <th className='md:text-base lg:text-lg font-bold break-all py-4 bg-base-200'>Update/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                data?.map(singleData => {
                                    let indexIs = data.indexOf(singleData) + 1;
                                    return (
                                        <>
                                            <tr className='border-l-2 border-r-2 border-b-2'>
                                                <td className='break-all'>

                                                    <input type="checkbox" class="checkbox" onChange={() => checking(singleData)} />

                                                </td>
                                                <td className='break-all py-2'>{indexIs} </td>
                                                <td className='break-all py-2'>{singleData.name}</td>
                                                <td className='break-all py-2'> {singleData.email}</td>
                                                <td className='break-all py-2'> {singleData.number}</td>
                                                <td className='break-all py-2'>{singleData.hobbies} </td>
                                                <td className='break-all py-2'><label for="updateForm" class="text-primary px-2 font-semibold py-1 rounded mx-1 cursor-pointer hover:bg-slate-200 modal-button" onClick={()=>setId(singleData._id)}>Update</label> <button className='text-red-500 font-semibold px-2 py-1 rounded mx-1 cursor-pointer hover:bg-slate-200' onClick={() => deleteData(singleData._id)}>Delete</button></td>
                                            </tr>
                                        </>
                                    )
                                })
                            } 

                        </tbody>
                    </table>
                </div>
                <div className='my-8'>
                    <p className='my-6'>{success}</p>
                <button className='btn py-2 px-10 mx-4' onClick={sendData}>Send</button> 
                <label for="my-modal-3" class="btn py-2 px-10  modal-button">Add new data</label>
                </div>
            </div>
        );
    };

    export default Table;
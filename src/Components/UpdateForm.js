import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const UpdateForm = ({id}) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const updateData = async (data) => {
      setSuccess("")
      setError("")
        await fetch(`http://localhost:5000/persons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setError("");
                setSuccess("Successfully updated");
               
            })
            .catch(err =>{
                setSuccess("");
                setError(err.message);
                
            })

    }
   
    return (
        <div>
        <input type="checkbox" id="updateForm" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
            <h1 className='uppercase text-3xl font-bold my-6'>update data</h1>
                <label for="updateForm" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <form onSubmit={handleSubmit(updateData)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Type here" name='name' className="input input-bordered w-full"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Please write name'
                                }
                            })} />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" placeholder="Type here" name='number' className="input input-bordered w-full"
                            {...register("number", {
                                required: {
                                    value: true,
                                    message: 'Please give number'
                                }
                            })} />
                        <label className="label">
                            {errors.number?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Type here" name='email' className="input input-bordered w-full"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Please write email'
                                }
                            })} />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Hobbies</span>
                        </label>
                        <textarea placeholder="Type here" name='hobbies' className="input input-bordered w-full"
                            {...register("hobbies", {
                                required: {
                                    value: true,
                                    message: 'Please write hobbies'
                                }
                            })} />
                        <label className="label">
                            {errors.hobbies?.type === 'required' && <span className="label-text-alt text-red-500">{errors.hobbies.message}</span>}
                        </label>
                    </div>
 
                     {success &&<div className="label-text-alt my-2 text-green-500">{success}</div> }
                    {error && <div className="label-text-alt my-2 text-red-500">{error}</div>}

                    <button type='submit' className='btn  py-2 px-10 modal-button'>Update</button>
                </form>
            </div>
        </div>

    </div>
    );
};

export default UpdateForm;
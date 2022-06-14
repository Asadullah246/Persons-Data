import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query'
import emailjs from '@emailjs/browser';


const Form = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const submitData = async (data) => {
        // await fetch('http://localhost:5000/persons', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(data => console.log("data", data))
        //     .catch(err => console.log(err))

        const templateParams = {
            name: data.name,
            email: data.email,
            toEmail: "asadullahmd242@gmail.com",
            phone: data.number,
            hobbies: data.hobbies,
        };


       await emailjs.send('service_241zrmv', 'template_u8hhogh', templateParams, 'RfpSlyoQDXNOWTQGE')
            .then((response) => {
                console.log("Message sent successfully")
                // setError("")
            }, (err) => {
                console.log(err);
            })
    }

    return (
        <div>
            {/* <!-- The button to open modal --> */}


            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(submitData)}>
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

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Form;
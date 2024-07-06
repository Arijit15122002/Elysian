import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Authorization.css'


function Authorization ({type}) {

	//Animate Form
	const [ animateForm, setAnimateForm ] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setAnimateForm(true)
		}, 500)
	}, [])


	//Password Visibility
	const [watchPassword, setWatchPassword] = useState(false)
    const [watchConfirmPassword, setWatchConfirmPassword] = useState(false)


	//Form Data
	const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

	//Handling Form Data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

	//Handle Submit
	const handleSubmit = (e) => {

	}

	return (
	<div className='w-[100vw] h-[100vh] flex justify-center items-end '>

		{/* MOBILE VIEW */}
		<div className='w-full h-[calc(100vh-70px)] flex flex-col items-center justify-end'>
			<form action="" className={`backdrop-blur-sm w-full rounded-t-3xl bg-[#232323] flex flex-col items-center justify-center ${animateForm ? 'formShow' : 'formHidden'}`}>

				<div className='w-full h-auto px-6 py-8 text-3xl belanosima text-white'>
					{
						type === 'signup' ? 'Create an Account!' : 'Welcome Back!'
					}
				</div>

				<div className='w-full h-auto px-6 flex flex-col gap-8 items-center justify-center mt-16'>

                    <div className={` ${type === 'signup' ? 'block' : 'hidden'} w-[90%] flex items-center `}>
						<input 
						type="text" 
                        name='fullname'
                        onChange={handleChange}
						className='w-full text-lg px-6 py-3 rounded-xl bg-[#111111] radio relative focus:outline-none  inputAction text-white focus:bg-black duration-300 ease-in-out'/>
						<label className={`${formData?.fullname?.length ? 'opacity-0' : 'opacity-100'} duration-1500 ease-in-out placeholder absolute text-xl radio px-6`}>Full Name</label>
					</div>

					<div className={` ${type === 'signup' ? 'block' : 'hidden'} w-[90%] flex items-center `}>
						<input 
						type="text" 
                        name='username'
                        onChange={handleChange}
						className='w-full text-lg px-6 py-3 rounded-xl bg-[#111111] radio relative focus:outline-none  inputAction text-white focus:bg-black duration-300 ease-in-out'/>
						<label className={`${formData?.username?.length ? 'opacity-0' : 'opacity-100'} placeholder absolute text-xl radio px-6`}>User Name</label>
					</div>

					<div className='w-[90%] flex items-center'>
						<input 
						type="text" 
                        name='email'
                        onChange={handleChange}
						className='w-full text-lg px-6 py-3 rounded-xl bg-[#111111] radio relative focus:outline-none inputAction text-white focus:bg-black duration-300 ease-in-out'/>
						<label className={`${formData?.email?.length ? 'opacity-0' : 'opacity-100'} placeholder absolute text-xl radio px-6`}>Email</label>
					</div>

					<div className='w-[90%] flex items-center'>
						<input 
						type={watchPassword ? 'text' : 'password'} 
                        name='password'
                        onChange={handleChange}
						className='w-full text-xl px-6 py-3 rounded-xl bg-[#111111] radio relative focus:outline-none  inputAction text-white focus:bg-black duration-300 ease-in-out'/>
						<label className={`${formData?.password?.length ? 'opacity-0' : 'opacity-100'} placeholder absolute text-xl radio px-6`}>Password</label>
                        <div
                        onClick={() => setWatchPassword(!watchPassword)} 
						className='w-[42px] h-[45px] mx-2'
                        >
							<div className='w-full h-full relative flex items-center justify-center'>
								<div className={`absolute z-0 h-[65%] w-[50%] bg-white top-1 rounded-t-full flex items-end justify-center ${watchPassword ? '-mt-[5px]' : 'top-0'} duration-300 ease-in-out`}>
									<div className={`w-[72%] h-[92%] rounded-full rounded-b-none bg-[#232323]`}/>
									<div className='absolute w-[10px] h-[15.5px] bg-[#232323] -left-1'/>
								</div>
								<svg className='absolute top-[17px] z-10 bottom-0'
								version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								width="100%" viewBox="0 0 491 296" enable-background="new 0 0 491 296" xml:space="preserve">
									<path fill="white" opacity="1.000000" stroke="none" 
										d="M316.000000,0.999999 
										C330.020905,1.000000 344.041779,1.000000 358.663086,1.363822 
										C360.708618,2.087259 362.141327,2.509461 363.600586,2.797377 
										C404.562195,10.879384 433.105072,44.961704 433.328583,86.674179 
										C433.557007,129.303848 433.523529,171.936371 433.334045,214.566437 
										C433.167999,251.921341 410.617645,283.095886 375.298370,295.510834 
										C374.461212,295.805084 373.763000,296.494751 373.000000,297.000000 
										C284.979095,297.000000 196.958206,297.000000 108.505417,296.633301 
										C106.464081,295.485626 104.896118,294.600830 103.239090,293.939026 
										C71.351807,281.203583 49.827816,250.752457 49.521938,216.397263 
										C49.131706,172.568359 49.049828,128.729172 49.536907,84.902206 
										C49.984425,44.635006 79.081055,10.671506 118.618637,2.891447 
										C120.464996,2.528127 122.208565,1.642419 124.000000,1.000000 
										C138.020889,1.000000 152.041794,1.000000 166.790710,1.335028 
										C168.503845,1.779347 169.488953,1.983919 170.474106,1.984251 
										C217.603256,2.000102 264.732422,2.006765 311.861542,1.956573 
										C313.241364,1.955103 314.620514,1.332823 316.000000,0.999999 M208.276718,156.201996 
										C221.786423,171.517624 241.282837,176.153931 258.881836,168.236023 
										C275.893433,160.582413 286.044220,142.709579 283.780334,124.396301 
										C281.540344,106.276367 268.669678,91.929222 250.923538,87.770363 
										C233.826370,83.763596 215.855301,90.914291 205.971146,105.656929 
										C195.739044,120.918518 196.454315,139.967575 208.276718,156.201996 
									z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M373.468658,297.000000 
										C373.763000,296.494751 374.461212,295.805084 375.298370,295.510834 
										C410.617645,283.095886 433.167999,251.921341 433.334045,214.566437 
										C433.523529,171.936371 433.557007,129.303848 433.328583,86.674179 
										C433.105072,44.961704 404.562195,10.879384 363.600586,2.797377 
										C362.141327,2.509461 360.708618,2.087259 359.131775,1.363822 
										C403.297913,1.000000 447.595856,1.000000 491.946899,1.000000 
										C491.946899,99.552437 491.946899,198.104904 491.946899,297.000000 
										C452.646423,297.000000 413.291870,297.000000 373.468658,297.000000 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M123.531342,1.000000 
										C122.208565,1.642419 120.464996,2.528127 118.618637,2.891447 
										C79.081055,10.671506 49.984425,44.635006 49.536907,84.902206 
										C49.049828,128.729172 49.131706,172.568359 49.521938,216.397263 
										C49.827816,250.752457 71.351807,281.203583 103.239090,293.939026 
										C104.896118,294.600830 106.464081,295.485626 108.036758,296.633301 
										C72.363014,297.000000 36.726028,297.000000 1.044523,297.000000 
										C1.044523,198.445145 1.044523,99.890259 1.044523,1.000000 
										C41.686947,1.000000 82.374817,1.000000 123.531342,1.000000 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M315.531342,0.999999 
										C314.620514,1.332823 313.241364,1.955103 311.861542,1.956573 
										C264.732422,2.006765 217.603256,2.000102 170.474106,1.984251 
										C169.488953,1.983919 168.503845,1.779347 167.259369,1.335028 
										C216.354233,1.000000 265.708466,1.000000 315.531342,0.999999 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M208.062164,155.916412 
										C196.454315,139.967575 195.739044,120.918518 205.971146,105.656929 
										C215.855301,90.914291 233.826370,83.763596 250.923538,87.770363 
										C268.669678,91.929222 281.540344,106.276367 283.780334,124.396301 
										C286.044220,142.709579 275.893433,160.582413 258.881836,168.236023 
										C241.282837,176.153931 221.786423,171.517624 208.062164,155.916412 z"/>
								</svg>
							</div>
                        </div>
					</div>

					<div className={` ${type === 'signup' ? 'block' : 'hidden'} w-[90%] flex items-center `}>
						<input 
						type={ watchConfirmPassword ? "text" : "password"} 
                        name='confirmPassword'
                        onChange={handleChange}
						className='w-full text-xl px-6 py-3 rounded-xl bg-[#111111] radio relative focus:outline-none  inputAction text-white focus:bg-black duration-300 ease-in-out'/>
						<label className={`${formData?.confirmPassword?.length ? 'opacity-0' : 'opacity-100'} placeholder absolute text-xl radio px-6`}>Confirm Password</label>
                        <div
                        onClick={() => setWatchConfirmPassword(!watchConfirmPassword)} 
						className='w-[42px] h-[45px] mx-2'>
							<div className='w-full h-full relative flex items-center justify-center'>
								<div className={`absolute z-0 h-[65%] w-[50%] bg-white top-1 rounded-t-full flex items-end justify-center ${watchConfirmPassword ? '-mt-[5px]' : 'top-0'} duration-300 ease-in-out`}>
									<div className={`w-[72%] h-[92%] rounded-full rounded-b-none bg-[#232323]`}/>
									<div className='absolute w-[10px] h-[15.5px] bg-[#232323] -left-1'/>
								</div>
								<svg className='absolute top-[17px] z-10 bottom-0'
								version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								width="100%" viewBox="0 0 491 296" enable-background="new 0 0 491 296" xml:space="preserve">
									<path fill="white" opacity="1.000000" stroke="none" 
										d="M316.000000,0.999999 
										C330.020905,1.000000 344.041779,1.000000 358.663086,1.363822 
										C360.708618,2.087259 362.141327,2.509461 363.600586,2.797377 
										C404.562195,10.879384 433.105072,44.961704 433.328583,86.674179 
										C433.557007,129.303848 433.523529,171.936371 433.334045,214.566437 
										C433.167999,251.921341 410.617645,283.095886 375.298370,295.510834 
										C374.461212,295.805084 373.763000,296.494751 373.000000,297.000000 
										C284.979095,297.000000 196.958206,297.000000 108.505417,296.633301 
										C106.464081,295.485626 104.896118,294.600830 103.239090,293.939026 
										C71.351807,281.203583 49.827816,250.752457 49.521938,216.397263 
										C49.131706,172.568359 49.049828,128.729172 49.536907,84.902206 
										C49.984425,44.635006 79.081055,10.671506 118.618637,2.891447 
										C120.464996,2.528127 122.208565,1.642419 124.000000,1.000000 
										C138.020889,1.000000 152.041794,1.000000 166.790710,1.335028 
										C168.503845,1.779347 169.488953,1.983919 170.474106,1.984251 
										C217.603256,2.000102 264.732422,2.006765 311.861542,1.956573 
										C313.241364,1.955103 314.620514,1.332823 316.000000,0.999999 M208.276718,156.201996 
										C221.786423,171.517624 241.282837,176.153931 258.881836,168.236023 
										C275.893433,160.582413 286.044220,142.709579 283.780334,124.396301 
										C281.540344,106.276367 268.669678,91.929222 250.923538,87.770363 
										C233.826370,83.763596 215.855301,90.914291 205.971146,105.656929 
										C195.739044,120.918518 196.454315,139.967575 208.276718,156.201996 
									z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M373.468658,297.000000 
										C373.763000,296.494751 374.461212,295.805084 375.298370,295.510834 
										C410.617645,283.095886 433.167999,251.921341 433.334045,214.566437 
										C433.523529,171.936371 433.557007,129.303848 433.328583,86.674179 
										C433.105072,44.961704 404.562195,10.879384 363.600586,2.797377 
										C362.141327,2.509461 360.708618,2.087259 359.131775,1.363822 
										C403.297913,1.000000 447.595856,1.000000 491.946899,1.000000 
										C491.946899,99.552437 491.946899,198.104904 491.946899,297.000000 
										C452.646423,297.000000 413.291870,297.000000 373.468658,297.000000 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M123.531342,1.000000 
										C122.208565,1.642419 120.464996,2.528127 118.618637,2.891447 
										C79.081055,10.671506 49.984425,44.635006 49.536907,84.902206 
										C49.049828,128.729172 49.131706,172.568359 49.521938,216.397263 
										C49.827816,250.752457 71.351807,281.203583 103.239090,293.939026 
										C104.896118,294.600830 106.464081,295.485626 108.036758,296.633301 
										C72.363014,297.000000 36.726028,297.000000 1.044523,297.000000 
										C1.044523,198.445145 1.044523,99.890259 1.044523,1.000000 
										C41.686947,1.000000 82.374817,1.000000 123.531342,1.000000 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M315.531342,0.999999 
										C314.620514,1.332823 313.241364,1.955103 311.861542,1.956573 
										C264.732422,2.006765 217.603256,2.000102 170.474106,1.984251 
										C169.488953,1.983919 168.503845,1.779347 167.259369,1.335028 
										C216.354233,1.000000 265.708466,1.000000 315.531342,0.999999 z"/>
									<path fill="none" opacity="1.000000" stroke="none" 
										d="M208.062164,155.916412 
										C196.454315,139.967575 195.739044,120.918518 205.971146,105.656929 
										C215.855301,90.914291 233.826370,83.763596 250.923538,87.770363 
										C268.669678,91.929222 281.540344,106.276367 283.780334,124.396301 
										C286.044220,142.709579 275.893433,160.582413 258.881836,168.236023 
										C241.282837,176.153931 221.786423,171.517624 208.062164,155.916412 z"/>
								</svg>
							</div>
						</div>
					</div>

				</div>

                <div
				onClick={handleSubmit}
				className=' mt-20 mb-10 dosis font-bold text-2xl bg-white px-8 py-3 rounded-lg shadow-md shadow-black'>
                    {
                        type === 'signup' ? 'Register' : 'Login'
                    }
                </div>

				<div className='w-full flex items-center justify-center'>
					{
						type === 'signup' ? 
						<div className='text-lg text-white flex flex-row py-5 items-center'>
							Already have an account ? 
							<Link to={'/login'} className=' mx-2 px-6 py-2 bg-blue-600 rounded-lg belanosima shadow-md shadow-black/80'>
								Log in
							</Link>
						</div> : 
						<div className='w-full flex flex-col items-center '>
							<div className='w-[80%] flex flex-row items-center gap-2 mb-6'>
								<div className='bg-[#888888] h-[1px] w-[45%]'/>
								<div className='text-[#888888] w-[10%]'>
									OR
								</div>
								<div className='bg-[#888888] h-[1px] w-[45%]'/>
							</div>
							<div className='w-[320px] flex flex-row bg-[#111111] px-6 py-3 justify-center items-center gap-3 rounded-3xl'>
								<div className='text-xl text-white radio'>
									Continue with Google
								</div>
								<div className='p-1 rounded-full bg-white'>
									<svg width="30px" height="30px" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Color-" transform="translate(-401.000000, -860.000000)"><g id="Google" transform="translate(401.000000, 860.000000)"><path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path><path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path><path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path><path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path></g></g></g></svg>
								</div>
							</div>
							<div className='text-lg text-white flex flex-row py-5 items-center'>
								Don't have an account ?
								<Link to={'/signup'} className=' mx-2 px-6 py-2 bg-purple-600 rounded-lg belanosima shadow-md shadow-black/80'>
									Sign up
								</Link>
							</div>
						</div>
					}
				</div>
			</form>
		</div>

	</div>
	)
}

export default Authorization


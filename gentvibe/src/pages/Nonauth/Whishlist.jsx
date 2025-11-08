    import React, { useContext } from 'react'
    import { Wishcontext } from '../../components.jsx/Context/Wishcontext'

    const Whishlist = () => {
        const{whishlist,Togglewhishlist}=useContext(Wishcontext)
    
    return (
        <div>
            <h1 className='text-center font-bold'>Wish list</h1>
            <div >

           
            {
                whishlist.map((item)=>
               ( <div className='bg-white h-1/2 w-70 rounded-2xl shadow-2xl m-5 border'>
                <div>
                    <img src={item.thumbnail} alt="" className='h-65 p-5'/>
                </div>
                <div className='max-w-64 p-5 font-bold leading-8'>
               <h1>Model:{item.title}</h1>
               <h1>price:{item.price}</h1>
               <h1>description:{item.description}</h1>
               <div className='flex justify-center items-center'>
               <button onClick={()=>{Togglewhishlist(item)}} className='bg-black text-white rounded-2xl p-2'>remove</button>
               </div>
               </div>
            
               </div>
            )
                )
            }
             </div>
        </div>
    )
    }

    export default Whishlist
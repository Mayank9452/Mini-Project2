import React from 'react';
import Card from './Card';
//redux
import { useSelector } from "react-redux";

 const AdminBody = () =>  {
     const {products} = useSelector(state => state.products);
     return (
         <div className='container'>
             <div className='row'>
                 <div className='card-deck'>
                     {products && products.map(product => (
                         <div>
                             <Card key={product._id} product={product} />
                         </div>
                     ))}
                 </div>
             </div>
         </div>
     );
 }

 export default AdminBody;
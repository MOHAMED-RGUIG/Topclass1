import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';

export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addtocart() {
    const selectedQuantity = parseInt(quantity, 10) || 1;
    dispatch(addToCart(product, selectedQuantity, isChecked));
    toast.success('Le produit est ajouté à la carte!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false
    });
  }
  const [imageSrc, setImageSrc] = useState('./greenheart.png');
  
  const handleClick = () => {
    setImageSrc(prevSrc => prevSrc === './greenheart.png' ? './heart1.png' : './greenheart.png');
    addtocart();
  };
const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};
  const calculatedPrice = isChecked ? 0 : product.PRI_0 * quantity;
  const isMachineCategory = ['MACHINES','MACHINE A MODO MIO','FONTAINE','MACHINE BOUTIQUE','GUZZINI','MACHINE ESPRESSO','MACHINE FIRMA','MOULIN','FONTAINE'].includes(product.Designation_Famille_Stat1);
  const isMachineGrain = ['Nos Grains','Nos Promos','Capsules Lavazza Firma','Capsules Lavazza Blue'].includes(product.Designation_Famille_Stat1)
  return (
 
  <div className='mt-1 col-12 col-md-12 cart-product'>         
    <div style={{ backgroundColor: '#f3f3f3', borderTop: '0px solid #ffffff', width:'100%', padding:'0px !important' }} className='shop-card bg-body d-flex align-items-center'>
      
      <div style={{ width: '20%' }} onClick={handleShow}>
        <img src={product.Image} alt='product' className='img' style={{ height: '70px', width: '50px', overflow:'hidden', backgroundColor:'#f3f3f3 !important' }} />
      </div>
  
      <div className="product-tag1 d-flex align-items-center justify-content-between" style={{ width: '80%' }}>
        <div >        <h3 className='pt-2 text-start block' style={{ fontSize:'12px',color:'#1b6cfc', width:'30%' }}>{product.ITMREF_0}</h3>
        <h6 className='text-start' style={{ fontSize:'7px',color:'black',paddingRight:'45px' }}>{product.ITMDES1_0}</h6>
</div>
       
      
        
        <div className='flex-container check product-quantity text-start mt-3' >
          <input
            type='number'
            className='form-control'
            style={{ width: '35px' ,marginRight:'8px'}}  
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) {
                setQuantity('');
              } else {
                setQuantity(Math.max(value, 1));
              }
            }} 
            min={1} 
          />  
         
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className=''
             
            />  <label className='grat-title mx-1 px-0' style={{ fontSize: '8px',paddingTop:'20px'}}>{isMachineCategory ? 'Dépots?' : ' Gratuit?'}
          </label> 
        </div>
  
        <div className='product-price mt-4' style={{ width: '160px' ,color:'black',fontSize:'9px',paddingTop:'10px'}}>
          <h6 style={{ color:'#1b6cfc',fontSize:'10px'}}>{calculatedPrice} DH TTC</h6>
        </div>
        <div className="product-tag1 justify-content-end mt-4">
              <img 
      src={imageSrc} 
      alt='ADD' 
      style={{ height: '18px', cursor: 'pointer',width:'18px' }} 
      onClick={handleClick} 
    />
							</div> 
      </div> 
  
    </div>    
  </div>
  );
}

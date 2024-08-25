import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts,getAllImgProducts } from '../actions/productAction';
import Product from '../components/product';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import feather from 'feather-icons';





export default function Homescreen() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(state => state.products);
  const { imgProducts = [] } = useSelector(state => state.imgProducts); 
  React.useEffect(() => {
    feather.replace();
  }, []);
  // Filtre
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('CAFE GRAIN');

  // Get products
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllImgProducts());
  }, [dispatch]);
// Get products img

const productsWithImages = products.map(product => {

  // Debug line
  const imgProduct = imgProducts.find(img => img.Reference === product.ITMREF_0);

  return {
      ...product,
      Image: imgProduct ? imgProduct.Image : '/defaultImage.png' // Use a default image if not found
  };
});
  // Filtre
  const filteredProducts = productsWithImages.filter(product => {
    const matchesName = product.ITMDES1_0.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCode = product.ITMREF_0.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategorie = selectedCategorie ? product['Designation_Famille_Stat1'] === selectedCategorie : true;
    return  matchesCategorie && (matchesCode ||matchesName );
  });

  const handleCategoryChange = (Designation_Famille_Stat1) => {
    setSelectedCategorie(Designation_Famille_Stat1);
  };

  // Add "All" to the list of categories
  const categories = ['All', ...new Set(products.map(product => product.Designation_Famille_Stat1))];

  const renderCustomButtons = (categories) => {
    const chunkSize = 4; // Number of buttons per slide
    const chunks = [];
    for (let i = 0; i < categories.length; i += chunkSize) {
      chunks.push(categories.slice(i, i + chunkSize));
    }
    return chunks.map((chunk, index) => (
      <div key={index} className="category-slide col-12 col-md-12">
        {chunk.map((Designation_Famille_Stat1) => (
          <button
            key={Designation_Famille_Stat1}
            className={`category-btn text-truncate ${selectedCategorie === Designation_Famille_Stat1 || (Designation_Famille_Stat1 === 'All' && selectedCategorie === '') ? 'active' : ''} col-xs-3 col-3 col-md-3`}
            onClick={() => handleCategoryChange(Designation_Famille_Stat1 === 'All' ? '' : Designation_Famille_Stat1)}
          >
            {Designation_Famille_Stat1}
          </button>
        ))}
      </div>
    ));
  };

  console.log("Products:", products);
  console.log("Filtered Products:", filteredProducts);

  return (
    <div>
     <div className="col-12 col-md-12">
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          interval={5000} // 5 secondes entre chaque transition
          transitionTime={1800} // 1 seconde pour la durée de la transition
          showIndicators={true}
          showStatus={false}
          autoPlay
         
        >
          <div>
            <img src="/lavazza1.png" alt="Lavazza" />
          </div>
          <div>
            <img src="/lavazza2.png" alt="Lavazza" />
          </div>
          <div>
            <img src="/lavazza3.png" alt="Lavazza" />
          </div>
        </Carousel>
      </div>

 
      <div className="category-buttons col-xs-12 col-12 col-md-12 col-xl-10 mt-2">
        <Carousel 
          showThumbs={false} 
          infiniteLoop 
          useKeyboardArrows 
          interval={1000} // Time between transitions in milliseconds (5 seconds)
          transitionTime={200} // Duration of the transition animation in milliseconds (1 second)
          showIndicators={false} 
          showStatus={false}
          className="col-xs-12 col-12 col-md-12 col-xl-10"
        >
          {renderCustomButtons(categories)}
        </Carousel>
      </div>
      <div className='search-bar col-11 col-xl-11 col-md-11 text-center'>
        <input
          className="form-control text-center"
          id="search-input"
          type='search'
          placeholder='Rechercher...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='row justify-content-center col-xl-12 col-md-12 col-12 mx-auto'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error='Something went wrong' />
        ) : (
          
          filteredProducts.map((product) => (
            <div key={product.ITMREF_0} className='col-6 col-md-6 px-1'>
              <Product product={product}/>
            </div>
          ))
        )}
       <footer className="menubar-area footer-fixed bg-light mt-1">
      <div className="toolbar-inner menubar-nav d-flex justify-content-around">
      <a href="/orders" className="nav-link">
          <i className="bi bi-grid  row  justify-content-center m-3"></i>
          <span>Commandes</span>
        </a>
        <a href="/homescreen" className="nav-link active">
          <i className="bi bi-house-door row justify-content-center m-3" ></i>
          <span >Acceuil</span>
        </a>
     
        <a href="/cart" className="nav-link">
          <i className="bi bi-heart   row   justify-content-center m-3"></i>
          <span>Panier</span>
        </a>
      </div>
    </footer>  
      </div>
     
    </div>
  );
}

import React, { useEffect, useState } from "react";
import PreviewCard from "../components/PreviewCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Preview = () => {
  
  const { id } = useParams();
  const shoeId = id;
  const [shoeApi, setShoeApi] = useState();
  
  useEffect(() => {
    
    const productByIdFetch = async () => {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_SERVER_HOST_API}/product/${shoeId}`
        );
        setShoeApi(response.data);
        
       }
      catch (error) {
        console.error('call api productById fail', error)
      }
    }
    productByIdFetch();
 },[shoeId])
  
  console.log("preview sneakers", shoeApi);
  
  /* const filteredItems = shoeApi.filter(
      (s) => s.retail_price_cents !== null && s.story_html !== null
  );

  const qtyUpdate = filteredItems.map((item) => {
    return { ...item, qty: 1 };
  });

  const items = qtyUpdate.filter((item) => item.id === shoeId);
  const shoe = items[0]; */

  return (
      <div className="">
          <PreviewCard shoe={shoeApi} />
      </div>
  );
};

export default Preview;

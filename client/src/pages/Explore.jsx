import React, { useEffect, useState } from "react";
import Card from "../components/Card";
//import { data } from "../assets/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../redux/slices/SearchSlice";

const Explore = () => {
    const dispatch = useDispatch()
    const [apiProduct, setApiProduct] = useState([]);
    const searchInfo = useSelector((state) => state.search);
   // console.log("searchInfo", searchInfo);
    

    useEffect(() => {
        //console.log("useEffect is running");
        const fetchProduct = async () => {
            try {
                const product = await axios.get(
                    import.meta.env.VITE_APP_SERVER_HOST_API + "/product"
                );
                setApiProduct(product.data.products);
                if (searchInfo.search) {
                    const filteredProducts = product.data.products.filter(
                        (item) =>
                            item.name
                                .toLowerCase()
                                .includes(searchInfo.search.toLowerCase())
                    );
                    dispatch(setSearchResults(filteredProducts));
                }
            } catch (error) {
                console.error("call aip err", error);
            }
        };
        fetchProduct();
    }, [dispatch, searchInfo.search]);

    /* const filteredItems = apiProduct.filter(
        (s) =>
            s.retail_price_cents !== null &&
            s.story_html !== null
        
            
    );

    const items = filteredItems.map((item) => {
        return { ...item, qty: 1 };
    }); */
const itemsToDisplay = searchInfo.search
    ? searchInfo.searchResults
    : apiProduct.filter(
          (s) => s.retail_price_cents !== null && s.story_html !== null
      );

const items = itemsToDisplay.map((item) => {
    return { ...item, qty: 1 };
});
    
    return (
        <div className="">
            <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10mx-auto ">
                {items.map((shoe, idx) => (
                    <Card key={shoe.id} shoe={shoe} />
                ))}
            </div>
        </div>
    );
};

export default Explore;

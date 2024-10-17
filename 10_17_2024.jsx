import React from "react";
import { useState, useEffect } from 'react'
import "./styles.css";
import { getStoreFeed } from './api.js';

export default function App() {
  const [groceryItems, setGroceryItems] = useState();

  useEffect(() => {
    getStoreFeed().then((res) => {
      setGroceryItems(res);
    }).catch(err => console.log(err))

  }, []);

  let itemsPerCategory = {};

  if (groceryItems) {
    groceryItems.forEach(groceryItem => {
        let category = groceryItem.category.name;
      if (itemsPerCategory[category]) {
        itemsPerCategory[category].push(groceryItem);
      } else {
        itemsPerCategory[category] = [groceryItem];
      }
    })

  }

  return (
    <div>
      { Object.keys(itemsPerCategory).map(category => {
        return <div><h3>{category}</h3>
          <div className='inlineItems'>
            {itemsPerCategory[category].map(item => {
              return <div className='productCard'>
                <img src={item.imageUrl} className='productImage'></img>
                <br />
                <b>{item.title.toUpperCase()}</b>
                <br />
                {item.hasDiscount === 'no' || item.hasDiscount === '' ?
                  <span>
                    {item.priceInCents / 100} $
                  </span>
                  :
                  <div>
                    <span className="strikeThrough">
                      {item.priceInCents / 100} $
                    </span>
                    <span>
                      {item.discountedPrice / 100} $
                    </span>
                  </div>
                }
              </div>
            }
            )}
          </div>
        </div>
      })}
    </div>
  )
}
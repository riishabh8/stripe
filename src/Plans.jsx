import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./plans.css";
export default function Plans() {
  // const []

  const [product, setProduct] = useState({
    name: "Weekly subscription plan",
    price: 49,
    productBy: "amazon",
  });
  const [product1, setProduct1] = useState({
    name: "Monthly subscription plan",
    price: 129,
    productBy: "amazon",
  });
  const [product2, setProduct2] = useState({
    name: "Basic subscription plan",
    price: 1339,
    productBy: "amazon",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`/api/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div>
      <img
        src="https://amazonprime-clone.netlify.app/static/media/Primelogo.f29008c018626f7405ee4614ab72e6b6.svg"
        alt="prime" className="prime-img"
      />
      <div className="parentCard">
        <div className="container--card">
          <h2>Monthly Plan</h2>
          <h3>₹{product.price}</h3>
          <p>Unlimited movies and tv</p>
          <p></p>
          <p></p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment}
            name="Buy Subscription"
            amount={product.price * 100}
            shippingAddress
          >
            <button className="view--plan">Get a subscription</button>
          </StripeCheckout>
        </div>
        <div className="container--card">
          <h2>Monthly Plan</h2>
          <h3>₹{product1.price}</h3>
          <p>Unlimited movies and tv</p>
          <p>Free 2 day shipping</p>
          <p></p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment}
            name="Buy Subscription"
            amount={product1.price * 100}
            shippingAddress
          >
            <button className="view--plan">Get a subscription</button>
          </StripeCheckout>
        </div>
        <div className="container--card">
          <h2>Monthly Plan</h2>
          <h3>₹{product2.price}</h3>
          <p>Unlimited movies and tv</p>
          <p>Free 2 day shipping</p>
          <p>Unlimited music streaming</p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment}
            name="Buy Subscription"
            amount={product2.price * 100}
            shippingAddress
          >
            <button className="view--plan">Get a subscription</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}

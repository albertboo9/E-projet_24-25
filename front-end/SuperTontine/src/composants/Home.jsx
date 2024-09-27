import React from 'react'
import '../styles/Home.css'

export default function Home() {
  return (
    <div>
      <div className='info'>
      <div className=' card balance'>

      <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">wallet</h3>
            <button className="grid-c-title-icon">
               
            </button>
        </div>
        <div className="grid-c1-content">
            <p>Balance</p>
            <div className="lg-value">$ 22,000</div>
            <div className="card-wrapper">
                <span className="card-pin-hidden">**** **** **** </span>
                <span>1234</span>
            </div>
            <div className="card-logo-wrapper">

                <div className="card-logo">
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                </div>
            </div>
        </div>
    </div>

      </div>
      <div className=' card Transaction'>

      </div>
      <div className=' card gestion'>

      </div>
      </div>

    </div>
  )
}

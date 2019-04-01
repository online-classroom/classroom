import React,{memo} from 'react'
import './Footer.scss'

function Footer() {
  return (
    <div className='footer-container'>
      <div>
          <span className='footer-title'>ClassCast&ensp;|&ensp;2019</span>
      </div>
    </div>
  )
}

export default memo(Footer)

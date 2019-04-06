import React,{memo} from 'react'
import CircleLoader from 'react-spinners/CircleLoader';

const Loader = (props) => {
    return(
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircleLoader
          sizeUnit={"px"}
          size={props.size}
          color={'#14BF96'}
          loading={true}
        />
        </div>
    )
}

export default memo(Loader);
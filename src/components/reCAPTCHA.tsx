import { request } from 'https';
import * as React from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
// import requestStore from '../store/requestStore';

const Recaptcha: React.FC = () => {
    function onChange(value: any) {
     
        // console.log('Captcha value:', value);
        // debugger;
        // if(value){
        //     requestStore.robot=true;
        // }

    }
    return (
        <div className="App">
            {/* <ReCAPTCHA
                sitekey=""
                onChange={onChange}
            /> */}
        </div>
    );
};
export default Recaptcha;
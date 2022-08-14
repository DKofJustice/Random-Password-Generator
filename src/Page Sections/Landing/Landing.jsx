import React, { useState } from 'react';

import RockLogo from './../../Assets/Icons/Rock Logo.svg';

import AsteriskBkg from './../../Assets/Images/Asterisk Background.svg';
import ReloadIcon from './../../Assets/Icons/Reload-icon.svg';
import MinusIcon from './../../Assets/Icons/akar-icons_minus.svg';
import PlusIcon from './../../Assets/Icons/akar-icons_plus.svg';
import LockAndKey from './../../Assets/Images/Lock and Key Graphic.svg';

export default function Landing() {

  //Set Password Length
  const [passwordLengthValue, setPasswordLengthValue] = useState('25');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('STRONG');
  const [password, setPassword] = useState('3BQ4rR2uOnLQ');
  const [passwordCopied, setPasswordCopied] = useState('');

  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialchars: true
  });

  const handleCheckbox = e => {
    setCheckbox({...checkbox, [e.target.name]: e.target.checked});
  }


  // Get the password length from the slider

  const getPasswordLegth = (e) => {
    setPasswordLengthValue(e.target.value);
  };

  //Generator Functions
  const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };
  
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };
  
  function getRandomSymbol() {
    const symbols = '!@#$%^&*()-_=+[]{},.<>/?';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  //Password set function

  const generatePassword = () => {

    let initialPassword = '';

    let checkedCharSet = {};

    if(checkbox.uppercase === true) {
      checkedCharSet['upper'] = randomFunctions['upper'];
    }
    if(checkbox.lowercase === true) {
      checkedCharSet['lower'] = randomFunctions['lower'];
    }
    if(checkbox.numbers === true) {
      checkedCharSet['number'] = randomFunctions['number'];
    }
    if(checkbox.specialchars === true) {
      checkedCharSet['symbol'] = randomFunctions['symbol'];
    }
    let checkedKeys = Object.keys(checkedCharSet);

    console.log(checkedKeys)

    if(checkedKeys.length === 0) {
      console.log('no character set selected');
      setPasswordError('error-active')
    } else {
      setPasswordError('');
      for (let i = 0; i < passwordLengthValue; i++) {
        const passwordChar = randomFunctions[checkedKeys[Math.floor(Math.random() * checkedKeys.length)]]();
  
        initialPassword += passwordChar;
      }
      setPassword(initialPassword);

      if (passwordLengthValue < 12) {
        setPasswordStrength('WEAK');
      } else {
        setPasswordStrength('STRONG');
      }
    }
  };


  //Copy Password to clipboard

  const copyPassword = () => {
    navigator.clipboard.writeText(password);

    let seconds = 0;

    setPasswordCopied('password-copied-active');

    let notificationTimer = setInterval(() => {
      setPasswordCopied('');
      seconds++;
      console.log(seconds);

      if (seconds === 1) {
        clearInterval(notificationTimer);
        console.log('interval cleared')
      }
    }, 2000);
  }


  return (
    <section className='landing-section'>

      <header>
        <img src={RockLogo} alt="rock-logo" />
      </header>

      <div className='landing-bkg-image'>
        <img src={AsteriskBkg} alt="asterisk-bkg" />
      </div>

      <div className='landing-content'>
        <h1>Random Password Generator</h1>

        <p>Keep your online activity safe with strong and unique passwords</p>

        <div className='lock-and-key'>
          <img src={LockAndKey} alt="lock-and-key" />
        </div>

        <span className={`password-copied ${passwordCopied}`}>
          Password has been copied
        </span>

        <div className='password-panel'>
          <div className='password-panel-row-1'>

            <div className='password-input'>
              <span className='password'>{password}</span>
              <span className={`password-strength ${passwordStrength === 'STRONG' ? 'strong-password' 
              : 'weak-password'}`}>
                {passwordStrength}
              </span>
            </div>
            
            <span className='reload-password' onClick={generatePassword}>
              <img src={ReloadIcon} alt="reload-icon" />
            </span>

            <span className='copy-password' onClick={copyPassword}>
              COPY
            </span>

            <span className={`password-error ${passwordError}`}>Password cannot be generated without at least one character set</span>

          </div>

          <div className='password-panel-row-2'>
            <div className='password-length'>
              <p>Password Length:</p>
              <span className='password-count'>{passwordLengthValue}</span>
            </div>

            <div className='password-slider-container'>
              <img src={MinusIcon} alt="minus-icon" />

               <input type="range" min="1" max="50" defaultValue={passwordLengthValue}
               name="password-slider" id="password-slider" onChange={getPasswordLegth}/>

              <img src={PlusIcon} alt="" />
            </div>
          </div>

          <div className='password-panel-row-3'>
              <div className='checkbox uppercase-checkbox'>
                <input type="checkbox" name="uppercase" id="uppercase" defaultChecked 
                onChange={handleCheckbox} value={checkbox.uppercase}/>
                <label htmlFor="uppercase">ABC</label>
              </div>

              <div className='checkbox lowercase-checkbox'>
                <input type="checkbox" name="lowercase" id="lowercase" defaultChecked 
                onChange={handleCheckbox} value={checkbox.lowercase} />
                <label htmlFor="lowercase">abc</label>
              </div>

              <div className='checkbox numbers-checkbox'>
                <input type="checkbox" name="numbers" id="numbers" defaultChecked 
                onChange={handleCheckbox} value={checkbox.numbers} />
                <label htmlFor="numbers">123</label>
              </div>

              <div className='checkbox special-chars-checkbox'>
                <input type="checkbox" name="specialchars" id="special-chars" defaultChecked 
                onChange={handleCheckbox} value={checkbox.specialchars} />
                <label htmlFor="special-chars">#%$</label>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

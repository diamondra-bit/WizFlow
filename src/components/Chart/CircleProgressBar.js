import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function CircleProgressBar({percentage}) {
    const getDarkModeAttribute = () => {
        const body = document.querySelector('body');
        const dataThemeValue = body.getAttribute('data-theme');
        return dataThemeValue;
      };

      const darkModeAttribute = getDarkModeAttribute();
      let pathColor;
      let textColor;

      const styles = darkModeAttribute === "dark"
      ? { pathColor: 'rgba(5, 175, 180)', textColor: '#e3eff0' }
      : { pathColor: 'rgba(35, 175, 180, 0.4)', textColor: '#053f5c' };
    

      
  return (
    <>
 <div className="progressbar">

      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '25px',
          pathColor: styles.pathColor,
          textColor: styles.textColor,
          trailColor: '#e3eff0',
        })}
      />
    </div>
    </>
  )
}

export default CircleProgressBar
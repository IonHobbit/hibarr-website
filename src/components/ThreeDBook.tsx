'use client'

import { useEffect } from 'react'

export default function ThreeDBook() {
  useEffect(() => {
    const bookSection = document.querySelector('.book_three_d');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.visibility = 'visible';
          observer.unobserve(entry.target);
        }
      });
    });

    if (bookSection) {
      observer.observe(bookSection);
    }

    return () => {
      if (bookSection) {
        observer.unobserve(bookSection);
      }
    }
  }, []);

  return (
    <div>
      <style jsx>{`
        .book_three_d {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          -webkit-perspective: 1000px;
        }
        .book-container {
          position: relative;
          transform-style: preserve-3d;
          transform-origin: center top;
          animation: rotateBook 10s linear infinite;
          -webkit-transform-style: preserve-3d;
          -webkit-transform-origin: center top;
          -webkit-animation: rotateBook 10s linear infinite;
        }
        .book-container::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 30px;
          background: rgba(0,0,0,.3);
          filter: blur(20px);
          bottom: -20px;
          left: 50%;
          transform: translateX(20%) rotateY(90deg);
          z-index: -17;
        }
        .book-container, .book {
          will-change: transform;
        }
        .book {
          position: relative;
          width: 200px;
          height: 300px;
          transform-style: preserve-3d;
          transform: rotateZ(-20deg);
        }
        .front-cover, .back-cover, .spine, .top-edge, .bottom-edge, .front-edge {
          position: absolute;
          border: 2px solid #053160;
        }
        .front-cover {
          width: 100%;
          height: 100%;
          transform: translateZ(17px);
          background: url(https://hibarr.de/wp-content/uploads/2025/03/Ultimate-Cyprus-Real-Estate-Investment-Guide-front-1.webp) center center/cover no-repeat;
        }
        .back-cover {
          width: 100%;
          height: 100%;
          transform: translateZ(-17px) rotateY(180deg);
          background: url(https://hibarr.de/wp-content/uploads/2025/03/back-1.webp) center center/cover no-repeat;
        }
        .spine {
          width: 34px;
          height: 300px;
          transform: rotateY(90deg) translateZ(-17px) rotateX(180deg);
          background: url(https://hibarr.de/wp-content/uploads/2025/03/Ultimate-Cyprus-Real-Estate-Investment-Guide-spine-3-1.webp) center center/cover no-repeat;
        }
        .top-edge, .bottom-edge {
          width: 100%;
          height: 34px;
          background: url(https://s3-ap-southeast-2.amazonaws.com/mephystoprojects/alice/paper-horizontal.jpg) center center/cover no-repeat;
          border: none;
        }
        .top-edge {
          transform: translateY(-16px) rotateX(90deg);
        }
        .bottom-edge {
          transform: translateY(282.5px) rotateX(-90deg);
        }
        .front-edge {
          width: 34px;
          height: 300px;
          background: url(https://s3-ap-southeast-2.amazonaws.com/mephystoprojects/alice/paper.jpg) center center/cover no-repeat;
          transform: translateX(183px) rotateY(90deg);
        }
        .string {
          position: absolute;
          width: 2px;
          height: 150px;
          background-color: transparent;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
        }
        @keyframes rotateBook {
          0% {
            transform: rotateY(0deg);
            -webkit-transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
            -webkit-transform: rotateY(360deg);
          }
        }
      `}</style>

      <div className="book_three_d">
        <div className="book-container">
          <div className="string"></div>
          <div className="book">
            <div className="front-cover"></div>
            <div className="back-cover"></div>
            <div className="spine"></div>
            <div className="top-edge"></div>
            <div className="bottom-edge"></div>
            <div className="front-edge"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

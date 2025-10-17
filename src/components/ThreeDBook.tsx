'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

interface ThreeDBookProps {
  scale?: number
}

export default function ThreeDBook({ scale = 0.67 }: ThreeDBookProps) {
  const params = useParams()
  const lang = (params.lang as string) || 'en'

  const englishCover = 'https://res.cloudinary.com/hibarr/image/upload/v1748844872/Ultimate-Cyprus-Real-Estate-Investment-Guide-front-1_zakdkj.webp'
  const germanCover = 'https://res.cloudinary.com/hibarr/image/upload/v1760603287/Ultimate_Cyprus_Real_Estate_Investment_Guide_2025.png_wzokuz.webp'

  const englishSpine = 'https://res.cloudinary.com/hibarr/image/upload/v1748844872/Ultimate-Cyprus-Real-Estate-Investment-Guide-spine-3-1_ajz4ow.webp'
  const germanSpine = 'https://res.cloudinary.com/hibarr/image/upload/v1760603287/Ultimate_Cyprus_Real_Estate_Investment_Guide_2025.png_wzokuz.webp'

  // Use German cover when language is German, otherwise use English cover
  const frontCoverUrl = {
    en: englishCover,
    de: germanCover,
  }[lang] || englishCover

  const spineUrl = {
    en: englishSpine,
    de: germanSpine,
  }[lang] || englishSpine

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
          --book-scale: ${scale};
        }
        
        @media (max-width: 768px) {
          .book_three_d {
            --book-scale: 1;
          }
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
        // .book-container::after {
        //   content: "";
        //   position: absolute;
        //   width: calc(150px * var(--book-scale));
        //   height: calc(45px * var(--book-scale));
        //   background: rgba(0,0,0,.3);
        //   filter: blur(20px);
        //   bottom: calc(-30px * var(--book-scale));
        //   left: 50%;
        //   transform: translateX(20%) rotateY(90deg);
        //   z-index: calc(-25 * var(--book-scale));
        // }
        .book-container, .book {
          will-change: transform;
        }
        .book {
          position: relative;
          width: calc(300px * var(--book-scale));
          height: calc(450px * var(--book-scale));
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
          transform: translateZ(calc(25px * var(--book-scale)));
          background: url(${frontCoverUrl}) center center/cover no-repeat;
        }
        .back-cover {
          width: 100%;
          height: 100%;
          transform: translateZ(calc(-25px * var(--book-scale))) rotateY(180deg);
          background: url(https://res.cloudinary.com/hibarr/image/upload/v1748844871/back-1_zwo4ds.webp) center center/cover no-repeat;
        }
        .spine {
          width: calc(51px * var(--book-scale));
          height: calc(450px * var(--book-scale));
          transform: rotateY(90deg) translateZ(calc(-25px * var(--book-scale))) rotateX(180deg);
          background: url(${spineUrl}) center center/cover no-repeat;
        }
        .top-edge, .bottom-edge {
          width: 100%;
          height: calc(51px * var(--book-scale));
          background: url(https://s3-ap-southeast-2.amazonaws.com/mephystoprojects/alice/paper-horizontal.jpg) center center/cover no-repeat;
          border: none;
        }
        .top-edge {
          transform: translateY(calc(-24px * var(--book-scale))) rotateX(90deg);
        }
        .bottom-edge {
          transform: translateY(calc(423.5px * var(--book-scale))) rotateX(-90deg);
        }
        .front-edge {
          width: calc(51px * var(--book-scale));
          height: calc(450px * var(--book-scale));
          background: url(https://s3-ap-southeast-2.amazonaws.com/mephystoprojects/alice/paper.jpg) center center/cover no-repeat;
          transform: translateX(calc(274px * var(--book-scale))) rotateY(90deg);
        }
        .string {
          position: absolute;
          width: 2px;
          height: calc(225px * var(--book-scale));
          background-color: transparent;
          top: calc(-225px * var(--book-scale));
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

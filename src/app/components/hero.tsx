
import Header from "./header";
import HeroCarousel from "./heroCarousel";
// import styled from "styled-components";


const HeroSection = () => {
    // const videoWidth = Math.max(window.innerWidth / 2.4, 460);
    // const textWidth = Math.max(460, window.innerWidth - videoWidth - 60);
    // const sectionHeight = Math.max(Math.min(window.innerWidth / 2.6 / 9 * 16 - 16, 720), 600);
  
    return (
      <section className="relative w-full h-screen flex items-center justify-center">
        <Header/>
      
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/landing_bg.jpg" 
        className="absolute right-0 top-0 h-full w-2/3 object-cover"
      >
        <source 
        src=
        // "https://firebasestorage.googleapis.com/v0/b/voo-platform.appspot.com/o/assets%2Fslow.mp4?alt=media&token=09d8ecbe-8ebb-4239-8255-6039c9ce727a"
        "/videos/landing_bg.mp4" 
        type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black via-[33%] to-black/50 to-[70%]"></div>


      <HeroCarousel/>
      {/* Hero Content */}
      {/* <div className="absolute left-8 sm:left-32 top-1/2 -translate-y-1/2 pl-0 w-[90%] sm:w-1/3 sm:min-w-[500px] text-white drop-shadow-md"> */}
          {/* <h1 className="text-5xl font-bold mb-6">
            Transform Your Everyday Life
          </h1>
          <p className="text-xl mb-8">
            Find reliable help for any task—coaching, cleaning, repairs, and more.
          </p>
          <div className="flex gap-4">
            <a href="#services" className="bg-green-600 px-6 py-3 rounded-full text-lg hover:bg-green-500">
              Explore Services
            </a>
            <a href="#join" className="border-2 border-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-green-600">
              Join as a Helper
            </a>
          </div> */}
          
          {/* <h1 className="text-white text-5xl font-bold">
          Turn Your Skills into a Thriving Business.
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          From scheduling to payments—run your service business without the hassle.
          Voo makes it easy for freelancers and service providers to stay organized, 
          find clients, and get paid—effortlessly.
        </p> */}

        {/* Optional Tagline for Extra Impact */}
        {/* <p className="text-gray-400 italic mt-2 mb-16 text-md">
          Your passion. Your hustle. Your business—simplified.
        </p>
        
        <AppEntry text={'Browse the Services Now'}
        playLink={'https://play.google.com/store/apps/details?id=dev.voo.providers'} 
        appleLink={'https://apps.apple.com/us/app/百事通-voo/id6745773650'}
        isPvd={false}
        />

        <AppEntry text={'Become a Helper'}
        playLink={'https://play.google.com/store/apps/details?id=dev.voo.providers'} 
        appleLink={'https://apps.apple.com/us/app/voo-pro-百事通店商/id6740048998'}
        isPvd
        />
      </div> */}
      
    </section>
    );
  };
  
  export default HeroSection;
  
  // Styled components
  
  // const Container = styled.div`
  //   position: relative;
  //   overflow: hidden;
  //   background-color: black;
  // `;
  
  // const VideoContainer = styled.div`
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   width: 50%;
  //   height: 100%;
  //   z-index: -1;
  // `;
  
  // const VideoBg = styled.video`
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // `;
  
  // interface OverlayProps {
  //   videoWidth: number;
  // }

  // const Overlay = styled.div<OverlayProps>`
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   height: 100%;
  //   background: linear-gradient(
  //     to right,
  //     rgba(0, 0, 0, 1) 0%,
  //     rgba(0, 0, 0, 0.5) 100%
  //   );
  //   z-index: 1;
  //   clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  // `;
  
  // interface TextContainerProps {
  //   videoWidth: number;
  //   textWidth: number;
  // }
  // const TextContainer = styled.div<TextContainerProps>`
  //   position: absolute;
  //   top: 40px;
  //   left: ${(props) => Math.max(60, (window.innerWidth - props.videoWidth - props.textWidth) / 2)}px;
  //   width: ${(props) => Math.min(props.textWidth, 780)}px;
  //   padding: 0 32px;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  // `;
  
  // const Heading = styled.h1`
  //   color: white;
  //   font-size: 2.5rem;
  //   margin-bottom: 20px;
  // `;
  
  // const Subheading = styled.p`
  //   color: white;
  //   font-size: 1.25rem;
  //   margin-bottom: 30px;
  // `;
  
  // const ButtonContainer = styled.div`
  //   display: flex;
  //   gap: 20px;
  // `;
  
  // const MainButton = styled.button`
  //   background-color: white;
  //   color: black;
  //   padding: 20px 30px;
  //   font-weight: bold;
  //   border: none;
  //   cursor: pointer;
  // `;
  
  // const SecondaryButton = styled.button`
  //   background-color: transparent;
  //   color: white;
  //   padding: 20px 30px;
  //   border: 2px solid white;
  //   font-weight: bold;
  //   cursor: pointer;
  // `;
  
  // const AppStoreButtons = styled.div`
  //   display: flex;
  //   gap: 16px;
  //   margin-top: 70px;
  // `;
  
  // const AppStoreButton = styled.button`
  //   display: flex;
  //   align-items: center;
  //   padding: 16px 20px;
  //   background-color: lightgray;
  //   border-radius: 12px;
  //   border: 1px solid darkgray;
  //   color: black;
  //   cursor: pointer;
  // `;
  
  // const PlayStoreIcon = styled.img`
  //   width: 30px;
  //   margin-right: 12px;
  // `;
  
  // const AppleIcon = styled.div`
  //   width: 30px;
  //   height: 30px;
  //   background-color: gray;
  //   margin-right: 12px;
  // `;


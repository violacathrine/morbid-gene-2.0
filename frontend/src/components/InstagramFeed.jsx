import styled from "styled-components";
import { FaInstagram, FaPlay } from "react-icons/fa";

const FeedContainer = styled.section`
  background: #000;
  padding: 3rem 1rem;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const FeedTitle = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const InstagramHandle = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 2rem;
  display: inline-block;
  transition: color 0.2s;
  
  &:hover {
    color: #9ca3af;
  }
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ImageGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const ImageLink = styled.a`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #1a1a1a;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
    z-index: 1;
    
    &::after {
      opacity: 1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.4));
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

const InstagramImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 2;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 3rem;
`;

export const InstagramFeed = () => {
  // Real Instagram data from behold.io
  const instagramData = {
    posts: [
      {
        id: "18056736512621615",
        permalink: "https://www.instagram.com/reel/DNl8nxOCD-X/",
        mediaType: "VIDEO",
        thumbnailUrl: "https://scontent-sof1-2.cdninstagram.com/v/t51.71878-15/535765604_3228535713971134_5922814022170085326_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=QTFFIrIuJ-sQ7kNvwH0UGZi&_nc_oc=AdmMF782hc4K9iFkI5P1pw87Ctr4QJzHO3G7Ac__qcyU8B5LhRqtcejILe3G1c_RGrFC1MCQ4F42adducJZdpiM2&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfXjk5_VN1AjX28JIjUtqx-nOWKTOQzmICFi4MekOYjN7g&oe=68B5265F",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/18056736512621615/medium.jpg" } },
        caption: "NEW EP, \"FACE YOUR MAKER\" - OUT NOW ON ALL STREAMING PLATFORMS! 💿"
      },
      {
        id: "17870368617419948",
        permalink: "https://www.instagram.com/reel/DNNxbP_Mhzr/",
        mediaType: "VIDEO",
        thumbnailUrl: "https://scontent-sof1-1.cdninstagram.com/v/t51.82787-15/530233102_17962684250951301_4624421791502455443_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=9taS___u5ZQQ7kNvwEIgOUk&_nc_oc=Adkjtp6w3yLq_woDq46EIlk3ZeDAKuFFOBHTcHS1FycDEooTqVuPgtoz2iJ8O9D3r9wvefVFXP0JDRtDKKzjmPYN&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfVRw_V7T1463gJBbjucfSAs_wDyqlW4CwtLxMOTJC6bxQ&oe=68B522C3",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/17870368617419948/medium.jpg" } },
        caption: "🖤🖤"
      },
      {
        id: "17895729507266608",
        permalink: "https://www.instagram.com/reel/DM_h-1aiOia/",
        mediaType: "VIDEO",
        thumbnailUrl: "https://scontent-sof1-1.cdninstagram.com/v/t51.71878-15/528297148_3941584452819681_394528058147860578_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=xwxXfyxHVNoQ7kNvwGmwwXe&_nc_oc=Adk_rU8oQi9THt_QiJRgwK1wKSyU-phmlYCGvmRtD1Gp463KIH1l8dZSFWxuPdEz4PIm_R11ALTaJ74XzGUu7beZ&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfUR953u02e4MUMHACbjq5yRe9n0qSNLXC_zemy8t-X2pA&oe=68B4FACD",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/17895729507266608/medium.jpg" } },
        caption: "Morbid Gene - Purpose. Out now on all platforms!"
      },
      {
        id: "18101034772492536",
        permalink: "https://www.instagram.com/reel/DK5CUfvifej/",
        mediaType: "VIDEO",
        thumbnailUrl: "https://scontent-sof1-2.cdninstagram.com/v/t51.75761-15/503873013_17956392338951301_8694256387169534820_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=QefLR353MEAQ7kNvwG9CDHK&_nc_oc=Adnm0ifct6tIUl1HHhvfGpMiQfdp5Um34NZ7JYqKDNiy8zjtHzbf7akYsUx3LcG3tPIuSWuqPyAI7hswuJgJVXbC&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfUBpbNxAqyA8-8-UR6sb309smhOeT3orrlGptJ7IP0ujg&oe=68B501D7",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/18101034772492536/medium.jpg" } },
        caption: "\"PURPOSE\" out now on all streaming platforms!"
      },
      {
        id: "17991048590811446",
        permalink: "https://www.instagram.com/p/DK0TS3VC4Ig/",
        mediaType: "IMAGE",
        mediaUrl: "https://scontent-sof1-2.cdninstagram.com/v/t51.75761-15/504509917_17956183985951301_3036917802775333302_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=tv0GgcMUp3wQ7kNvwEF4nLR&_nc_oc=AdkpfTHh2drjU8zx7sB29DIF5kGKHdjm27SnkwNm8ThKsFFjQgiwR94DXEmzcy1WzUiwvNWvX2Iq-6eBEuEpp3bH&_nc_zt=23&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfXjZRQNu4lXpliJE2Kwe0JkytxpdiQRIdz9fRaGzfYK_A&oe=68B5287B",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/17991048590811446/medium.jpg" } },
        caption: "🤜🤛🔥"
      },
      {
        id: "18314806621226775",
        permalink: "https://www.instagram.com/p/DKeU1JDC3yg/",
        mediaType: "CAROUSEL_ALBUM",
        mediaUrl: "https://scontent-sof1-1.cdninstagram.com/v/t51.75761-15/503150253_17955203873951301_2085565770835587894_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=VIDsyCS8NykQ7kNvwGJ0xB8&_nc_oc=AdkfR7_SEy287uXv3bk8CuO6NUkGJniGouN1ftwQZghv9l17HGi7IeUmpHOOv117UsJoq1Cvx9IFY-V-sUOmwWLK&_nc_zt=23&_nc_ht=scontent-sof1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=hq3oAYY2XfShs1uiDlo4Sg&oh=00_AfXQC8x3PsgFuIfANaUKnlflp9Lfxr-bZ5jhEFP1Tnoc5A&oe=68B51281",
        sizes: { medium: { mediaUrl: "https://behold.pictures/XPDtsfFk8wQ6ty5tqpTOBI9KPaC2/AmMaOJ50cbyW838WVB8L/18314806621226775/medium.jpg" } },
        caption: "Kråkan, Vocals 🔥"
      }
    ]
  };

  // Get all 6 posts and prepare them for display
  const instagramPosts = instagramData.posts.slice(0, 6).map((post, index) => {
    // Determine the best image URL based on media type
    let imageUrl;
    if (post.mediaType === "VIDEO") {
      imageUrl = post.sizes?.medium?.mediaUrl || post.thumbnailUrl;
    } else {
      imageUrl = post.sizes?.medium?.mediaUrl || post.mediaUrl;
    }
    
    return {
      id: post.id,
      imageUrl: imageUrl,
      postUrl: post.permalink,
      alt: post.caption ? `${post.caption.substring(0, 50)}...` : `Morbid Gene Instagram post ${index + 1}`,
      mediaType: post.mediaType,
      isVideo: post.mediaType === "VIDEO"
    };
  });

  return (
    <FeedContainer>
      <FeedTitle>
        <FaInstagram /> Follow Us
      </FeedTitle>
      <InstagramHandle 
        href="https://www.instagram.com/morbidgenebandpage/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @morbidgenebandpage
      </InstagramHandle>
      
      <ImageGrid>
        {instagramPosts.map(post => (
          <ImageLink 
            key={post.id}
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={post.alt}
          >
            <InstagramImage 
              src={post.imageUrl} 
              alt={post.alt}
              loading="lazy"
            />
            {post.isVideo && (
              <PlayButton>
                <FaPlay />
              </PlayButton>
            )}
          </ImageLink>
        ))}
      </ImageGrid>
    </FeedContainer>
  );
};
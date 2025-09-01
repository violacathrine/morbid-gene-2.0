import styled from "styled-components";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import ScrollToTop from "../components/ScrollToTop";
import { Container } from "../components/shared/LayoutComponents";
import { theme } from "../styles/theme";


const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${theme.colors.primaryText};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.secondaryText};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const GigsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const GigCard = styled.div`
  background: ${theme.colors.sectionBg};
  border: 1px solid ${theme.colors.charcoal};
  padding: 2rem;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.buttonPrimary};
  }
`;

const GigHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const VenueInfo = styled.div`
  flex: 1;
`;

const VenueName = styled.h2`
  color: ${theme.colors.primaryText};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const VenueLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.secondaryText};
  font-size: 1rem;
  margin: 0;
  
  svg {
    color: #ff4444;
    font-size: 1.1rem;
  }
`;

const DateTimeInfo = styled.div`
  text-align: left;
  
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const Date = styled.div`
  color: #ff4444;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primaryText};
  font-size: 1.1rem;
  
  svg {
    color: ${theme.colors.primaryText};
    font-size: 1.1rem;
  }
`;

const GigDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: ${theme.colors.secondaryText};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TicketLink = styled.a`
  display: inline-block;
  background: ${theme.colors.buttonPrimary};
  color: ${theme.colors.primaryText};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: ${theme.colors.buttonPrimaryHover};
    text-decoration: none;
    color: ${theme.colors.primaryText};
  }
`;

const TBANotice = styled.span`
  color: ${theme.colors.secondaryText};
  font-style: italic;
  font-size: 0.9rem;
`;

export const Gigs = () => {
  const upcomingGigs = [
    {
      id: 1,
      venue: "Brother Tuck",
      location: "Stockholm",
      date: "13 September",
      dayOfWeek: "Lör",
      time: "20:00",
      description: "Join us for an intimate evening of heavy music at Brother Tuck. Expect crushing riffs and atmospheric soundscapes.",
      ticketLink: "https://zippertic.se/events/946",
      hasTickets: true
    },
    {
      id: 2,
      venue: "The Node",
      location: "Stockholm", 
      date: "7 November",
      dayOfWeek: "Tor",
      time: "TBA",
      description: "More details coming soon for this highly anticipated show at The Node.",
      ticketLink: null,
      hasTickets: false
    }
  ];

  return (
    <Container $maxWidth="md" $padding="lg">
      <Header>
        <Title>Upcoming Gigs</Title>
        <Subtitle>
          Join us live for an unforgettable metal experience. 
          Check back regularly for new dates and ticket information.
        </Subtitle>
      </Header>

      <GigsList>
        {upcomingGigs.map((gig) => (
          <GigCard key={gig.id}>
            <GigHeader>
              <VenueInfo>
                <VenueName>{gig.venue}</VenueName>
                <VenueLocation>
                  <MdLocationOn />
                  {gig.location}
                </VenueLocation>
              </VenueInfo>
              <DateTimeInfo>
                <Date>{gig.date}</Date>
                <Time>
                  <MdAccessTime />
                  {gig.time === "TBA" ? (
                    <TBANotice>Time TBA</TBANotice>
                  ) : (
                    gig.time
                  )}
                </Time>
              </DateTimeInfo>
            </GigHeader>

            <GigDetails>
              <Description>{gig.description}</Description>
              
              {gig.hasTickets && gig.ticketLink ? (
                <TicketLink 
                  href={gig.ticketLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Tickets
                </TicketLink>
              ) : (
                <TBANotice>Tickets coming soon</TBANotice>
              )}
            </GigDetails>
          </GigCard>
        ))}
      </GigsList>
      
      <ScrollToTop />
    </Container>
  );
};
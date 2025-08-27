import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const RegisterBox = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (min-width: 480px) {
    padding: 2.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  text-align: center;
  
  @media (min-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #cccccc;
  font-style: italic;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  font-weight: 300;
  
  @media (min-width: 480px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 480px) {
    gap: 1.8rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: bold;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (min-width: 480px) {
    font-size: 1rem;
    letter-spacing: 1px;
  }
`;

const InputField = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 0.75rem;
  padding-right: ${props => props.$hasIcon ? '3rem' : '0.75rem'};
  background: #222222;
  border: 2px solid #444444;
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }
  
  @media (min-width: 480px) {
    padding: 0.85rem;
    padding-right: ${props => props.$hasIcon ? '3.2rem' : '0.85rem'};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #cccccc;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ffffff;
  }
  
  @media (min-width: 480px) {
    right: 0.85rem;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #dc2626, #991b1b);
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  width: 100%;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #991b1b, #dc2626);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (min-width: 480px) {
    padding: 1.1rem 2.2rem;
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  
  @media (min-width: 768px) {
    width: auto;
    align-self: flex-start;
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ffffff;
  background: #dc2626;
  border: 1px solid #991b1b;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LinkText = styled.p`
  text-align: center;
  color: #cccccc;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      color: #dc2626;
      text-decoration: underline;
    }
  }
  
  @media (min-width: 480px) {
    font-size: 1rem;
    margin-top: 2rem;
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    color: #dc2626;
  }
  
  &::before {
    content: "←";
    font-size: 1rem;
  }
`;

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    const result = await register(name, email, password);
    
    if (result.success) {
      navigate('/merch'); // Redirect to merch page after registration
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Container>
      <BackLink to="/merch">Back to shop</BackLink>
      
      <RegisterBox>
        <Title>Register</Title>
        <Subtitle>Join the Morbid Gene family</Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="register-name">Full Name</Label>
            <InputField>
              <Input
                type="text"
                id="register-name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputField>
          </InputContainer>
          
          <InputContainer>
            <Label htmlFor="register-email">Email Address</Label>
            <InputField>
              <Input
                type="email"
                id="register-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputField>
          </InputContainer>
          
          <InputContainer>
            <Label htmlFor="register-password">Password</Label>
            <InputField>
              <Input
                type={showPassword ? "text" : "password"}
                id="register-password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $hasIcon={true}
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </ToggleButton>
            </InputField>
          </InputContainer>
          
          <InputContainer>
            <Label htmlFor="register-confirm-password">Confirm Password</Label>
            <InputField>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="register-confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                $hasIcon={true}
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </ToggleButton>
            </InputField>
          </InputContainer>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Form>
        
        <LinkText>
          Already have an account? <Link to="/login">Login here</Link>
        </LinkText>
      </RegisterBox>
    </Container>
  );
};
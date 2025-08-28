import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Container = styled.div`
  min-height: auto;
  padding: 0.75rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  @media (min-width: 480px) {
    padding: 1.25rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
    padding-top: 0;
    padding-bottom: 2rem;
  }
`;

const LoginBox = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 480px) {
    padding: 2rem;
  }
  
  @media (min-width: 768px) {
    padding: 3rem;
    padding-top: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    
    @media (min-width: 480px) {
      font-size: 1.75rem;
      letter-spacing: 1.5px;
    }
    
    @media (min-width: 768px) {
      font-size: 2rem;
      letter-spacing: 1.5px;
    }
  }
  
  p {
    color: #cccccc;
    font-style: italic;
    font-size: 0.9rem;
    font-weight: 300;
    
    @media (min-width: 480px) {
      font-size: 1rem;
    }
    
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
  
  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const FormSection = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 1rem;
  margin-bottom: 1rem;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 480px) {
    gap: 1.25rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
    
    > div {
      flex: 1;
    }
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: bold;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
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
    font-size: 0.875rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
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

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$isShowing ? '#dc2626' : '#666666'};
  font-size: 1.1rem;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  @media (min-width: 480px) {
    right: 0.85rem;
  }
`;

const Button = styled.button`
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: auto;
  margin: 0;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }

  &:disabled {
    background-color: #666666;
    cursor: not-allowed;
  }
  
  @media (min-width: 480px) {
    padding: 0.85rem 1.5rem;
    font-size: 0.95rem;
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

const RequiredStar = styled.span`
  color: #dc2626;
  margin-left: 4px;
  font-weight: bold;
`;

const FieldError = styled.div`
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
`;

const ToggleSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  gap: 0;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.$active ? "#dc2626" : "#333333")};
  color: ${(props) => (props.$active ? "#ffffff" : "#cccccc")};
  border: 1px solid ${(props) => (props.$active ? "#dc2626" : "#555555")};
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:first-child {
    border-right: none;
  }
  
  &:last-child {
    border-left: none;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? "#b91c1c" : "#444444")};
    color: #ffffff;
    border-color: ${(props) => (props.$active ? "#dc2626" : "#666666")};
  }
`;

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    
    if (isLogin) {
      if (!email.trim()) errors.email = 'Email is required';
      if (!password.trim()) errors.password = 'Password is required';
    } else {
      if (!name.trim()) errors.name = 'Full name is required';
      if (!email.trim()) errors.email = 'Email is required';
      if (!password.trim()) errors.password = 'Password is required';
      if (!confirmPassword.trim()) errors.confirmPassword = 'Please confirm your password';
      
      if (password && password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
      
      if (password && confirmPassword && password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    
    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        navigate('/merch');
      } else {
        setError(result.error);
      }
    } else {
      const result = await register(name, email, password);
      if (result.success) {
        navigate('/merch');
      } else {
        setError(result.error);
      }
    }
    
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFieldErrors({});
    // Clear form fields when switching
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Container>      
      <LoginBox>
        <Header>
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <p>{isLogin ? 'Welcome back to Morbid Gene' : 'Join the Morbid Gene family'}</p>
        </Header>
        
        <FormSection>
          <ToggleSection>
            <ToggleButton 
              type="button"
              $active={isLogin} 
              onClick={() => !isLogin && toggleMode()}
            >
              Login
            </ToggleButton>
            <ToggleButton 
              type="button"
              $active={!isLogin} 
              onClick={() => isLogin && toggleMode()}
            >
              Register
            </ToggleButton>
          </ToggleSection>
        </FormSection>
        
        <FormSection>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
          {!isLogin ? (
            <>
              <InputRow>
                <InputContainer>
                  <Label htmlFor="register-name">
                    Full Name<RequiredStar>*</RequiredStar>
                  </Label>
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
                  {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
                </InputContainer>
                
                <InputContainer>
                  <Label htmlFor="register-email">
                    Email Address<RequiredStar>*</RequiredStar>
                  </Label>
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
                  {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
                </InputContainer>
              </InputRow>
              
              <InputRow>
                <InputContainer>
                  <Label htmlFor="register-password">
                    Password<RequiredStar>*</RequiredStar>
                  </Label>
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
                    <PasswordToggleButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      $isShowing={showPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggleButton>
                  </InputField>
                  {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
                </InputContainer>
                
                <InputContainer>
                  <Label htmlFor="confirm-password">
                    Confirm Password<RequiredStar>*</RequiredStar>
                  </Label>
                  <InputField>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      $hasIcon={true}
                      required
                    />
                    <PasswordToggleButton
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      $isShowing={showConfirmPassword}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </PasswordToggleButton>
                  </InputField>
                  {fieldErrors.confirmPassword && <FieldError>{fieldErrors.confirmPassword}</FieldError>}
                </InputContainer>
              </InputRow>
            </>
          ) : (
            <>
              <InputContainer>
                <Label htmlFor="login-email">
                  Email Address<RequiredStar>*</RequiredStar>
                </Label>
                <InputField>
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputField>
                {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
              </InputContainer>
              
              <InputContainer>
                <Label htmlFor="login-password">
                  Password<RequiredStar>*</RequiredStar>
                </Label>
                <InputField>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    $hasIcon={true}
                    required
                  />
                  <PasswordToggleButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    $isShowing={showPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggleButton>
                </InputField>
                {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
              </InputContainer>
            </>
          )}
          
            <Button type="submit" disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Create Account')}
            </Button>
          </Form>
        </FormSection>
      </LoginBox>
    </Container>
  );
};
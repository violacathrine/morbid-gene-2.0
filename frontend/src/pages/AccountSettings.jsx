import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (min-width: 480px) {
    padding: 2.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
    
    @media (min-width: 480px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    color: #cccccc;
    font-style: italic;
    font-size: 1rem;
    font-weight: 300;
    
    @media (min-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

const SettingsSection = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h2 {
    color: #ffffff;
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 1.5rem 0;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }
  
  @media (min-width: 480px) {
    padding: 2.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  color: #999999;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const InfoValue = styled.span`
  color: #ffffff;
  font-size: 1rem;
  word-break: break-all;
  
  &.password {
    font-family: monospace;
    letter-spacing: 2px;
  }
`;

const FormGroup = styled.div`
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

const Input = styled.input`
  padding: 0.75rem;
  background: #222222;
  border: 2px solid #444444;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }
  
  &::placeholder {
    color: #666666;
    font-size: 0.875rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  
  @media (min-width: 480px) {
    padding: 0.85rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
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

const DangerZone = styled.div`
  border: 1px solid #dc2626;
  padding: 1.5rem;
  background: rgba(220, 38, 38, 0.03);
  
  h2 {
    color: #dc2626;
    border-bottom-color: #dc2626;
  }
  
  p {
    color: #cccccc;
    font-size: 1rem;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }
  
  @media (min-width: 480px) {
    padding: 2.5rem;
  }
`;

const DangerButton = styled.button`
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
  
  &:hover {
    background-color: #b91c1c;
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
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #ffffff;
  background: #dc2626;
  border: 1px solid #991b1b;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmationDialog = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 1.5rem;
  max-width: 400px;
  text-align: center;
  
  h3 {
    color: #fff;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }
  
  p {
    color: #ccc;
    margin: 0 0 1.5rem 0;
    font-size: 0.95rem;
  }
`;

const ConfirmationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #b91c1c;
  }
`;

const CancelButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #555555;
  }
`;

export const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      setError('Network error');
    }
    
    setLoading(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch('/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        alert('Account deleted successfully');
        logout();
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      setError('Network error');
    }
    
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <Container>
      <SettingsContainer>
        <Header>
          <h1>Account Settings</h1>
          <p>Manage your account preferences and security</p>
        </Header>

        <SettingsSection>
          <h2>Account Information</h2>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Name</InfoLabel>
              <InfoValue>{user?.name || 'Not set'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user?.email || 'Not set'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Password</InfoLabel>
              <InfoValue className="password">Protected</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Account Created</InfoLabel>
              <InfoValue>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </SettingsSection>

        <SettingsSection>
          <h2>Change Password</h2>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {message && <SuccessMessage>{message}</SuccessMessage>}
          
          <Form onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </FormGroup>
            
            <ButtonGroup>
              <SaveButton type="submit" disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </SettingsSection>

        <DangerZone>
          <h2>Danger Zone</h2>
          <p>
            Permanently delete your account and all associated data. This action cannot be undone.
            All your favorites, account information, and preferences will be lost forever.
          </p>
          <DangerButton onClick={handleDeleteAccount}>
            Delete Account
          </DangerButton>
        </DangerZone>

        {/* Delete Account Confirmation Dialog */}
        {showDeleteConfirm && (
          <ConfirmationOverlay onClick={handleCancelDelete}>
            <ConfirmationDialog onClick={(e) => e.stopPropagation()}>
              <h3>Delete Account</h3>
              <p>Are you absolutely sure? This will permanently delete your account and all your data. This action cannot be undone.</p>
              <ConfirmationButtons>
                <CancelButton onClick={handleCancelDelete}>
                  Cancel
                </CancelButton>
                <ConfirmButton onClick={handleConfirmDelete}>
                  Delete Forever
                </ConfirmButton>
              </ConfirmationButtons>
            </ConfirmationDialog>
          </ConfirmationOverlay>
        )}
      </SettingsContainer>
    </Container>
  );
};
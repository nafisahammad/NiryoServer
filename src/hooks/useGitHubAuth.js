import { useState, useEffect, useCallback } from 'react'

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const STORAGE_KEY = 'niryo_github_auth'
const DEVICE_CODE_KEY = 'niryo_device_code'

export const useGitHubAuth = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deviceCode, setDeviceCode] = useState(null)
  const [userCode, setUserCode] = useState(null)
  const [verificationUri, setVerificationUri] = useState(null)

  const isConfigured = !!CLIENT_ID && CLIENT_ID !== 'your-client-id'

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.token && data.user) {
          setToken(data.token)
          setUser(data.user)
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    
    const savedDeviceCode = localStorage.getItem(DEVICE_CODE_KEY)
    if (savedDeviceCode) {
      try {
        const data = JSON.parse(savedDeviceCode)
        if (data.device_code && data.expires_at > Date.now()) {
          setDeviceCode(data.device_code)
          setUserCode(data.user_code)
          setVerificationUri(data.verification_uri)
        } else {
          localStorage.removeItem(DEVICE_CODE_KEY)
        }
      } catch (e) {
        localStorage.removeItem(DEVICE_CODE_KEY)
      }
    }
    
    setLoading(false)
  }, [])

  const startDeviceFlow = useCallback(async () => {
    if (!isConfigured) {
      return { 
        success: false, 
        error: 'GitHub OAuth not configured. Please set VITE_GITHUB_CLIENT_ID in your .env file.',
        notConfigured: true
      }
    }

    try {
      const response = await fetch('https://github.com/login/device/code', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          scope: 'read:user'
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        return { success: false, error: `GitHub API error: ${response.status}` }
      }
      
      const data = await response.json()
      
      if (data.device_code) {
        setDeviceCode(data.device_code)
        setUserCode(data.user_code)
        setVerificationUri(data.verification_uri)
        
        localStorage.setItem(DEVICE_CODE_KEY, JSON.stringify({
          device_code: data.device_code,
          user_code: data.user_code,
          verification_uri: data.verification_uri,
          expires_at: Date.now() + (data.expires_in * 1000)
        }))
        
        return { 
          success: true, 
          userCode: data.user_code, 
          verificationUri: data.verification_uri,
          expiresIn: data.expires_in
        }
      }
      
      return { success: false, error: data.error_description || 'Failed to start device flow' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [isConfigured])

  const pollForToken = useCallback(async () => {
    if (!deviceCode) return { success: false, error: 'No device code' }
    
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          device_code: deviceCode,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
        })
      })
      
      const data = await response.json()
      
      if (data.access_token) {
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })
        
        if (!userResponse.ok) {
          return { success: false, error: 'Failed to fetch user info' }
        }
        
        const userData = await userResponse.json()
        
        setToken(data.access_token)
        setUser(userData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          token: data.access_token,
          user: userData
        }))
        localStorage.removeItem(DEVICE_CODE_KEY)
        
        setDeviceCode(null)
        setUserCode(null)
        setVerificationUri(null)
        
        return { success: true }
      } else if (data.error === 'authorization_pending') {
        return { success: false, pending: true }
      } else if (data.error === 'slow_down') {
        return { success: false, slowDown: true }
      } else if (data.error === 'expired_token') {
        localStorage.removeItem(DEVICE_CODE_KEY)
        setDeviceCode(null)
        setUserCode(null)
        setVerificationUri(null)
        return { success: false, error: 'Code expired. Please try again.' }
      } else {
        return { success: false, error: data.error_description || data.error }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [deviceCode])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setDeviceCode(null)
    setUserCode(null)
    setVerificationUri(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(DEVICE_CODE_KEY)
  }, [])

  const cancelLogin = useCallback(() => {
    setDeviceCode(null)
    setUserCode(null)
    setVerificationUri(null)
    localStorage.removeItem(DEVICE_CODE_KEY)
  }, [])

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isConfigured,
    userCode,
    verificationUri,
    startDeviceFlow,
    pollForToken,
    logout,
    cancelLogin
  }
}
